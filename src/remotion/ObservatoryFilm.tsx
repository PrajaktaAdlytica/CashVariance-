import { AbsoluteFill, Freeze, interpolate, useCurrentFrame } from "remotion";
import { ApproachScene } from "./ApproachScene";
import { DetailScene } from "./DetailScene";
import { HoldScene } from "./HoldScene";
export const INTRO_FPS=30;
export const INTRO_FRAMES=360;
/** Keep every image and WebGL context mounted: scene changes never expose an empty frame. */
export function ObservatoryFilm() {
 const frame=useCurrentFrame();
 return <AbsoluteFill style={{background:"#29241e"}}>
  {[ApproachScene,DetailScene,HoldScene].map((Scene,index)=><AbsoluteFill key={index} data-film-scene={index} style={{opacity:index===0?1:interpolate(frame,[index*120-6,index*120+6],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"})}}>
   <Freeze frame={Math.max(0,Math.min(119,frame-index*120+6))}><Scene/></Freeze>
  </AbsoluteFill>)}
 </AbsoluteFill>;
}
