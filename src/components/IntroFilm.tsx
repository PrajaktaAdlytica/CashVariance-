"use client";
import { Player, PlayerRef } from "@remotion/player";
import { loadFont } from "@remotion/fonts";
import { useContext, useEffect, useRef, useState, RefObject } from "react";
import { ObservatoryFilm, INTRO_FPS, INTRO_FRAMES } from "../remotion/ObservatoryFilm";
import { MotionContext } from "./Primitives";
import { IntroPoster } from "./IntroPoster";

function Timeline({player, ready}:{player:RefObject<PlayerRef|null>;ready:boolean}) {
 const [frame,setFrame]=useState(0);
 useEffect(()=>{
  const current=player.current;if(!current)return;
  const update=()=>setFrame(current.getCurrentFrame());
  current.addEventListener("frameupdate",update);update();
  return()=>current.removeEventListener("frameupdate",update);
 },[player,ready]);
 return <div className="intro-timeline"><span aria-hidden="true">0{Math.min(3,Math.floor(frame/180)+1)} / 03</span><input aria-label="Intro timeline" type="range" min={0} max={INTRO_FRAMES-1} value={frame} aria-valuetext={`${Math.floor(frame/INTRO_FPS)} of 18 seconds`} onChange={e=>player.current?.seekTo(Number(e.target.value))}/><span aria-hidden="true">{String(Math.floor(frame/INTRO_FPS)).padStart(2,"0")} / 18s</span></div>;
}
export default function IntroFilm() {
 const player=useRef<PlayerRef>(null);
 const root=useRef<HTMLElement>(null);
 const {paused,reduced}=useContext(MotionContext);
 const [portrait,setPortrait]=useState(false);
 const [ready,setReady]=useState(false);
 const [visible,setVisible]=useState(false);
 const [hidden,setHidden]=useState(false);
 const [userPaused,setUserPaused]=useState(false);
 const [playing,setPlaying]=useState(false);
 const [ended,setEnded]=useState(false);
 const [failed,setFailed]=useState(false);
 useEffect(()=>{
  const media=matchMedia("(max-width: 600px)");
  const resize=()=>setPortrait(media.matches);resize();media.addEventListener("change",resize);
  const visibility=()=>setHidden(document.hidden);visibility();document.addEventListener("visibilitychange",visibility);
  const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.15});
  if(root.current)observer.observe(root.current);
  let active=true;
  Promise.all([
   loadFont({family:"Newsreader",url:"/brand/fonts/Newsreader[opsz,wght].woff2",weight:"400"}),
   loadFont({family:"Manrope",url:"/brand/fonts/Manrope[wght].woff2",weight:"400"}),
   loadFont({family:"Plex",url:"/brand/fonts/IBMPlexMono-Regular.woff2"}),
  ]).catch(()=>{}).finally(()=>{if(active)setReady(true)});
  return()=>{active=false;observer.disconnect();media.removeEventListener("change",resize);document.removeEventListener("visibilitychange",visibility)};
 },[]);
 useEffect(()=>{
  const current=player.current;if(!current)return;
  const play=()=>setPlaying(true);const pause=()=>setPlaying(false);const end=()=>{setEnded(true);setPlaying(false)};
  const error=()=>{setFailed(true);setPlaying(false)};
  current.addEventListener("play",play);current.addEventListener("pause",pause);current.addEventListener("ended",end);current.addEventListener("error",error);
  return()=>{current.removeEventListener("play",play);current.removeEventListener("pause",pause);current.removeEventListener("ended",end);current.removeEventListener("error",error)};
 },[ready,reduced]);
 useEffect(()=>{
  const current=player.current;if(!current)return;
  if(ready && visible && !hidden && !paused && !userPaused && !ended && !failed) current.play();
  else current.pause();
 },[ready,visible,hidden,paused,userPaused,ended,failed,reduced]);
 const skip=()=>{
  setUserPaused(true);player.current?.pause();
  const hero=document.getElementById("cashvariance-hero");
  hero?.scrollIntoView({behavior:paused?"instant":"smooth",block:"start"});
  hero?.focus({preventScroll:true});
 };
 const replay=()=>{setEnded(false);setUserPaused(false);player.current?.seekTo(0);if(!paused)player.current?.play()};
 const toggle=()=>{if(playing){setUserPaused(true);player.current?.pause()}else{if(ended)replay();else{setUserPaused(false);player.current?.play()}}};
 return <section ref={root} className="intro-film" aria-label="The Treasury Observatory — CashVariance concept introduction" data-intro-playing={playing}>
  <div className="intro-stage" aria-hidden="true">
   {ready && !reduced && !failed ? <Player ref={player} component={ObservatoryFilm} durationInFrames={INTRO_FRAMES} fps={INTRO_FPS} compositionWidth={portrait?1080:1920} compositionHeight={portrait?1440:1080} style={{width:"100%",height:"100%"}} controls={false} loop={false} autoPlay={false} initiallyMuted clickToPlay={false} doubleClickToFullscreen={false} moveToBeginningWhenEnded={false} errorFallback={()=> <IntroPoster/>}/> : <IntroPoster/>}
  </div>
  <p className="sr-only">An eighteen-second fictional observatory film. A bank statement shows $240,000; the ledger shows $232,000. The source is stale. The $8,000 difference stays unexplained and held for human review. No journal or payment is sent.</p>
  <div className="intro-toolbar">
   <div className="intro-film-name"><span>THE TREASURY OBSERVATORY</span><small>{reduced?"Reduced motion · Still preview":failed?"Still preview":ended?"Film complete · Explore the daily close below":"18-second concept film · Silent"}</small></div>
   {ready && !reduced && !failed && <Timeline player={player} ready={ready}/>}
   <div className="intro-actions">
    {ready && !reduced && !failed && <><button type="button" onClick={toggle} disabled={paused} aria-label={playing?"Pause intro":"Play intro"}>{paused?"Motion paused":playing?"Pause Ⅱ":"Play ▷"}</button><button type="button" onClick={replay} disabled={paused} aria-label="Replay intro">Replay ↻</button></>}
    <button type="button" onClick={skip} className="intro-skip">{ended?"Continue to hero ↓":"Skip to hero ↓"}</button>
   </div>
  </div>
 </section>;
}
