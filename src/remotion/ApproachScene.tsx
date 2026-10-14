import { AbsoluteFill, useVideoConfig } from "remotion";
import { WaterScene } from "./WaterScene";
import { FilmLayout, FilmTitle } from "./FilmLayout";
export function ApproachScene() {
 const {width,height}=useVideoConfig(); const portrait=height>width;
 return <AbsoluteFill style={{background:"#26372f"}}><WaterScene shot={0} src="intro/approach.webp" /><FilmLayout chapter="01 / A CLEARER VIEW"><FilmTitle>A clearer view.<br/>Before the next<br style={{display:portrait?"none":"initial"}}/> decision.</FilmTitle><p style={{fontSize:portrait?27:30,lineHeight:1.6,maxWidth:650,marginTop:26,color:"#f3e8d4"}}>Every cash position begins with its sources.</p></FilmLayout></AbsoluteFill>;
}
