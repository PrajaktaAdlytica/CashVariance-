# CashVariance website

A complete, scroll-based concept website built with Next.js, React, TypeScript and Motion for React. The selected Quiet Current identity combines Newsreader, Manrope and IBM Plex Mono with white, mineral grey, sage, clay and forest section surfaces, plus restrained ochre accents.

This is a research-stage website and isolated synthetic demo. It is not an operating treasury platform. No bank connections, bank/ERP writes, journal posting, payment execution, customer authentication or real lead delivery are implemented.

## Run locally

Use Node.js 22 or later.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For a production-style static preview:

```sh
npm run build
npm start
```

The production export is `out/`. The dependency-free local preview server serves that export and its branded 404 page. `PORT=3001 npm start` selects another port. `npm run typecheck` checks TypeScript.

## Project structure

- `src/app`: layout, routing, metadata, global responsive styles.
- `src/components/Home.tsx`: scroll narrative, product tabs, pilot and FAQ.
- `src/components/Pages.tsx`: complete product and supporting page layouts.
- `src/components/Primitives.tsx`: reusable motion, buttons, icons and disclosures.
- `src/components/TreasuryDemo.tsx`: deterministic fictional treasury workbench.
- `src/components/Inquiry.tsx`: local inquiry drafts, validation and downloads.
- `src/components/Analytics.tsx`: optional browser-only event adapter.
- `src/data`: five product definitions, supporting content, first-party SVG artwork.
- `public/brand`: vector logo, favicon, self-hosted fonts, icons, illustrations and textures.
- `qa`: browser results and real browser screenshots.
- `.openai/hosting.json`: existing private Sites project and static export configuration.

## Motion and interaction

Native scrolling preserves browser behavior. Motion provides section reveals, the hero's subtle depth, a scroll progress line, product tabs and accordion transitions. All inline SVG illustrations use staggered source-node, connection-trace and evidence-hold sequences. Diagram labels remain opaque and financial amounts remain fixed. Home workbench, workflow icons, pilot calendar and control pictograms also have coordinated sequences. The navigation includes Sign in on desktop and mobile, plus a global animation pause. Sequences pause outside the viewport and when the document is hidden. System reduced-motion preferences disable decorative animation and smooth scrolling; the controls remain usable. No physics or 3D runtime is needed for this design.

Keyboard support includes skip navigation, visible focus, Escape to dismiss navigation, arrow/Home/End tab navigation and native labeled form controls. Wide illustrations and comparison tables have contained scrolling on small screens.

## Intentional preview boundaries

Inquiry forms prepare an explicitly unsent text draft in browser memory. Nothing is sent or stored on a server; downloads require a deliberate click. Refreshing clears the form. A company contact endpoint, privacy handling and delivery confirmation are needed before enabling real submission.

The sign-in page explains preview access and opens the demo without collecting credentials. No customer accounts are implied. LinkedIn and Crunchbase source icons are included, but the footer does not invent company profiles.

Usage events are disabled by default and require the footer's session-only preference. They use a browser `CustomEvent`, not a remote collector. No form values or financial records are emitted. Valid source/campaign labels can accompany events after consent. See `BUILD-COVERAGE.md` for event definitions and reserved business events.

Pilot prices are labeled hypotheses. There is no checkout. The demo's bank $240,000, GL $232,000 and $8,000 observed difference stay unchanged after an explanation or reviewer decision. A separate $12,000 payment-review scenario cannot execute.

## Deployment and ownership

The static export can be hosted by a static provider. This project is configured for its existing owner-private Sites preview. Reuse the project identifier in `.openai/hosting.json`; do not create duplicate Sites projects. A custom domain, public audience or separate Vercel deployment is not configured. Metadata remains `noindex` while this is a concept preview.

Fonts and source artwork attribution are in `ASSET-LICENSES.txt`. Keep the font license files when redistributing. The accompanying CashVariance brand kit contains original design assets and guidance.

## Verification

Production build and TypeScript pass. Browser checks cover 25 routes at desktop, tablet and mobile sizes, interactions, synthetic demo state transitions and reduced motion. See `qa/QA-REPORT.md` and the JSON result files. These checks are not a claim of WCAG certification or a production security audit.

The five-offer section uses native scroll chapters: scrolling down selects 01–05; scrolling up reverses the sequence. The explorer stays pinned when it fits the viewport. Direct tabs and keyboard navigation remain available, with an unpinned layout on short screens.

## Observatory intro

The homepage begins with an 18-second, 30fps Remotion composition played directly by `@remotion/player`. Three authored scenes (approach, inspection, hold) use approved generated stills, frame-driven camera movement, independent region-masked WebGL water reflections and mist, and separate brand/data overlays. It is a browser-rendered 2.5D composition, not a true 3D camera orbit or exported MP4. Instrument markers remain static; all values are synthetic.

`npm run studio` opens the editable desktop/mobile compositions and individual scenes at port 3001. Source lives in `src/remotion/`; site controls and fallback are in `src/components/IntroFilm.tsx`. The three optimized WebP scenes total approximately 776 KiB. Original PNG keyframes are retained in the separate Flow pack.

The intro plays once when visible and holds its last frame. Pause, replay, seek, skip, global motion pause, offscreen suspension, and reduced-motion poster are supported. WebGL failure falls back to the same images with frame-driven camera movement; a composition error falls back to the static poster. No media audio or external services are used. Source motion is controlled entirely by Remotion frames, not independent animation timers. No MP4 export has been produced.

Player implementation references: https://www.remotion.dev/docs/player/examples and https://www.remotion.dev/docs/player/custom-controls .
