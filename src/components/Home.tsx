"use client";
import Link from "next/link";
import { track } from "./Analytics";
import { useContext, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { products } from "@/data/products";
import {
  Accordion,
  Button,
  Eyebrow,
  FinalCTA,
  HeroArt,
  Icon,
  MotionContext,
  Reveal,
  Synthetic,
} from "./Primitives";
export function PositionCard({
  step = 1,
  compact = false,
}: {
  step?: number;
  compact?: boolean;
}) {
  return (
    <div className={`position-card ${compact ? "compact" : ""}`}>
      <div className="position-top">
        <div className="entity-symbol">NQ</div>
        <div>
          <strong>North Quay Group</strong>
          <span>NQ-US · USD · ••2317</span>
        </div>
        <Synthetic compact />
      </div>
      <div className={`freshness ${step === 0 ? "highlight" : ""}`}>
        <Icon name="freshness" size={17} />
        <div>
          <strong>Source data is stale</strong>
          <span>Last file 08:00 UTC · Expected 09:00 UTC</span>
        </div>
        <span className="status-dot" />
      </div>
      <div className="position-values">
        <div>
          <span>Bank balance</span>
          <strong>$240,000</strong>
          <small>Statement / 08:00 UTC</small>
        </div>
        <div>
          <span>GL cash</span>
          <strong>$232,000</strong>
          <small>GL-61 / 08:00 UTC</small>
        </div>
      </div>
      <div className={`variance-row ${step === 1 ? "highlight" : ""}`}>
        <div>
          <span className="overline">Unexplained difference</span>
          <strong>
            $8,000<span>.00</span>
          </strong>
        </div>
        <span className="tag tag-held">Held</span>
      </div>
      <div className="position-record">
        <div>
          <span className="record-id">TR-808</span>
          <strong>Intercompany receipt</strong>
          <span>Counterparty confirmation pending</span>
        </div>
        <Icon name="arrow-up-right" size={18} />
      </div>
      <div className={`position-owner ${step === 2 ? "highlight" : ""}`}>
        <span className="avatar">MS</span>
        <div>
          <strong>
            Mira Shah <span>· fictional reviewer</span>
          </strong>
          <small>Next action: confirm attribution · Journal unposted</small>
        </div>
      </div>
      <div className="position-foot">
        <span>12 OCT 2026 · REVIEW AT 10:00 UTC</span>
        <Icon name="no-write" size={15} />
      </div>
    </div>
  );
}
function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const { paused } = useContext(MotionContext);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  return (
    <section className="home-hero" ref={ref}>
      <motion.div className="hero-background" style={{ y: paused ? 0 : y }}>
        <img
          src="/brand/backgrounds/ochre-current.webp"
          alt=""
          fetchPriority="high"
        />
        <div />
      </motion.div>
      <div className="container hero-content">
        <div className="hero-copy">
          <Eyebrow>Treasury exception review</Eyebrow>
          <h1>
            Explain the
            <br />
            difference.
            <br />
            <em>
              Before the next
              <br className="desktop-break" /> decision.
            </em>
          </h1>
          <p>
            A clearer way to review daily cash-position exceptions. Dated
            evidence. Named reviewers. Decisions that stay yours.
          </p>
          <div className="hero-buttons">
            <Button href="/request-diagnostic" light>
              Request diagnostic
            </Button>
            <Link className="hero-demo-link" href="/demo">
              <span className="play-circle">
                <Icon name="play" size={13} />
              </span>
              Explore the demo
            </Link>
          </div>
          <div className="hero-disclosure">
            Research-stage concept · No autonomous fund movement
          </div>
        </div>
        <motion.div
          className="hero-product"
          initial={false}
          animate={paused ? {} : { y: [0, -6, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="hero-product-label">
            <span className="tiny-dot" /> A closer look at the daily close
          </div>
          <PositionCard compact />
          <Link href="/demo" className="product-caption">
            Follow the $8,000 difference <Icon name="arrow" size={16} />
          </Link>
        </motion.div>
        <a className="scroll-cue" href="#the-difference">
          <span>Scroll to see the evidence</span>
          <span>↓</span>
        </a>
      </div>
    </section>
  );
}
function Story() {
  const [active, setActive] = useState(0);
  const steps = [
    {
      n: "01",
      title: "Start with what the sources actually say.",
      body: "A balance is only as useful as its cutoff. Compare bank and GL records with entity, currency and freshness in view.",
      note: "08:00 last source · 09:00 expected · 10:00 review",
    },
    {
      n: "02",
      title: "Keep the difference in plain sight.",
      body: "An $8,000 receipt is in the bank record. Its intercompany attribution is unconfirmed. A possible explanation is not a resolved exception.",
      note: "Bank $240,000 − GL $232,000 = $8,000",
    },
    {
      n: "03",
      title: "Give the next decision a human owner.",
      body: "Inspect the source, challenge the proposed match and record a hold with a named reviewer. An accepted explanation still does not post a journal.",
      note: "Evidence → reviewer → dated next action",
    },
  ];
  return (
    <section className="story-section" id="the-difference">
      <div className="container">
        <Reveal className="section-heading">
          <Eyebrow>The daily close, explained</Eyebrow>
          <h2>
            The number is a starting point.
            <br />
            <span className="muted">The explanation is the work.</span>
          </h2>
        </Reveal>
        <div className="story-grid">
          <div className="story-chapters">
            {steps.map((s, i) => (
              <motion.article
                key={s.n}
                className={`story-chapter ${active === i ? "active" : ""}`}
                onViewportEnter={() => setActive(i)}
                viewport={{ margin: "-30% 0px -30% 0px" }}
              >
                <span className="chapter-number">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <span className="chapter-note">{s.note}</span>
              </motion.article>
            ))}
          </div>
          <div className="story-sticky">
            <div className="story-tabs" aria-label="Evidence sequence">
              {["Source", "Difference", "Decision"].map((s, i) => (
                <button
                  key={s}
                  aria-pressed={active === i}
                  onClick={() => setActive(i)}
                >
                  <span>0{i + 1}</span>
                  {s}
                </button>
              ))}
            </div>
            <PositionCard step={active} />
            <div className="story-bottom">
              <span>One fictional record. An inspectable decision.</span>
              <Link href="/demo">
                Open the evidence <Icon name="arrow" size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export function ProductExplorer() {
  const [index, setIndex] = useState(0);
  const { paused } = useContext(MotionContext);
  const rail = useRef<HTMLDivElement>(null);
  const sticky = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const geometry = useRef({ top: 100, travel: 2000 });
  useEffect(() => {
    const outer = rail.current, inner = sticky.current;
    if (!outer || !inner) return;
    let frame = 0;
    let enabled = false;
    const update = () => {
      frame = 0;
      if (!enabled) return;
      const distance = geometry.current.top - outer.getBoundingClientRect().top;
      setIndex(Math.max(0, Math.min(4, Math.round(distance / geometry.current.travel * 4))));
    };
    const measure = () => {
      const top = (document.querySelector('.site-header')?.getBoundingClientRect().height || 76) + 16;
      const height = inner.getBoundingClientRect().height;
      const travel = Math.max(360, window.innerHeight * .6) * 4;
      enabled = height + top + 16 <= window.innerHeight;
      geometry.current = { top, travel };
      outer.style.setProperty('--offer-top', `${top}px`);
      outer.style.height = enabled ? `${height + travel}px` : 'auto';
      setPinned(enabled);
      update();
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(measure);
    observer.observe(inner);
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', scroll, { passive:true });
    measure();
    return () => { observer.disconnect(); window.removeEventListener('resize', measure); window.removeEventListener('scroll', scroll); cancelAnimationFrame(frame); };
  }, []);
  function selectOffer(next: number) {
    setIndex(next);
    if (pinned && rail.current) {
      const {top, travel} = geometry.current;
      const start = window.scrollY + rail.current.getBoundingClientRect().top - top;
      // Move the native page to the corresponding chapter; the pinned UI stays
      // in place. No wheel/touch interception or forced smooth scrolling.
      window.scrollTo({top: start + Math.max(1, Math.min(travel - 1, travel * next / 4)), behavior:'instant'});
    }
  }
  const p = products[index];
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => {
    const tab = refs.current[index], list = tab?.parentElement;
    if (tab && list && list.scrollWidth > list.clientWidth) {
      const left = list.scrollLeft + tab.getBoundingClientRect().left - list.getBoundingClientRect().left - (list.clientWidth - tab.clientWidth) / 2;
      list.scrollTo({left, behavior:'instant'});
    }
  }, [index]);
  function key(e: React.KeyboardEvent, i: number) {
    let n = i;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") n = (i + 1) % 5;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") n = (i + 4) % 5;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = 4;
    else return;
    e.preventDefault();
    selectOffer(n);
    refs.current[n]?.focus();
  }
  return (
    <div ref={rail} className={`offer-scroll ${pinned ? 'is-pinned' : ''}`}>
      <div ref={sticky} className="offer-sticky">
        <div className="offer-scroll-caption"><span>{pinned ? 'Scroll down to explore · Scroll up to revisit' : 'Choose a module to explore'}</span><span className="offer-count">0{index + 1}<span> / 05</span></span></div>
        <div className="offer-progress" aria-hidden="true"><span style={{width:`${(index + 1) * 20}%`}}/></div>
    <div className="product-explorer">
      <div
        className="product-list"
        role="tablist"
        aria-label="Proposed treasury modules"
        aria-orientation="vertical"
      >
        {products.map((prod, i) => (
          <button
            ref={(el) => {
              refs.current[i] = el;
            }}
            id={`module-tab-${i}`}
            key={prod.id}
            role="tab"
            aria-selected={i === index}
            aria-controls={`module-panel-${i}`}
            tabIndex={i === index ? 0 : -1}
            onKeyDown={(e) => key(e, i)}
            onClick={() => {
              selectOffer(i);
              track("offer_16_selected", {
                concept_id: 16,
                selected_offer_id: prod.id,
              });
            }}
            className={i === index ? "active" : ""}
          >
            <span className="product-index">0{prod.id}</span>
            <div>
              <strong>{prod.name}</strong>
              <span>{prod.job}</span>
            </div>
            <Icon name="arrow-up-right" size={18} />
          </button>
        ))}
      </div>
      <div className={`product-stage theme-${p.theme}`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={p.slug}
            id={`module-panel-${index}`}
            role="tabpanel"
            aria-labelledby={`module-tab-${index}`}
            initial={{ opacity: 0, y: paused ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: paused ? 0 : 0.22 }}
          >
            <div className="product-stage-top">
              <Icon name={p.icon} size={24} />
              <span className="eyebrow">Proposed module / 0{p.id}</span>
            </div>
            <HeroArt name={p.slug} />
            <div className="product-stage-copy">
              <h3>{p.headline}</h3>
              <p>{p.description}</p>
              <Link href={`/products/${p.slug}`} className="text-link">
                Explore {p.name}
                <Icon name="arrow" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
      </div>
    </div>
  );
}
const faqs = [
  {
    q: "Is CashVariance an operating treasury platform?",
    a: "CashVariance is a research-stage concept. The site demonstrates a proposed workflow using synthetic records. No live integrations, customer outcomes or production availability are claimed.",
  },
  {
    q: "Where would the first pilot start?",
    a: "With permissioned, read-only bank statement and GL exports for one entity across 20 historical daily closes. The team would select one lead module and agree the baseline before evaluating outcomes.",
  },
  {
    q: "Can the agent move funds or post a journal?",
    a: "No. The demo and proposed pilot have no payment initiation, bank rails or ERP writes. Proposed journals remain drafts; reviewers retain authority.",
  },
  {
    q: "How is useful performance measured?",
    a: "Against the same underlying records and current process: treasurer-accepted exception closures, position differences, review time, stale-source incidents and false closures or omissions. Clicks and demo polish do not establish demand.",
  },
  {
    q: "What does a diagnostic cost?",
    a: "The brief proposes a hypothetical test price of $3,000 for a fixed diagnostic. A separate recurring hypothesis is $1,500–$5,000 per month per entity group. These are research hypotheses, not active checkout offers.",
  },
];
export default function Home() {
  return (
    <>
      <HomeHero />
      <section className="audience-strip">
        <div className="container">
          <span>Built around a specific treasury job.</span>
          <div>
            <span>Multi-bank</span>
            <i />
            <span>Multi-entity</span>
            <i />
            <span>Midmarket finance</span>
          </div>
          <Link href="/why-cash-exceptions">
            Why exceptions persist <Icon name="arrow-up-right" size={16} />
          </Link>
        </div>
      </section>
      <section className="problem-section container">
        <Reveal>
          <Eyebrow>A question for your treasury team</Eyebrow>
          <h2>
            Across your last 20 daily closes,
            <br />
            how many differences needed
            <br />
            <em>a manual explanation?</em>
          </h2>
        </Reveal>
        <div className="problem-notes">
          <Reveal>
            <span>01 / Source timing</span>
            <p>One late file can change what a cash position means.</p>
          </Reveal>
          <Reveal delay={0.08}>
            <span>02 / Unmatched items</span>
            <p>The amount may match. The supporting record may not.</p>
          </Reveal>
          <Reveal delay={0.16}>
            <span>03 / Review ownership</span>
            <p>A held item needs a reason, a reviewer and a next action.</p>
          </Reveal>
        </div>
      </section>
      <Story />
      <section className="modules-section container" id="modules">
        <Reveal className="section-heading heading-split">
          <div>
            <Eyebrow>Five focused offers</Eyebrow>
            <h2>
              A specific job.
              <br />A clearer way to review it.
            </h2>
          </div>
          <p>
            Start with the repeat task your team needs to solve. Each module is
            a separately testable proposal.
          </p>
        </Reveal>
        <ProductExplorer />
        <Link href="/products" className="understated-link">
          Compare all five proposed modules <Icon name="arrow" size={16} />
        </Link>
      </section>
      <section className="workflow-section">
        <div className="container">
          <Reveal className="section-heading">
            <Eyebrow>A reviewed workflow</Eyebrow>
            <h2>
              From dated sources.
              <br />
              <em>To a decision you can inspect.</em>
            </h2>
          </Reveal>
          <div className="workflow-steps">
            {[
              [
                "Compare",
                "Import permissioned historical statements and GL exports. Establish coverage, currency and cutoff.",
                "compare",
              ],
              [
                "Review",
                "Open the difference, trace the evidence and challenge the proposed explanation.",
                "evidence",
              ],
              [
                "Record",
                "Keep a reviewer-owned memo of the decision, its limits and the next action.",
                "memo",
              ],
            ].map(([t, b, icon], i) => (
              <Reveal key={t} delay={i * 0.1}>
                <div className="workflow-icon">
                  <Icon name={icon} size={35} />
                  <span>0{i + 1}</span>
                </div>
                <h3>{t}.</h3>
                <p>{b}</p>
              </Reveal>
            ))}
          </div>
          <Button href="/how-it-works" secondary>
            See how it works
          </Button>
        </div>
      </section>
      <section className="controls-section">
        <div className="container controls-grid">
          <Reveal>
            <Eyebrow>Human authority, throughout</Eyebrow>
            <h2>
              Clear evidence.
              <br />
              Clear ownership.
              <br />
              <em>Clear limits.</em>
            </h2>
            <p>
              A proposed review layer should make its boundaries as visible as
              its recommendations.
            </p>
            <Button href="/controls" light>
              Explore controls & data
            </Button>
          </Reveal>
          <Reveal className="control-rows">
            {[
              [
                "Read-only by design",
                "Permissioned historical statements and GL exports.",
                "import",
              ],
              [
                "Freshness stays visible",
                "Source cutoffs and missed updates stay with the position.",
                "freshness",
              ],
              [
                "Two distinct reviewers",
                "Payment-file review cannot collapse segregation of duties.",
                "dual-review",
              ],
              [
                "Execution stays unavailable",
                "No bank or ERP writes, journal posting or fund movement.",
                "no-write",
              ],
            ].map(([t, b, i]) => (
              <div key={t}>
                <Icon name={i} size={26} />
                <div>
                  <h3>{t}</h3>
                  <p>{b}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
      <section className="pilot-section container">
        <div className="pilot-grid">
          <Reveal>
            <Eyebrow>Earn the next step</Eyebrow>
            <h2>
              One entity.
              <br />
              Twenty daily closes.
              <br />
              <em>Actual evidence.</em>
            </h2>
            <p>
              Compare reviewed outcomes against your current process, using the
              same historical records. Decide what earns a continuation before
              the pilot starts.
            </p>
            <Button href="/pilot">Explore the pilot</Button>
          </Reveal>
          <Reveal className="pilot-scorecard">
            <div className="scorecard-top">
              <span className="eyebrow">Pilot evaluation</span>
              <Icon name="calendar" />
            </div>
            <div className="calendar-grid">
              {Array.from({ length: 20 }, (_, i) => (
                <span key={i}>{String(i + 1).padStart(2, "0")}</span>
              ))}
            </div>
            <div className="scorecard-row">
              <span>Accepted exception closures</span>
              <span>To be measured</span>
            </div>
            <div className="scorecard-row">
              <span>Review time / daily close</span>
              <span>To be measured</span>
            </div>
            <div className="scorecard-row">
              <span>False closures & omissions</span>
              <span>To be measured</span>
            </div>
            <p>No claimed outcomes. No hidden stale data.</p>
          </Reveal>
        </div>
        <div className="price-note">
          <span>Hypothetical test pricing</span>
          <strong>
            $3,000 <small>fixed diagnostic</small>
          </strong>
          <p>
            Separate recurring hypothesis: $1,500–$5,000/month per entity group.
            Scope and a bounded pilot quote require discussion.
          </p>
          <Link href="/pilot">
            See scope & assumptions <Icon name="arrow-up-right" size={16} />
          </Link>
        </div>
      </section>
      <section className="faq-section container">
        <Reveal className="faq-intro">
          <Eyebrow>Before the conversation</Eyebrow>
          <h2>
            A few important
            <br />
            distinctions.
          </h2>
          <Link href="/contact" className="text-link">
            Have another question?
            <Icon name="arrow" size={16} />
          </Link>
        </Reveal>
        <Accordion items={faqs} />
      </section>
      <FinalCTA />
    </>
  );
}
