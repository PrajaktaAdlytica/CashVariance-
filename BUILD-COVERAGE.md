# Brief-to-build coverage

## Website architecture

| Area | Route(s) | Implemented content |
|---|---|---|
| Landing narrative | `/` | Treasury buyer, workflow question, stale bank/GL example, five offers, reviewed process, controls, 20-close pilot, hypothetical pricing, FAQ and inquiry CTA |
| Product suite | `/products/` | Five independent proposals and comparison table |
| Opening position | `/products/cash-desk/` | Multi-bank opening-position reconciliation, inputs, proposed output and evaluation |
| Unmatched items | `/products/cash-review/` | Classification and unmatched-item review, evidence and reviewer boundaries |
| Cash outlook | `/products/cash-proof/` | Near-term shortfall/excess scenarios and editable assumptions |
| Payment review | `/products/cash-signal/` | Approved-file anomaly review, distinct reviewers and unavailable execution |
| Intercompany | `/products/cash-report/` | Movement proposals and counterparty evidence, no autonomous movement |
| Workflow | `/how-it-works/`, `/why-cash-exceptions/` | Read-only compare/review/record loop and the specific exception problem |
| Buyers | `/use-cases/` | Treasury, controllers, PE finance teams and implementation partners |
| Controls | `/controls/` | Permission matrix, freshness, segregation of duties, human authority and review limitations |
| Commercial evaluation | `/pilot/` | One entity, 20 daily closes, historical ground truth, measurable acceptance/kill criteria and hypothetical prices |
| Resources | `/resources/`, `/resources/pilot-scorecard/`, `/resources/data-checklist/`, `/resources/research/` | Evaluation method, preparation, competitor evidence and unanswered research questions |
| Company | `/about/`, `/contact/` | Research-stage company story and local contact draft |
| Conversion | `/request-diagnostic/`, `/request-demo/` | Labeled form, errors, explicit purpose consent, optional updates and unsent local download |
| Preview access | `/sign-in/` | Complete access page without fake credentials or customer accounts |
| Product experience | `/demo/` | Deterministic synthetic workbench, queue, evidence, assumptions, payment review and memo |
| Notices | `/privacy/`, `/terms/` | Accurate preview behavior and concept limitations |
| Not found | `/404.html` | Branded recovery links |

## Product demo and data integrity

The fictional North Quay Group uses entity NQ-US, account ••2317, GL-61 and transaction TR-808. Ten bank records total +$40,000 over a $200,000 opening balance. Nine GL matches total +$32,000. The difference is exactly $8,000.

Both source snapshots are dated 12 October 2026 at 08:00 UTC. The expected 09:00 update is missing at the simulated 10:00 review. The stale warning remains visible throughout. A synthetic confirmation supports an explanation, not a bank balance update or posted journal.

The queue includes a false candidate, TR-806, that can be rejected because it is already matched. Reviewers can hold or override a proposed classification with a reason and a dated next action. The local memo preserves provenance, disposition and the unchanged observed difference.

The payment scenario is an unrelated illustrative $12,000 file. Missing evidence blocks acknowledgments. Reviewers must be distinct; changing the file invalidates both acknowledgments. Execution is always unavailable. A two-day forecast uses editable, labeled assumptions and excludes missing/out-of-window receipt dates.

Every demo surface and export identifies synthetic data. No live-feed badges, real financial/customer identifiers, testimonials, certification badges, vendor integration logos or measured ROI are fabricated.

## Branding and graphic system

The Open Difference vector mark and custom favicon carry through the site. Typography and semantic surface colors come from the approved brand kit. Distinct SVG compositions depict comparisons, assumptions, process, review gates, entity relationships, timelines and institutional subjects. Backgrounds use original ochre material art, restrained diagram patterns and alternate light/forest surfaces.

The site uses a custom landing composition, editorial product layouts, an illustrated catalog, compact resource and legal layouts, form pages and a dense product workbench. Buttons have shutter fills and arrow changes; links, menus, cards, tabs and accordions have consistent focus and feedback states.

## Analytics semantics

The only adapter is `cashvariance:analytics`, a local browser CustomEvent. It is off by default. Footer consent enables it for the current document session; reload resets consent. No data is sent to an external analytics service, and no email, company name, free text or raw record is included. Optional UTM source/campaign labels must match a limited alphanumeric format and remain in memory.

| Event | Current trigger / status |
|---|---|
| `landing_view` | Consented route view |
| `offer_16_selected` | Product-tab selection; includes concept 16 and selected offer ID |
| `demo_open` | Consented demo route view |
| `evidence_view` | Opening the demo evidence panel |
| `override_view` | Selecting the reviewer override mode |
| `price_view` | Consented pilot route view, tagged as a hypothesis |
| `consent_submit` | Opting in to browser-only usage events |
| `buyer_qualified` | Reserved for a real, deduplicated qualification decision; never inferred from a click |
| `pilot_request` | Reserved for a genuinely delivered request; the unsent draft does not emit it |

## Operational work before public acquisition

Connect an approved inquiry delivery endpoint and real deletion/contact route; verify delivery and deduplication. Finalize company/profile information, actual pilot terms, privacy and security handling. Connect analytics only with a defined consent policy. Configure any requested custom domain and public hosting audience. Real payment, bank and ERP integrations are outside the concept scope.

The pilot go/no-go decision still depends on treasurer-accepted exception closures against reviewed ground truth, review economics, false positives/omissions and treasury/security permission. Website polish is not evidence of demand or better exception closure.
