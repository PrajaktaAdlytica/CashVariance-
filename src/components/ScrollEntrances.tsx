"use client";

import { animate } from "motion/react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Animate content only: section backgrounds and sticky ancestors stay still. */
export function ScrollEntrances({ disabled }: { disabled: boolean }) {
  const pathname = usePathname();
  useEffect(() => {
    if (disabled || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const candidates = new Set<HTMLElement>();
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      const children = el.matches(".support-band")
        ? el.querySelectorAll<HTMLElement>(".support-section > div")
        : el.matches(".heading-split, .control-rows")
          ? el.children : null;
      if (children) Array.from(children).forEach(child => candidates.add(child as HTMLElement));
      else candidates.add(el);
    });
    document.querySelectorAll<HTMLElement>([
      ".audience-strip > *", ".product-summary > div", ".price-note > *",
      ".accordion-item", ".resource-links > a", ".footer-top > *",
      ".footer-links > div", ".footer-bottom", ".product-faq > h2",
      ".comparison > h2", ".comparison > p", ".comparison .table-scroll",
      ".permissions-section > h2", ".permissions-section .table-scroll",
      ".page-hero-center > h1", ".page-hero-center > p", ".catalog-hero-art",
      ".form-intro > h1", ".form-intro > p", ".access-illustration", ".access-card",
    ].join(",")).forEach(el => candidates.add(el));
    // No nested entrances: moving a parent already moves its entire contents.
    const targets = [...candidates].filter(el => ![...candidates].some(parent => parent !== el && parent.contains(el)));
    const animations = new Map<HTMLElement, ReturnType<typeof animate>>();
    const visible = new Set<Element>();
    const reset = (el: HTMLElement) => {
      animations.get(el)?.stop();
      // Reset Motion's cached values as well as DOM styles; a queued frame
      // must never restore an interrupted entrance after pause or focus.
      if (animations.has(el)) animate(el, { x: 0, opacity: 1 }, { duration: 0 });
      animations.delete(el);
      el.style.removeProperty("transform");
      el.style.removeProperty("opacity");
      el.style.removeProperty("will-change");
    };
    targets.forEach((el, index) => {
      el.dataset.scrollEntrance = index % 2 ? "right" : "left";
    });
    const observer = new IntersectionObserver(entries => {
      let order = 0;
      entries.forEach(entry => {
        const el = entry.target as HTMLElement;
        if (!entry.isIntersecting) {
          visible.delete(el);
          reset(el);
          return;
        }
        if (visible.has(el)) return;
        visible.add(el);
        if (el.contains(document.activeElement)) return;
        const distance = window.innerWidth < 600 ? 22 : 44;
        const x = el.dataset.scrollEntrance === "left" ? -distance : distance;
        const delay = Math.min(order++ * .09 + Number(el.dataset.revealDelay || 0), .28);
        el.style.willChange = "transform, opacity";
        const animation = animate(el, { x: [x, 0], opacity: [.35, 1] }, {
          duration: .72, delay, ease: [.22, 1, .36, 1],
          onComplete: () => { el.style.removeProperty("will-change"); },
        });
        animations.set(el, animation);
      });
    }, { threshold: 0, rootMargin: "-80px 0px -35px 0px" });
    targets.forEach(el => observer.observe(el));
    const focus = (event: FocusEvent) => targets.forEach(el => {
      if (event.target instanceof Node && el.contains(event.target)) reset(el);
    });
    document.addEventListener("focusin", focus);
    return () => {
      observer.disconnect();
      document.removeEventListener("focusin", focus);
      targets.forEach(el => { reset(el); delete el.dataset.scrollEntrance; });
    };
  }, [pathname, disabled]);
  return null;
}
