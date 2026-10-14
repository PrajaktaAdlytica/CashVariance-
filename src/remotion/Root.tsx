import { Composition, Folder } from "remotion";
import { ObservatoryFilm } from "./ObservatoryFilm";
import { ApproachScene } from "./ApproachScene";
import { DetailScene } from "./DetailScene";
import { HoldScene } from "./HoldScene";
import "./fonts";
export const RemotionRoot=()=> <>
 <Composition id="CashVarianceObservatory" component={ObservatoryFilm} width={1920} height={1080} fps={30} durationInFrames={360}/>
 <Composition id="CashVarianceObservatoryMobile" component={ObservatoryFilm} width={1080} height={1440} fps={30} durationInFrames={360}/>
 <Folder name="Scenes">
  <Composition id="Approach" component={ApproachScene} width={1920} height={1080} fps={30} durationInFrames={120}/>
  <Composition id="Inspect" component={DetailScene} width={1920} height={1080} fps={30} durationInFrames={120}/>
  <Composition id="Hold" component={HoldScene} width={1920} height={1080} fps={30} durationInFrames={120}/>
 </Folder>
</>;
