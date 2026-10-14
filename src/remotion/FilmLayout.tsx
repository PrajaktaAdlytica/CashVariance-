import { ReactNode } from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

export const ease = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const, easing: Easing.bezier(.22, 1, .36, 1) };
export function FilmLayout({children, chapter, hold = false}: {children: ReactNode; chapter: string; hold?: boolean}) {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const portrait = height > width;
  return <AbsoluteFill style={{color:"#fff9ed", fontFamily:"Manrope, sans-serif"}}>
    <AbsoluteFill style={{background: portrait ? "linear-gradient(180deg,rgba(28,29,24,.2), transparent 42%, rgba(28,29,24,.25) 53%, #26372f 69%)" : "linear-gradient(90deg, rgba(29,27,22,.66), rgba(29,27,22,.18) 45%, transparent 74%), linear-gradient(0deg, rgba(20,25,22,.38), transparent 35%)"}} />
    <Img src={staticFile("brand/logo/lockup-ivory.svg")} style={{position:"absolute",top:portrait?62:65,left:portrait?62:100,width:portrait?350:315}} />
    <div style={{position:"absolute",top:portrait?132:80,right:portrait?undefined:100,left:portrait?62:undefined,fontFamily:"Plex,monospace",fontSize:portrait?20:17,letterSpacing:3}}>CONCEPT FILM / SYNTHETIC DATA</div>
    <div style={{position:"absolute",left:portrait?62:105,right:portrait?62:undefined,top:portrait?height*.69:height*.28,width:portrait?undefined:790,opacity:interpolate(frame,[0,.7*fps,5.5*fps,6*fps],[0,1,1,hold?1:0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"}),translate:`0 ${interpolate(frame,[0,.9*fps],[26,0],ease)}px`}}>{children}</div>
    {!portrait && <div style={{position:"absolute",bottom:66,left:105,right:100,display:"flex",justifyContent:"space-between",fontSize:19,fontFamily:"Plex,monospace",letterSpacing:1.3}}><span>{chapter}</span><span>READ ONLY · NO FUND MOVEMENT</span></div>}
  </AbsoluteFill>;
}
export function FilmTitle({children}:{children:ReactNode}) {
 const {width,height}=useVideoConfig();
 return <h2 style={{fontFamily:"Newsreader,Georgia,serif",fontWeight:400,fontSize:height>width?88:116,lineHeight:1.04,letterSpacing:-3,margin:0,color:"#fff9ed"}}>{children}</h2>;
}
