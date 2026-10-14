import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { WaterScene } from "./WaterScene";
import { FilmLayout, FilmTitle, ease } from "./FilmLayout";
export function DetailScene() {
 const frame=useCurrentFrame();const {fps,width,height}=useVideoConfig();const portrait=height>width;
 const panel={borderTop:"1px solid #e7d8bc88",paddingTop:18,flex:1};
 return <AbsoluteFill style={{background:"#26372f"}}><WaterScene shot={1} src="intro/detail.webp"/><FilmLayout chapter="02 / INSPECT THE DIFFERENCE"><FilmTitle>One position.<br/>Two records.</FilmTitle><div style={{display:"flex",gap:30,maxWidth:portrait?950:680,marginTop:portrait?22:45,opacity:interpolate(frame,[.7*fps,1.5*fps],[0,1],ease),translate:`0 ${interpolate(frame,[.7*fps,1.5*fps],[18,0],ease)}px`}}><div style={panel}><div style={{fontSize:portrait?22:21,letterSpacing:1}}>BANK STATEMENT</div><div style={{fontSize:portrait?51:52,marginTop:12,letterSpacing:-2}}>$240,000</div></div><div style={panel}><div style={{fontSize:portrait?22:21,letterSpacing:1}}>GENERAL LEDGER</div><div style={{fontSize:portrait?51:52,marginTop:12,letterSpacing:-2}}>$232,000</div></div></div><p style={{fontSize:portrait?23:24,color:"#ffe3b1",marginTop:24}}>Source stale · Last file 08:00 UTC · Expected 09:00</p></FilmLayout></AbsoluteFill>;
}
