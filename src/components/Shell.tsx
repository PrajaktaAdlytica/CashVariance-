"use client";
import Link from "next/link";
import { UsagePreferences } from "./Analytics";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll } from "motion/react";
import { products } from "@/data/products";
import { Icon, MotionContext } from "./Primitives";
export function Header() {
  const [menu, setMenu] = useState(false),
    [mobile, setMobile] = useState(false);
  const path = usePathname();
  const { scrollYProgress } = useScroll();
  const { paused, reduced, toggle } = useContext(MotionContext);
  const trigger = useRef<HTMLButtonElement>(null);
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    setMenu(false);
    setMobile(false);
  }, [path]);
  useEffect(() => {
    function close(e: KeyboardEvent) {
      if (e.key === "Escape" && (menu || mobile)) {
        setMenu(false);
        setMobile(false);
        (document.querySelector<HTMLButtonElement>(".mobile-toggle")
          ?.offsetParent
          ? document.querySelector<HTMLButtonElement>(".mobile-toggle")
          : trigger.current
        )?.focus();
      }
    }
    function click(e: PointerEvent) {
      if (root.current && !root.current.contains(e.target as Node))
        setMenu(false);
    }
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", click);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", click);
    };
  }, [menu, mobile]);
  useEffect(() => {
    let frame = 0;
    const updateContrast = () => {
      frame = 0;
      const header = root.current;
      if (!header) return;
      const y = header.getBoundingClientRect().height / 2;
      let surface = document.elementsFromPoint(innerWidth / 2, y).find(
        el => el instanceof HTMLElement && !header.contains(el) && el !== header,
      );
      let dark = false;
      while (surface) {
        const channels = getComputedStyle(surface).backgroundColor.match(/[\d.]+/g)?.map(Number);
        if (channels && channels.length >= 3 && (channels[3] ?? 1) > .5) {
          dark = channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722 < 130;
          break;
        }
        surface = surface.parentElement || undefined;
      }
      header.dataset.surface = dark ? "dark" : "light";
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(updateContrast); };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [path]);
  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <header className="site-header" ref={root}>
        <div className="nav-wrap">
          <Link href="/" aria-label="CashVariance home" className="logo">
            <img
              src="/brand/logo/lockup-ink.svg"
              alt="CashVariance"
              width="210"
              height="36"
            />
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            <button
              ref={trigger}
              className={menu ? "nav-item selected" : "nav-item"}
              aria-expanded={menu}
              aria-controls="product-menu"
              onClick={() => setMenu(!menu)}
            >
              Products <Icon name={menu ? "minus" : "plus"} size={13} />
            </button>
            <Link className="nav-item" href="/how-it-works">
              How it works
            </Link>
            <Link className="nav-item" href="/use-cases">
              Use cases
            </Link>
            <Link className="nav-item" href="/pilot">
              Pilot & pricing
            </Link>
            <Link className="nav-item" href="/resources">
              Resources
            </Link>
          </nav>
          <div className="nav-actions">
            <Link href="/sign-in" className="nav-sign-in">
              Sign in
            </Link>
            <Link href="/demo" className="nav-demo">
              Explore demo <Icon name="arrow-up-right" size={14} />
            </Link>
            <Link className="nav-cta" href="/request-diagnostic">
              Request diagnostic
            </Link>
            <button
              className="motion-control"
              onClick={toggle}
              disabled={reduced}
              aria-label={
                reduced
                  ? "Animations reduced by your device settings"
                  : paused
                    ? "Resume animations"
                    : "Pause animations"
              }
              title={
                reduced
                  ? "Animations reduced by your device settings"
                  : paused
                    ? "Resume animations"
                    : "Pause animations"
              }
              aria-pressed={paused}
            >
              <Icon name={paused ? "play" : "pause"} size={15} />
            </button>
            <button
              className="mobile-toggle"
              aria-label={mobile ? "Close navigation" : "Open navigation"}
              aria-expanded={mobile}
              onClick={() => setMobile(!mobile)}
            >
              <Icon name={mobile ? "close" : "menu"} />
            </button>
          </div>
        </div>
        {!paused && (
          <motion.div
            className="scroll-progress"
            style={{ scaleX: scrollYProgress }}
          />
        )}
        <AnimatePresence>
          {menu && (
            <motion.div
              id="product-menu"
              className="mega-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: paused ? 0 : 0.2 }}
            >
              <div className="mega-intro">
                <span className="eyebrow">Proposed product suite</span>
                <h3>
                  A specific job.
                  <br />A reviewable answer.
                </h3>
                <Link href="/products">
                  Compare all five modules <Icon name="arrow" />
                </Link>
              </div>
              <div className="mega-products">
                {products.map((p) => (
                  <Link key={p.slug} href={`/products/${p.slug}`}>
                    <Icon name={p.icon} />
                    <div>
                      <strong>{p.name}</strong>
                      <span>{p.job}</span>
                    </div>
                    <Icon name="arrow-up-right" size={16} />
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {mobile && (
            <motion.nav
              className="mobile-menu"
              aria-label="Mobile navigation"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: paused ? 0 : 0.2 }}
            >
              <Link href="/products">All products</Link>
              {products.map((p) => (
                <Link
                  className="mobile-product"
                  key={p.slug}
                  href={`/products/${p.slug}`}
                >
                  {p.name}
                  <span>{p.job}</span>
                </Link>
              ))}
              {[
                ["How it works", "/how-it-works"],
                ["Use cases", "/use-cases"],
                ["Pilot & pricing", "/pilot"],
                ["Resources", "/resources"],
                ["Controls", "/controls"],
                ["About", "/about"],
                ["Contact", "/contact"],
                ["Sign in", "/sign-in"],
                ["Explore demo", "/demo"],
                ["Request diagnostic", "/request-diagnostic"],
              ].map(([t, h]) => (
                <Link key={h} href={h}>
                  {t}
                  <Icon name="arrow" />
                </Link>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
const groups = [
  {
    title: "Products",
    links: products.map((p) => [p.name, `/products/${p.slug}`]),
  },
  {
    title: "Explore",
    links: [
      ["How it works", "/how-it-works"],
      ["Use cases", "/use-cases"],
      ["Why exceptions persist", "/why-cash-exceptions"],
      ["Interactive demo", "/demo"],
      ["Controls & data", "/controls"],
    ],
  },
  {
    title: "Start a conversation",
    links: [
      ["Pilot & pricing", "/pilot"],
      ["Request diagnostic", "/request-diagnostic"],
      ["Request guided demo", "/request-demo"],
      ["About CashVariance", "/about"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Evaluation method", "/resources/pilot-scorecard"],
      ["Data checklist", "/resources/data-checklist"],
      ["Research & sources", "/resources/research"],
      ["Sign in", "/sign-in"],
    ],
  },
];
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <Link href="/" className="footer-logo">
            <img
              src="/brand/logo/lockup-ivory.svg"
              width="250"
              height="45"
              alt="CashVariance"
            />
          </Link>
          <p>
            Explain the difference.
            <br />
            Keep the decision yours.
          </p>
        </div>
        <div className="footer-links">
          {groups.map((g) => (
            <div key={g.title}>
              <h3>{g.title}</h3>
              {g.links.map(([title, href]) => (
                <Link href={href} key={href}>
                  {title}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} CashVariance · Research-stage concept
          </span>
          <div>
            <UsagePreferences />
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Concept terms</Link>
            <a href="#main" aria-label="Back to main content">
              Back to top ↑
            </a>
          </div>
        </div>
        <p className="footer-note">
          Synthetic product examples. No live bank connection, payment
          initiation or bank/ERP writes.
        </p>
      </div>
    </footer>
  );
}
