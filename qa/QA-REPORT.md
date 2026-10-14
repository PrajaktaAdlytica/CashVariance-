# CashVariance browser verification

Verified 14 October 2026 against the production static export using Chromium/Playwright.

- Production Next.js build: passed, 26 generated entries including internal not-found output.
- TypeScript: passed as part of the build.
- Website suite: **94/94 checks passed**, including 25 routes at 1440px, 768px and 390px; one H1 per route, no document overflow, loaded images and valid internal destinations.
- Navigation, keyboard module tabs, FAQ expansion, pause controls, reduced-motion reload, form validation, local downloads, return-to-edit preservation, preselected roles/modules and consent behavior: passed.
- Demo suite: **19/19 checks passed**. Includes arithmetic, rejected false match, counterparty evidence, reasoned override, forecast/date branches, distinct reviewers, changed-file invalidation, memo provenance, reset and unavailable execution.
- Demo layouts: 390px and 320px across all four tabs, no document overflow.
- Additional focused checks: product-module deep links, consented UTM labels, local static server and branded 404 passed.
- No JavaScript errors or failed asset requests in the final website suite. No network writes from inquiry forms.

## Visual review

Inspected the home, product illustration, controls, inquiry form and full treasury workbench at desktop and mobile sizes. Corrected narrow-screen diagram sizing so it no longer enlarges or clips the text columns. Wide diagrams use contained horizontal scrolling with an instruction. Added reduced-motion-safe hydration after detecting a first-render mismatch.

The `home-1440x900.png`, `home-390x844.png`, `demo-1440x900.png` and `demo-390x844.png` files are actual browser viewport captures. Other PNGs show full workbench and supporting page views. No screenshot is presented as a live financial product or customer outcome.

## Limits

This was a local functional/responsive review, not a full accessibility certification, security assessment, exhaustive browser matrix or load test. Real inquiry delivery, authentication, financial integrations, data storage, payment processing and business-outcome analytics are intentionally absent from the concept. The private hosting deployment is verified separately after these local checks.

Machine-readable evidence: `site-results.json` and `demo-results.json`. `example-memo.txt` is an actual synthetic demo export produced during the interaction test.

## Site-wide visual update

Added a persistent Sign in link to desktop/mobile navigation and the footer, and redesigned the concept access page. Replaced repeated cream backgrounds with white, sage, mineral grey, clay and forest chapters across all page families. Added staged animation to all 25 SVG compositions, plus the home position card, process, calendar, controls and demo position accents. Values never animate into different financial outcomes.

The website suite still passes 94/94 checks and the demo suite 19/19. An additional 27/27 targeted checks verify Sign in and navigation at 320, 390, 768, 1024, 1200 and 1440px, actual sequence progression, opaque diagram labels, offscreen/global pause, reduced-motion still states, section color variety and no browser errors. See `visual-update-results.json`.

## Scroll-driven offer selection

The five-offer explorer pins only when its full content fits beneath the header. Native page scrolling selects 01 through 05 and reverses on upward scrolling. Clicking a tab or using arrow/Home/End keys moves directly to its chapter. Mobile selection keeps the active tab in view. Short viewports use the complete unpinned tab interface, and reduced motion removes transitions without removing access to any offer. See `offers-scroll-results.json` for focused tests at the marked 775×804 viewport, desktop and mobile sizes.

### Bidirectional section entrances — 14 October 2026
- Alternating left/right, staggered Motion entrances replay on viewport reentry.
- Content blocks animate independently; sticky offer/story containers remain unchanged.
- Native scroll retained; pause, keyboard focus, and reduced motion settle readable content.
- Production build passed. Site suite: 94 checks across 25 routes. Offer scrolling suite: 79 checks. New entrance suite: 8 checks covering down/up replay, final readability, both directions, pause reset, reduced motion, supporting pages, and mobile overflow.

### Cash Proof diagram label clearance — 14 October 2026
Recomposed the shared SVG with a separate result-label column, receipt assumption above the paths, and two-line inputs beneath. Removed the native SVG hover tooltip while retaining an accessible description. Paths animate without moving labels. Production build passed; geometric checks at 1440, 775 and 390px on both homepage and product page found no path/text collisions (5-unit clearance), text clipping, or tooltip. Reviewed the mobile capture.

### Hero reconciliation sequence — 14 October 2026
Replaced the floating-only hero card with three timed chapters: compare source records, trace the $8,000 variance, and hold for reviewer confirmation. Added source tiles, animated converging paths, a comparison scan, variance emphasis, reviewer emphasis, layered card framing, and selectable chapter controls. Financial values, stale warning, synthetic labels, and held status remain visible and unchanged. Motion suspends offscreen, in a hidden tab, during keyboard interaction, with global pause, and for reduced motion.
Production build passed. All 16 focused checks passed at desktop, 775px, 390px and 320px; reviewed desktop and mobile captures. Full site suite passed 94 checks across 25 routes.
