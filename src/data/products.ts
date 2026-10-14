export type Product = {
  id: number;
  slug: string;
  name: string;
  icon: string;
  job: string;
  headline: string;
  description: string;
  theme: string;
  input: string[];
  output: string;
  steps: { title: string; body: string }[];
  boundary: string;
  question: string;
  faq: { q: string; a: string }[];
};
export const products: Product[] = [
  {
    id: 1,
    slug: "cash-desk",
    name: "Cash Desk",
    icon: "compare",
    job: "Opening-position reconciliation",
    headline: "Start the day with the difference in view.",
    description:
      "Bring multi-bank balances and GL cash records into one dated comparison. See what agrees, what differs and which source needs attention before the daily review.",
    theme: "limestone",
    input: [
      "Permissioned bank statements",
      "GL cash exports",
      "Historical daily positions",
    ],
    output:
      "A reviewed position memo with matched items, unresolved differences and source references.",
    steps: [
      {
        title: "Establish the same cutoff",
        body: "Compare the entity, currency, balance basis and source timestamps before comparing the numbers.",
      },
      {
        title: "Expose the unexplained amount",
        body: "Keep the observed bank-to-GL difference separate from proposed adjustments and possible explanations.",
      },
      {
        title: "Record a qualified close",
        body: "A named reviewer records evidence, open items and the next action. Stale sources remain visible.",
      },
    ],
    boundary:
      "Read-only exports. No journal posting, bank write or payment initiation.",
    question:
      "Can the treasurer reproduce a more useful daily close from the same historical records?",
    faq: [
      {
        q: "Does this replace our TMS?",
        a: "The proposed exception layer is intended to be evaluated alongside current tools. Replacement or production integration has not been demonstrated.",
      },
      {
        q: "What if a bank file is late?",
        a: "The last known cutoff and missed expected update remain visible. A stale snapshot is never presented as a current confirmed position.",
      },
    ],
  },
  {
    id: 2,
    slug: "cash-review",
    name: "Cash Review",
    icon: "classification",
    job: "Classification & unmatched-item review",
    headline: "Give every unmatched item a reason.",
    description:
      "Review proposed classifications and match candidates beside their underlying records. Accept supported evidence, reject a weak match or hold an item with a named owner.",
    theme: "sage",
    input: [
      "Bank transaction lines",
      "GL entries and mappings",
      "Supporting source documents",
    ],
    output:
      "A reviewed disposition and decision history, with the explanation linked to evidence.",
    steps: [
      {
        title: "Inspect the candidate",
        body: "Compare source identities, dates, amounts and existing matches. Equal amounts alone do not establish a match.",
      },
      {
        title: "Challenge the explanation",
        body: "See the rationale and missing evidence. Reject the suggestion when the records do not support it.",
      },
      {
        title: "Keep the owner visible",
        body: "Record an acceptance, rejection or hold with the reviewer, reason and dated next action.",
      },
    ],
    boundary:
      "A reviewed explanation is not a posted journal. Overrides cannot rewrite source values.",
    question:
      "How many proposed exception closures are accepted by the treasurer against the underlying records?",
    faq: [
      {
        q: "Can a reviewer reject a suggestion?",
        a: "Yes. The synthetic demo includes an equal-amount false candidate that is already matched elsewhere. Rejection is part of the review history.",
      },
      {
        q: "Does an accepted explanation change the GL?",
        a: "No. The proposed journal remains a draft. The observed bank-to-GL gap is unchanged until a separate authorized accounting process posts an adjustment.",
      },
    ],
  },
  {
    id: 3,
    slug: "cash-proof",
    name: "Cash Proof",
    icon: "forecast",
    job: "Shortfall & excess scenarios",
    headline: "See the assumption behind the alert.",
    description:
      "Explore near-term cash scenarios with explicit inflow timing, planned outflows, minimum buffers and source freshness. Every projection should have an inspectable basis.",
    theme: "clay",
    input: [
      "Dated starting cash position",
      "Planned receipts and payments",
      "Timing assumptions and buffer",
    ],
    output:
      "A qualified scenario and threshold alert with assumptions clearly separated from observed cash.",
    steps: [
      {
        title: "Start from a dated position",
        body: "Use a stated entity, currency and cutoff. Missing or stale inputs qualify the entire scenario.",
      },
      {
        title: "Make the assumptions editable",
        body: "Change a receipt amount or timing explicitly and see how the projected closing position responds.",
      },
      {
        title: "Review the exposure",
        body: "Compare the scenario with the agreed buffer. The reviewer sees the assumptions alongside the alert.",
      },
    ],
    boundary:
      "Illustrative scenarios are not guaranteed forecasts. A reconciliation pilot does not establish forecast performance.",
    question:
      "Are the assumptions and false alerts useful enough for a treasury owner to act on through their existing process?",
    faq: [
      {
        q: "Is the incoming receipt confirmed?",
        a: "Not unless its source evidence says so. Assumed, confirmed and observed amounts are displayed separately.",
      },
      {
        q: "Can the demo double-count TR-808?",
        a: "No. TR-808 already appears in the bank snapshot and is not treated as a future receipt. The scenario uses a separately identified hypothetical customer receipt.",
      },
    ],
  },
  {
    id: 4,
    slug: "cash-signal",
    name: "Cash Signal",
    icon: "dual-review",
    job: "Payment-file anomaly review",
    headline: "Two reviewers. A visible release boundary.",
    description:
      "Review a supplied, already-approved payment file for potential anomalies. Route findings through two distinct reviewers while release stays in the company’s existing process.",
    theme: "forest",
    input: [
      "Approved payment-file copy",
      "File provenance and support",
      "Named payment-control owner",
    ],
    output:
      "An anomaly review record and two-person review acknowledgments, with unresolved items held.",
    steps: [
      {
        title: "Verify the supplied file",
        body: "Identify the file version and supporting records. A changed file invalidates previous review acknowledgments.",
      },
      {
        title: "Route the anomaly",
        body: "Show the missing reference or unusual item and assign review to distinct authorized people.",
      },
      {
        title: "Keep execution separate",
        body: "Even two completed review acknowledgments do not transmit a file, release a payment or move funds.",
      },
    ],
    boundary:
      "No bank rails, transmission or release. Review approval never grants execution authority.",
    question:
      "Does the review expose useful anomalies without excessive false alarms or bypassing segregation of duties?",
    faq: [
      {
        q: "Can CashVariance send a payment?",
        a: "No. Fund movement and file transmission are unavailable in the concept and outside the proposed read-only pilot.",
      },
      {
        q: "Who owns payment controls?",
        a: "The company must name an explicit payment-control owner. Reviewer roles and the existing release process must be agreed before a pilot.",
      },
    ],
  },
  {
    id: 5,
    slug: "cash-report",
    name: "Cash Report",
    icon: "counterparty",
    job: "Intercompany proposals & confirmation",
    headline: "A proposal needs both sides of the story.",
    description:
      "Assemble an intercompany cash movement proposal with the entities, source references and confirmation status in view. Missing counterparty evidence keeps the proposal held.",
    theme: "sage",
    input: [
      "Entity and counterparty records",
      "Movement or receipt evidence",
      "Permissioned confirmation",
    ],
    output:
      "An evidence-linked proposal with a bilateral confirmation state and reviewer-owned next action.",
    steps: [
      {
        title: "Identify both sides",
        body: "Keep entity, currency, counterparty and source references explicit. A plausible relationship is not a confirmation.",
      },
      {
        title: "Request the missing evidence",
        body: "The concept shows a pending confirmation state. No actual external message is sent from the demo.",
      },
      {
        title: "Document the proposal",
        body: "Record the rationale, evidence and hold or review decision. Fund movement remains outside the workflow.",
      },
    ],
    boundary:
      "No autonomous cash movement. Bilateral validation needs permissioned counterparty evidence.",
    question:
      "Does the proposal help a treasury reviewer distinguish a supported intercompany explanation from a plausible guess?",
    faq: [
      {
        q: "Can this be tested with one entity?",
        a: "A one-entity pilot can assess proposal quality, but bilateral confirmation requires separately permissioned counterparty evidence.",
      },
      {
        q: "Does confirmation move money?",
        a: "No. Confirmation updates the explanation state only. The concept never executes transfers or posts accounting entries.",
      },
    ],
  },
];
