"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  useReducedMotion,
} from "motion/react";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
} from "react";
import art from "@/data/hero-art.json";
import { ScrollEntrances } from "./ScrollEntrances";
export const MotionContext = createContext({
  paused: false,
  reduced: false,
  toggle: () => {},
});
export function MotionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  // Keep the server and first client render identical. CSS applies the system
  // preference immediately; update render-dependent controls after hydration.
  const [systemReduced, setSystemReduced] = useState(false);
  useEffect(() => setSystemReduced(!!reduced), [reduced]);
  useEffect(() => {
    document.body.dataset.paused = String(paused || reduced);
  }, [paused, reduced]);
  useEffect(() => {
    const visibility = () => {
      document.body.dataset.hidden = String(document.hidden);
    };
    visibility();
    document.addEventListener("visibilitychange", visibility);
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) =>
          entry.target.classList.toggle("visual-in-view", entry.isIntersecting),
        ),
      { threshold: 0.12 },
    );
    const visuals = document.querySelectorAll(
      ".position-card, .workflow-icon, .pilot-scorecard, .control-rows, .hero-background, .td-workbench",
    );
    visuals.forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [pathname]);
  return (
    <MotionContext.Provider
      value={{
        paused: paused || systemReduced,
        reduced: systemReduced,
        toggle: () => setPaused((p) => !p),
      }}
    >
      <MotionConfig reducedMotion="user">
        {children}
        <ScrollEntrances disabled={paused || !!reduced} />
      </MotionConfig>
    </MotionContext.Provider>
  );
}
export function Icon({
  name = "arrow",
  size = 20,
  className = "",
}: {
  name?: string;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      aria-hidden="true"
    >
      <use href={`/brand/icons/sprite.svg#${name}`} />
    </svg>
  );
}
export function Button({
  href,
  children,
  secondary = false,
  light = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  light?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`button ${secondary ? "button-outline" : ""} ${light ? "button-light" : ""} ${className}`}
    >
      <span>{children}</span>
      <span className="button-arrow">
        <Icon name="arrow" />
        <Icon name="arrow-up-right" />
      </span>
    </Link>
  );
}
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div className={className} data-reveal data-reveal-delay={delay}>
      {children}
    </div>
  );
}
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="eyebrow">
      <span />
      {children}
    </div>
  );
}
export function HeroArt({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ob = new IntersectionObserver(
      ([e]) =>
        ref.current?.classList.toggle("motion-offscreen", !e.isIntersecting),
      { rootMargin: "100px" },
    );
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`hero-art motion-sequence ${className}`}
      data-visual={name}
      dangerouslySetInnerHTML={{
        __html: (art as Record<string, string>)[name] || art.products,
      }}
    />
  );
}
export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const { paused } = useContext(MotionContext);
  return (
    <div className="accordion">
      {items.map((item, i) => (
        <div className="accordion-item" key={item.q}>
          <h3>
            <button
              aria-expanded={open === i}
              aria-controls={`answer-${i}`}
              onClick={() => setOpen(open === i ? null : i)}
            >
              {item.q}
              <span className={open === i ? "turned" : ""}>
                <Icon name="plus" />
              </span>
            </button>
          </h3>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                id={`answer-${i}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: paused ? 0 : 0.28 }}
                className="accordion-answer"
              >
                <p>{item.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
export function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="container cta-grid">
        <Reveal>
          <Eyebrow>A focused first step</Eyebrow>
          <h2>
            Start with one entity.
            <br />
            Find out what’s possible.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p>
            Bring a recurring exception, an existing process and a willingness
            to compare the evidence.
          </p>
          <Button href="/request-diagnostic" light>
            Request a diagnostic
          </Button>
          <div className="small-note">
            Proposed pilot · 20 daily closes · Read-only
          </div>
        </Reveal>
      </div>
    </section>
  );
}
export function Disclosure() {
  return (
    <span className="disclosure">
      Research-stage concept · No autonomous fund movement
    </span>
  );
}
export function Synthetic({ compact = false }: { compact?: boolean }) {
  return (
    <span className="synthetic">DEMO {compact ? "·" : "—"} SYNTHETIC DATA</span>
  );
}
