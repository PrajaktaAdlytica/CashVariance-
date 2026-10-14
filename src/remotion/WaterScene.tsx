import { useEffect, useRef, useState } from "react";
import { Img, staticFile, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

const vertex = `attribute vec2 position; varying vec2 uv; void main(){uv=vec2((position.x+1.0)*.5,(1.0-position.y)*.5);gl_Position=vec4(position,0,1);}`;
const fragment = `precision highp float;
varying vec2 uv;
uniform sampler2D image;
uniform vec2 resolution;
uniform float time;
uniform float zoom;
uniform float pan;
uniform float shot;
float band(float a,float b,float feather,float x){return smoothstep(a,a+feather,x)*(1.-smoothstep(b-feather,b,x));}
void main(){
  float aspect=resolution.x/resolution.y;
  vec2 crop=vec2(min(1.,aspect/(1672./941.)), min(1.,(1672./941.)/aspect));
  float center=aspect<1.4 ? .68 : .5;
  vec2 p=(uv-.5)*crop/zoom+vec2(center+pan,.5);
  p=clamp(p,vec2(.001),vec2(.999));
  // Drift actual cloud detail inside the open sky, feathered away from architecture.
  float roof=.09+p.x*.29;
  float sky=band(.12,shot==1. ? .40 : .67,.045,p.x)*band(roof+.025,.435,.045,p.y);
  vec2 cloudDrift=vec2(time*.006,sin(time*.8+p.x*5.)*.0018)*sky;
  vec2 atmosphere=clamp(p+cloudDrift,vec2(.001),vec2(.999));
  vec3 original=texture2D(image,atmosphere).rgb;
  // Confine motion to the distant estuary. Neither console nor instruments warp.
  float water=band(.18,shot==1. ? .42 : .63,.045,p.x)*band(shot==1. ? .47 : .50,shot==1. ? .70 : .66,.025,p.y);
  float brightness=dot(original,vec3(.299,.587,.114));
  water*=smoothstep(.30,.60,brightness);
  vec2 ripple=vec2(sin(p.y*310.+time*1.6)*.0009, sin(p.x*190.-time*1.3)*.00045)*water;
  vec3 color=texture2D(image,clamp(atmosphere+ripple,vec2(.001),vec2(.999))).rgb;
  float glint=sin(p.x*330.+p.y*190.-time*1.8)*sin(p.y*410.+time*.9);
  color+=vec3(.018,.014,.008)*glint*water;
  // Slow broad mist bands, drifting independently from camera motion.
  float fog=band(.12,shot==1. ? .43 : .68,.09,p.x)*band(.46,.60,.045,p.y);
  float cloud=.5+.5*sin(p.x*22.+time*.12+sin(p.y*35.)*.8);
  color=mix(color,vec3(.88,.85,.78),fog*cloud*.065);
  gl_FragColor=vec4(color,1.);
}`;

type Renderer = { gl: WebGLRenderingContext; program: WebGLProgram; ready: boolean; draw: (seconds: number, scale: number, pan: number) => void };
/** Frame-driven WebGL; no independent RAF clock, so pause and seeking are exact. */
export function WaterScene({ shot, src }: { shot: number; src: string }) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const portrait = height > width;
  const seconds = frame / fps;
  const zoom = interpolate(frame, [0, 3.4 * fps], shot === 2 ? [1.09, 1.015] : shot === 1 ? [1.025, 1.07] : [1.01, 1.10], { extrapolateRight: "clamp", easing: Easing.bezier(.3, 0, .25, 1) });
  const pan = interpolate(frame, [0, 4 * fps], shot === 1 ? [0, .008] : [0, -.006], { extrapolateRight: "clamp" });
  const canvas = useRef<HTMLCanvasElement>(null);
  const renderer = useRef<Renderer | null>(null);
  const current = useRef({ seconds, zoom, pan });
  current.current = { seconds, zoom, pan };
  const [ready, setReady] = useState(false);
  const url = staticFile(src);

  useEffect(() => {
    setReady(false);
    const node = canvas.current;
    if (!node) return;
    const gl = node.getContext("webgl", { alpha: false, antialias: false, powerPreference: "low-power", preserveDrawingBuffer: true });
    if (!gl) return;
    let disposed = false;
    const shaders: WebGLShader[] = [];
    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type)!;
      shaders.push(shader);
      gl.shaderSource(shader, source); gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error("Intro shader unavailable");
      return shader;
    };
    let program: WebGLProgram | null = null;
    let texture: WebGLTexture | null = null;
    let buffer: WebGLBuffer | null = null;
    const image = new Image();
    const lost = (e: Event) => { e.preventDefault(); setReady(false); renderer.current = null; };
    node.addEventListener("webglcontextlost", lost);
    try {
      program = gl.createProgram()!;
      gl.attachShader(program, compile(gl.VERTEX_SHADER, vertex));
      gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragment));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error("Intro shader unavailable");
      gl.useProgram(program);
      buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
      const position = gl.getAttribLocation(program, "position");
      gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      texture = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      const uniforms = Object.fromEntries(["time", "zoom", "pan", "shot", "resolution"].map(name => [name, gl.getUniformLocation(program!, name)]));
      const draw = (time: number, scale: number, offset: number) => {
        if (disposed || gl.isContextLost()) return;
        gl.viewport(0, 0, node.width, node.height);
        gl.useProgram(program);
        gl.uniform1f(uniforms.time, time); gl.uniform1f(uniforms.zoom, scale);
        gl.uniform1f(uniforms.pan, offset); gl.uniform1f(uniforms.shot, shot);
        gl.uniform2f(uniforms.resolution, node.width, node.height);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      };
      image.onload = () => {
        if (disposed) return;
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
        renderer.current = {gl, program: program!, ready: true, draw};
        draw(current.current.seconds, current.current.zoom, current.current.pan);
        setReady(true);
      };
      image.src = url;
    } catch { setReady(false); }
    return () => {
      disposed = true; image.onload = null; renderer.current = null;
      node.removeEventListener("webglcontextlost", lost);
      if (texture) gl.deleteTexture(texture); if (buffer) gl.deleteBuffer(buffer);
      if (program) gl.deleteProgram(program); shaders.forEach(shader => gl.deleteShader(shader));
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [url, shot]);

  useEffect(() => { renderer.current?.draw(seconds, zoom, pan); }, [seconds, zoom, pan, ready]);
  const sceneHeight = portrait ? Math.round(height * .68) : height;
  return <div style={{ position: "absolute", inset: 0, height: sceneHeight, overflow: "hidden" }}>
    <Img src={url} style={{width: "100%", height: "100%", objectFit: "cover", objectPosition: portrait ? "68% center" : "center", transform: `scale(${zoom}) translateX(${-pan * 100}%)`}} />
    <canvas ref={canvas} width={Math.min(width, 1600)} height={Math.round(Math.min(width,1600) * sceneHeight / width)} data-intro-webgl={ready ? "ready" : "fallback"} style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:ready?1:0}} />
  </div>;
}
