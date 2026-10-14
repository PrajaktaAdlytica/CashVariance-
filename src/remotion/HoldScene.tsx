import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { WaterScene } from "./WaterScene";
import { FilmLayout, FilmTitle, ease } from "./FilmLayout";
export function HoldScene() {
 const frame=useCurrentFrame();const {fps,width,height}=useVideoConfig();const portrait=height>width;
 return <AbsoluteFill style={{background:"#26372f"}}><WaterScene shot={2} src="intro/hold.webp"/><FilmLayout hold chapter="03 / A HUMAN DECISION"><FilmTitle>The difference<br/>stays in view.</FilmTitle><div style={{marginTop:portrait?22:38,display:"flex",alignItems:"center",gap:28,opacity:interpolate(frame,[.55*fps,1.3*fps],[0,1],ease)}}><span style={{fontFamily:"Newsreader,Georgia,serif",fontSize:portrait?83:94,lineHeight:1}}>$8,000</span><span style={{fontSize:portrait?24:22,padding:"12px 22px",border:"1px solid #efd5a27d",borderRadius:40,color:"#ffe4b3",background:"#3b30258c"}}>Held for review</span></div><p style={{fontSize:portrait?25:28,lineHeight:1.6,marginTop:22,maxWidth:730}}>Counterparty confirmation pending.<br/>No journal posted. No payment sent.</p></FilmLayout></AbsoluteFill>;
}
