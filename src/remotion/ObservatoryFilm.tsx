import { AbsoluteFill, Series, useVideoConfig } from "remotion";
import { ApproachScene } from "./ApproachScene";
import { DetailScene } from "./DetailScene";
import { HoldScene } from "./HoldScene";
export const INTRO_FPS=30;
export const INTRO_FRAMES=540;
export function ObservatoryFilm() {
 const {fps}=useVideoConfig();
 return <AbsoluteFill style={{background:"#26372f"}}><Series>
  <Series.Sequence name="Approach the observatory" durationInFrames={6*fps} premountFor={fps}><ApproachScene/></Series.Sequence>
  <Series.Sequence name="Inspect the records" durationInFrames={6*fps} premountFor={fps}><DetailScene/></Series.Sequence>
  <Series.Sequence name="Hold for human review" durationInFrames={6*fps} premountFor={fps}><HoldScene/></Series.Sequence>
 </Series></AbsoluteFill>;
}
