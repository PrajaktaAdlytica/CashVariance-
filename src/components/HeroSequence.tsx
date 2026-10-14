"use client";

import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Icon, MotionContext } from "./Primitives";

const chapters = [
  { title: "Compare sources", note: "Two dated records. One cash position." },
  { title: "Trace the difference", note: "$240,000 − $232,000 = $8,000 unexplained." },
  { title: "Hold for review", note: "Confirmation pending. No journal or payment sent." },
];

export function HeroSequence({ children }: { children: ReactNode }) {
  const { paused } = useContext(MotionContext);
  const ref = useRef<HTMLDivElement>(null);
  const [chapter, setChapter] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [focused, setFocused] = useState(false);
  const playing = !paused && visible && !hidden && !focused;

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .15 });
    if (ref.current) observer.observe(ref.current);
    const visibility = () => setHidden(document.hidden);
    visibility();
    document.addEventListener("visibilitychange", visibility);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", visibility); };
  }, []);
  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      setChapter(value => (value + 1) % chapters.length);
      setCycle(value => value + 1);
    }, 4800);
    return () => clearTimeout(timer);
  }, [playing, chapter, cycle]);

  return (
    <div ref={ref} className="hero-sequence" data-chapter={chapter} data-playing={playing}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
      <div className="hero-source-rail" aria-label="Read-only source records">
        <div className="hero-source source-bank"><Icon name="bank" size={17} /><div><strong>Bank statement</strong><span>••2317 / 08:00 UTC</span></div><span className="source-marker">01</span></div>
        <div className="hero-source source-gl"><Icon name="ledger" size={17} /><div><strong>General ledger</strong><span>GL-61 / READ ONLY</span></div><span className="source-marker">02</span></div>
      </div>
      <svg className="hero-source-paths" viewBox="0 0 440 46" preserveAspectRatio="none" aria-hidden="true">
        <path className="route-base" d="M105 0V16Q105 24 113 24H212Q220 24 220 32V46M335 0V16Q335 24 327 24H228Q220 24 220 32" />
        <path key={cycle} className="route-trace" pathLength="100" d="M105 0V16Q105 24 113 24H212Q220 24 220 32V46M335 0V16Q335 24 327 24H228Q220 24 220 32" />
        <circle cx="220" cy="24" r="3" />
      </svg>
      <motion.div className="hero-evidence-frame" initial={false}
        animate={playing ? { y: [5, 0], rotateX: [1.5, 0] } : { y: 0, rotateX: 0 }}
        transition={{ duration: .9, ease: [.22, 1, .36, 1] }}>
        {children}
      </motion.div>
      <div className="hero-chapters" role="group" aria-label="Illustrative reconciliation sequence">
        {chapters.map((item, index) => <button type="button" key={item.title}
          aria-pressed={chapter === index} onClick={() => { setChapter(index); setCycle(value => value + 1); }}>
          <span className="hero-chapter-number">0{index + 1}</span><span>{item.title}</span>
          {chapter === index && <i key={cycle} className="chapter-progress" aria-hidden="true" />}
        </button>)}
      </div>
      <p className="hero-chapter-note">{chapters[chapter].note}</p>
    </div>
  );
}
