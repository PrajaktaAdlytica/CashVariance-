export type SupportPage = {
  eyebrow: string;
  title: string;
  lead: string;
  theme: "ivory" | "sage" | "clay" | "forest" | "limestone";
  hero: string;
  sections: {
    label: string;
    title: string;
    body: string;
    bullets?: string[];
  }[];
  faq: { q: string; a: string }[];
  cta: string;
  ctaHref: string;
};

export const supportPages: Record<string, SupportPage> = {
  "how-it-works": {
    eyebrow: "The proposed workflow",
    title: "From dated sources to a recorded decision.",
    lead: "Compare the records. Inspect the explanation. Let a named reviewer record what is known and what remains open.",
    theme: "ivory",
    hero: "how-it-works",
    sections: [
      {
        label: "01 / Establish the basis",
        title: "Start with records you can place in time.",
        body: "A proposed pilot begins with permissioned historical bank statements, GL exports and daily position files. Confirm the entity, currency, balance basis and source cutoff before comparing amounts.",
        bullets: [
          "One entity across 20 daily closes",
          "Explicit bank and GL source timestamps",
          "Mapping changes remain proposals for review",
        ],
      },
      {
        label: "02 / Compare",
        title: "Keep the difference in view.",
        body: "Separate matched items from unexplained amounts and missing source coverage. An old feed remains old even when the transactions within it have been reviewed. The queue should show both the exception and the freshness of its evidence.",
      },
      {
        label: "03 / Inspect",
        title: "An equal amount is a clue, not a match.",
        body: "Inspect the source row, transaction identity and counterparty evidence behind a candidate. The synthetic example includes an $8,000 suggestion that is rejected because its source is already matched to a different transaction.",
        bullets: [
          "Read the source beside the suggestion",
          "Accept, reject or hold with a reason",
          "Keep rejected suggestions in the review history",
        ],
      },
      {
        label: "04 / Record",
        title: "Close the review without concealing what is open.",
        body: "A dated memo records the reviewer, observed difference, evidence state and next action. Accepting an explanation does not post a journal. A held exception can appear in a reviewed memo without becoming a reconciled cash position.",
      },
    ],
    faq: [
      {
        q: "Does the workflow connect to my banks?",
        a: "The concept preview uses synthetic records. The initial pilot proposal uses permissioned, read-only historical exports. Direct read-only bank or ERP integration would need its own access and security approval.",
      },
      {
        q: "What can a reviewer override?",
        a: "A reviewer can revise a proposed classification or disposition with a reason. An override cannot change source balances, hide stale data or remove an execution boundary.",
      },
      {
        q: "Does scrolling approve an item?",
        a: "No. Motion explains the sequence only. Review choices require an explicit action, and the preview cannot execute payments or write journals.",
      },
    ],
    cta: "Follow the synthetic example",
    ctaHref: "/demo",
  },
  "why-cash-exceptions": {
    eyebrow: "Why the daily position stays open",
    title: "The numbers disagree for a reason.",
    lead: "Cutoff times, mappings and missing confirmations can leave a daily position unresolved. The useful question is what evidence would explain the difference.",
    theme: "limestone",
    hero: "why-cash-exceptions",
    sections: [
      {
        label: "Time",
        title: "Two balances may describe two different moments.",
        body: "A bank snapshot and a GL export can have different cutoffs or arrival times. Before treating a difference as an accounting issue, establish what each record covers and whether an expected update is missing.",
        bullets: [
          "Source cutoff and file receipt time are separate facts",
          "Ledger balance and available balance need a stated basis",
          "A stale warning belongs beside the reported position",
        ],
      },
      {
        label: "Identity",
        title: "The reference matters as much as the amount.",
        body: "Similar amounts do not establish a transaction match. Source identity, value dates, posting dates and account mapping help a reviewer distinguish a valid explanation from a false candidate. Reusing a matched source creates another error rather than closing the first one.",
      },
      {
        label: "Handoffs",
        title: "The answer may sit across several systems.",
        body: "Bank portals, treasury management systems, ERPs, spreadsheets and service providers all participate in the daily close. CashVariance is a proposed exception layer alongside those tools. Its value must be measured against the actual process already in place.",
      },
      {
        label: "The question to test",
        title: "Across 20 closes, what still needed a manual explanation?",
        body: "Establish the current exception volume, reviewer time, missing data and final dispositions. A narrow diagnostic can then test whether a review workspace adds useful evidence or simply duplicates work.",
        bullets: [
          "Who signs the daily position?",
          "Which exception types repeat?",
          "Which missing confirmation prevents a decision?",
          "What would justify paying for another review layer?",
        ],
      },
    ],
    faq: [
      {
        q: "Do current treasury platforms already handle reconciliation?",
        a: "Many established vendors describe cash positioning, reconciliation and review workflows. Their capabilities demonstrate category overlap. CashVariance has not demonstrated superiority or an unmet need in a specific segment.",
      },
      {
        q: "Is every difference an error?",
        a: "No. Timing, cutoff and accounting treatment can explain differences. The reviewer still needs evidence and a clear disposition; an explained but unposted amount should not disappear from the observed bank-to-GL gap.",
      },
    ],
    cta: "Explore the review workflow",
    ctaHref: "/how-it-works",
  },
  "use-cases": {
    eyebrow: "Built around the review handoff",
    title: "A clearer handoff for every reviewer.",
    lead: "Treasury, controllers and implementation partners need different views of the same evidence. A diagnostic starts with one recurring job and a named owner.",
    theme: "sage",
    hero: "use-cases",
    sections: [
      {
        label: "Treasury managers",
        title: "Explain the position you are asked to sign.",
        body: "Cash Desk and Cash Review propose a daily view of source coverage, bank-to-GL differences and unmatched items. Keep the explanation, outstanding evidence and next owner beside the amount.",
        bullets: [
          "Opening-position reconciliation",
          "Transaction classification and candidate review",
          "A dated position memo with unresolved items visible",
        ],
      },
      {
        label: "Controllers",
        title: "Review the treatment before any posting.",
        body: "Inspect draft journal logic against source references and counterparty confirmation. A supported explanation and a posted accounting entry are different states. Proposed changes remain reversible and require the company’s existing accounting review.",
      },
      {
        label: "Payment-control owners",
        title: "Separate file review from release authority.",
        body: "Cash Signal proposes anomaly review of a supplied, already-approved payment file with two distinct reviewers. The control owner defines the external release process. The preview and initial pilot provide no payment initiation, transmission or release capability.",
      },
      {
        label: "Implementation partners",
        title: "Scope access before promising integration.",
        body: "Bank and TMS implementers, multi-entity ERP consultants and treasury partners can help identify a bounded statement exception diagnostic. Confirm file rights, entity mapping and review responsibilities before evaluating technical access.",
        bullets: [
          "Read-only exports first",
          "Bank-feed terms and security review remain open gates",
          "One selected module rather than a broad implementation promise",
        ],
      },
      {
        label: "PE finance operating teams",
        title: "Test repeatability before extending the scope.",
        body: "Compare a one-entity result against its current process before discussing broader deployment. Cash Proof explores assumption-led alerts; Cash Report explores intercompany proposals with counterparty confirmation. Neither is validated by a reconciliation pilot alone.",
      },
    ],
    faq: [
      {
        q: "Who is the initial buyer?",
        a: "The proposed buyer is a treasury manager at a multi-bank, multi-entity midmarket company. The actual budget owner, security reviewer and payment-control owner must be established during discovery.",
      },
      {
        q: "Can the pilot cover all five modules?",
        a: "Choose one recurring job first. The five offers remain separate tests: opening reconciliation, unmatched-item review, assumption-led alerts, payment-file review and intercompany proposals. Expand only when the evidence supports it.",
      },
    ],
    cta: "Find your diagnostic scope",
    ctaHref: "/request-diagnostic",
  },
  controls: {
    eyebrow: "Controls and data boundaries",
    title: "Make the limits as visible as the evidence.",
    lead: "Read-only scope, source timestamps, distinct reviewers and reversible proposals define the proposed pilot. The public preview uses synthetic data only.",
    theme: "forest",
    hero: "controls",
    sections: [
      {
        label: "Access boundary",
        title: "Read records. Propose changes. Keep execution outside.",
        body: "The first proposed pilot reads permissioned bank statement and GL exports for one entity. Payment initiation, bank rails and ERP writes are excluded. A future integration would require a separately agreed scope and access review.",
        bullets: [
          "Read-only historical inputs",
          "Draft classifications and journal proposals",
          "No fund movement, posting or payment-file transmission",
        ],
      },
      {
        label: "Source integrity",
        title: "An old source never earns a fresh label.",
        body: "Show source cutoff, expected update and review time separately. Retain the stale warning in the exception view and exported memo. A reviewer can record what the available evidence supports without certifying a current cash position.",
      },
      {
        label: "Human authority",
        title: "Two identities must mean two reviewers.",
        body: "The proposed payment-file review keeps first and second reviewers distinct. Changes to the reviewed file invalidate dependent approvals. Review acknowledgment does not grant release authority or demonstrate that CashVariance controls an external bank process.",
      },
      {
        label: "Review history",
        title: "Keep the reason beside the revision.",
        body: "A reviewer override records the original suggestion, revised disposition, reason and timestamp. Source values remain unchanged. A draft journal stays unposted; a missing confirmation stays visible until separate evidence supports it.",
      },
      {
        label: "Before real data",
        title: "Agree the handling before receiving a file.",
        body: "Security architecture, operator details, retention and transfer arrangements must be finalized for any real pilot. No certification, production integration or completed security review is claimed by this concept.",
        bullets: [
          "Confirm bank and ERP file-sharing rights",
          "Name the treasurer and payment-control owner",
          "Agree least-privilege access, deletion and retention",
          "Obtain treasury and security approval",
        ],
      },
    ],
    faq: [
      {
        q: "Is CashVariance certified or production-ready?",
        a: "This is a research-stage concept and an isolated synthetic preview. No security certification, production integration or operating treasury service is claimed.",
      },
      {
        q: "Can the demo send money or post to an ERP?",
        a: "No. It has no bank rails, payment initiation or ERP write connection. Even a completed two-person review is only a simulated review acknowledgment.",
      },
      {
        q: "Can I upload bank statements here?",
        a: "No. The public preview has no financial-record upload. Permissioned data transfer would be agreed separately after the scope and security review.",
      },
    ],
    cta: "Discuss data readiness",
    ctaHref: "/request-diagnostic",
  },
  pilot: {
    eyebrow: "A bounded evaluation",
    title: "One entity. Twenty daily closes.",
    lead: "Compare reviewed outcomes with the same historical files and an agreed baseline. Decide whether the workflow earns a place in your daily close.",
    theme: "limestone",
    hero: "pilot",
    sections: [
      {
        label: "01 / Scope",
        title: "Choose the job before choosing the package.",
        body: "Select one of the five proposed offers and define a recurring task. Begin with one entity across 20 historical daily closes, permissioned read-only inputs and a named treasurer sponsor.",
        bullets: [
          "Cash Desk — opening-position reconciliation",
          "Cash Review — classification and unmatched items",
          "Cash Proof — near-term alerts with assumptions",
          "Cash Signal — approved-file review and dual control",
          "Cash Report — intercompany proposals and confirmation",
        ],
      },
      {
        label: "02 / Entry gates",
        title: "Access and ownership come first.",
        body: "Confirm a payment-control owner even when the first scope is read-only. Agree file coverage, mapping, security handling and a comparison baseline before any evaluation begins. Direct integration is a separate access commitment to seek, not a current capability.",
        bullets: [
          "Historical statements, GL exports and daily position files",
          "Permissioned handling and treasury/security approval",
          "Defined acceptance criteria and error limits",
          "A bounded commercial proposal",
        ],
      },
      {
        label: "03 / Deliverables",
        title: "A review queue, a memo and an honest comparison.",
        body: "The proposed output is an unmatched-item queue and reviewer-signed position memo for each close, plus a scorecard against the agreed current-tool baseline. Preserve missing data, stale inputs, rejected suggestions and unresolved items rather than removing difficult cases.",
      },
      {
        label: "04 / Pricing hypotheses",
        title: "Test the buying decision as carefully as the workflow.",
        body: "$3,000 fixed diagnostic is a hypothetical test price. A separate recurring hypothesis is $1,500–$5,000 per month per entity group. These are not accepted market prices, active plans or checkout offers. A bounded pilot would be scoped and quoted separately.",
      },
      {
        label: "05 / Decision",
        title: "Advance on reviewed evidence.",
        body: "Advance only if reproducible closes outperform the agreed baseline without hiding stale data, and treasury and security approve a read-only paid pilot or continuation. Stop when incremental value or access approval is absent. Too few exceptions means inconclusive evidence, not success.",
      },
    ],
    faq: [
      {
        q: "What counts as a reconciled exception?",
        a: "An accepted closure needs supporting evidence, an agreed disposition and treasurer acceptance. A reviewed hold, rejected candidate or explained-but-unposted amount does not automatically count as a reconciled exception.",
      },
      {
        q: "Is forecasting included in the 20-close evaluation?",
        a: "Historical reconciliation alone does not validate forecast quality. Cash Proof requires separately defined assumptions and forecast evaluation. Cash Report also needs permissioned counterparty evidence for bilateral validation.",
      },
      {
        q: "Can I purchase a pilot on this site?",
        a: "No. Pricing is hypothetical and this website preview does not accept payment or deliver inquiries to a sales backend. The request flow shows the proposed discovery questions.",
      },
    ],
    cta: "Request a pilot discussion",
    ctaHref: "/request-diagnostic",
  },
  resources: {
    eyebrow: "Working library",
    title: "A careful pilot starts with better questions.",
    lead: "Evaluation criteria, data preparation and public research support a specific buying decision. These are planning resources for the proposed workflow.",
    theme: "limestone",
    hero: "resources",
    sections: [
      {
        label: "Evaluation method",
        title: "Define improvement before measuring it.",
        body: "The pilot scorecard sets out closure definitions, raw counts, reviewer time, false positives and omissions. It keeps explained-but-unposted amounts separate from actual resolution. Agree thresholds before the first close.",
        bullets: [
          "Same historical inputs as the current process",
          "Treasurer-adjudicated outcomes",
          "Visible exclusions and inconclusive results",
        ],
      },
      {
        label: "Data preparation",
        title: "Check the basis of every comparison.",
        body: "The data checklist covers statement and GL exports, source dates, currency, account mapping and permissioned handling. It is a readiness guide, not a public upload form.",
        bullets: [
          "20 daily closes for one entity",
          "Source cutoff and expected arrival",
          "Sharing rights, transfer and retention to agree",
        ],
      },
      {
        label: "Research and sources",
        title: "Distinguish category evidence from product evidence.",
        body: "Official vendor pages establish existing cash and reconciliation workflows. They do not demonstrate demand for CashVariance or better exception closure. The research page records that distinction and the questions still open.",
      },
      {
        label: "Synthetic example",
        title: "Inspect a difference that remains visible.",
        body: "The fictional North Quay Group example puts a $240,000 bank balance beside a $232,000 GL balance. Inspect the stale source, the $8,000 candidate explanation and the review decision without sharing any company data.",
      },
    ],
    faq: [
      {
        q: "Are these customer case studies?",
        a: "No. They are evaluation resources and a synthetic product example. CashVariance has no demonstrated customer outcomes or live integrations represented in this preview.",
      },
      {
        q: "Can I adapt the scorecard to our close?",
        a: "Yes. The proposed evaluation requires agreement on your baseline, denominator, time measurement and acceptable error limits. No universal numerical performance threshold has been established.",
      },
    ],
    cta: "Explore the evaluation method",
    ctaHref: "/resources/pilot-scorecard",
  },
  "resources/pilot-scorecard": {
    eyebrow: "Evaluation method",
    title: "Measure reviewed outcomes, not demo polish.",
    lead: "Agree closure definitions, baseline files and error limits before a pilot starts. Keep the scorecard empty until the records have been reviewed.",
    theme: "sage",
    hero: "pilot-scorecard",
    sections: [
      {
        label: "Comparable inputs",
        title: "Reproduce the same 20 closes.",
        body: "Use the same historical bank, GL and daily-position files as the current-tool baseline. Preserve cutoffs, missing sources and unavailable confirmations. Log exclusions with reasons and retain the original denominator.",
        bullets: [
          "One entity and explicitly stated currency",
          "Exception counts and values per close",
          "Baseline process and file versions recorded",
        ],
      },
      {
        label: "Accepted closure",
        title: "Require evidence and the treasurer’s decision.",
        body: "Count a closure only when the evidence supports the disposition and the treasurer accepts it. Record a rejected candidate or reviewed hold separately. A candidate journal that remains unposted does not eliminate the observed bank-to-GL difference.",
      },
      {
        label: "What to measure",
        title: "Count the friction and the errors.",
        body: "Track reviewer handling time and elapsed time to close as separate measures. Record feed-staleness incidents, false alarms, false closures, omissions and overrides alongside accepted outcomes. Use raw counts and denominators before percentages.",
        bullets: [
          "Treasurer-accepted exception closures",
          "Resolved variance versus explained-but-unposted variance",
          "Reviewer minutes and elapsed close time",
          "False positives, omissions and unresolved items",
        ],
      },
      {
        label: "Decision gate",
        title: "Set the standard before seeing the result.",
        body: "Agree what “outperform” means and the acceptable error limits before testing. Advance only with reproducible incremental value and treasury/security approval. A material false closure, concealed stale source, control bypass or write-capable pilot behavior requires pause and review.",
      },
      {
        label: "Demand evidence",
        title: "A click is not a purchase decision.",
        body: "Separate a demo visit, qualified conversation, data-access permission, scoped proposal and signed or funded pilot. If the sample contains too few relevant exceptions, report the result as inconclusive. Visual polish does not change that decision.",
      },
    ],
    faq: [
      {
        q: "What percentage improvement is promised?",
        a: "None. The brief supplies no validated improvement or universal acceptance threshold. The buyer and evaluation team must agree the standard before the test.",
      },
      {
        q: "Does reducing the unexplained amount prove reconciliation?",
        a: "Not by itself. Separate accepted explanations, posted changes and genuinely resolved differences. Never force balance equality or remove unresolved items to improve the score.",
      },
    ],
    cta: "Review the proposed pilot scope",
    ctaHref: "/pilot",
  },
  "resources/data-checklist": {
    eyebrow: "Data preparation",
    title: "Prepare the evidence before the connection.",
    lead: "Confirm file coverage, timestamps, mapping and permissioned handling. Real financial records do not belong in this public preview.",
    theme: "ivory",
    hero: "data-checklist",
    sections: [
      {
        label: "File coverage",
        title: "Bring the records that formed the daily position.",
        body: "A proposed initial evaluation needs historical statements, GL cash exports and daily position files for one entity across 20 closes. Confirm whether exports contain transaction-level references as well as opening and closing balances.",
        bullets: [
          "Statement date, masked account and balance basis",
          "GL account, posting date and source reference",
          "Historical daily position and sign-off record",
        ],
      },
      {
        label: "Time and mapping",
        title: "Make comparisons on a stated basis.",
        body: "Document entity, account and currency mappings. Record source cutoff, file receipt and expected update independently. Currency conversion, when relevant, needs an explicit rate source and date; do not silently combine unlike balances.",
        bullets: [
          "Entity and account identifiers",
          "Currency and ledger-versus-available basis",
          "Bank and GL timestamps with time zones",
          "Known gaps, duplicates and revised files",
        ],
      },
      {
        label: "Evidence by module",
        title: "Request only what the selected job needs.",
        body: "Cash Review needs transaction and classification evidence. Cash Proof needs explicit inflow timing, outflows and buffer assumptions. Cash Signal needs an approved-file version and a payment-control owner. Cash Report needs authorized evidence from the counterparty as well as the first entity.",
      },
      {
        label: "Authorization",
        title: "Agree the route before sharing the records.",
        body: "Confirm bank and ERP sharing terms, data ownership and the people permitted to review the files. Transfer method, access controls, storage, retention and deletion must be agreed through the pilot’s security review. Do not attach financial records to a public inquiry.",
        bullets: [
          "Treasurer sponsor and payment-control owner",
          "Documented permission for the sample",
          "Read-only scope and security approval",
          "Retention and deletion responsibilities",
        ],
      },
    ],
    faq: [
      {
        q: "Which file formats are supported?",
        a: "No production import compatibility is claimed. Formats and required fields would be inspected and agreed during the diagnostic. The public demo uses fixed synthetic fixtures.",
      },
      {
        q: "Can we begin without a live bank connection?",
        a: "The proposed first evaluation uses read-only historical exports. That can test part of the review job without proving direct connectivity, which requires separate technical, contractual and security approval.",
      },
      {
        q: "Where should we upload files?",
        a: "There is no public upload or approved data-transfer endpoint in this preview. Establish an authorized transfer process only after scope, access and security handling have been agreed.",
      },
    ],
    cta: "Discuss data readiness",
    ctaHref: "/request-diagnostic",
  },
  "resources/research": {
    eyebrow: "Research notes / 14 October 2026",
    title: "Separate what is known from what needs testing.",
    lead: "Established workflows are evidence of overlap. Better exception closure, buyer demand and review economics remain hypotheses to evaluate.",
    theme: "clay",
    hero: "research",
    sections: [
      {
        label: "Category evidence",
        title: "Cash visibility and reconciliation are established jobs.",
        body: "Trovata describes direct bank connectivity and normalized cash data. Kyriba describes cash positioning, matching and liquidity workflows. These public capabilities establish an adjacent category, not an unserved market or a CashVariance advantage.",
        bullets: [
          "Trovata Cash — https://trovata.io/trovata-cash",
          "Kyriba cash management — https://www.kyriba.com/use-cases/cash-management/",
          "Kyriba cash and liquidity — https://www.kyriba.com/resources/faqs/what-is-cash-and-liquidity-management/",
        ],
      },
      {
        label: "Review patterns",
        title: "Evidence, confirmation and history already matter.",
        body: "Numeric describes cash matching and journal review. Modern Treasury documents candidate selection and confirmation for manual reconciliation in its payment context. These sources inform workflow questions; they do not prove a bank-to-GL product gap.",
        bullets: [
          "Numeric Cash Management — https://www.numeric.io/product/cash-management",
          "Modern Treasury manual reconciliation — https://docs.moderntreasury.com/payments/docs/manual-reconciliation",
        ],
      },
      {
        label: "CashVariance hypothesis",
        title: "A focused exception layer may earn its place.",
        body: "The proposed wedge is a narrow evidence-and-review loop around the daily difference. It must reproduce closes and improve the agreed current process without concealing stale data. Human oversight or an AI label alone is not evidence of differentiation.",
      },
      {
        label: "Open questions",
        title: "Access and review economics are still unknown.",
        body: "Segment-specific manual hours, buyer budget, file access terms and tolerance for false suggestions remain unverified. Security reviews, segregation of duties, liability for incorrect positions and large incumbent coverage are material evaluation questions.",
        bullets: [
          "How many recurring exceptions need manual review?",
          "Which source files can legally and practically be shared?",
          "What review effort does each suggestion create?",
          "What evidence leads to a paid-pilot commitment?",
        ],
      },
      {
        label: "Expansion boundary",
        title: "Earn each next workflow separately.",
        body: "Forecasting and multi-entity liquidity are conditional directions. A 20-close reconciliation result does not validate alert quality, bilateral confirmation or payment execution. Bank rails are not assumed. The research must lead to a clear stop decision when value or access is absent.",
      },
    ],
    faq: [
      {
        q: "Do the sources prove demand for CashVariance?",
        a: "No. Vendor descriptions show existing workflows and competitors. They do not establish customer demand, pricing acceptance, incremental value or superior outcomes for this concept.",
      },
      {
        q: "How current are these notes?",
        a: "The reference review is dated 14 October 2026. Vendor websites can change. Treat these links as sources for the stated category observations, not permanent feature-by-feature comparisons.",
      },
    ],
    cta: "Read the evaluation method",
    ctaHref: "/resources/pilot-scorecard",
  },
  about: {
    eyebrow: "About CashVariance",
    title: "A considered approach to the daily close.",
    lead: "CashVariance is a research-stage concept for reviewable treasury exception decisions. Start narrow. Establish evidence. Earn further scope.",
    theme: "sage",
    hero: "about",
    sections: [
      {
        label: "Our focus",
        title: "Explain the difference before the next decision.",
        body: "Treasury managers compare bank records, GL entries and intercompany evidence to understand a daily position. CashVariance explores a workspace that keeps those sources, explanations and review decisions together.",
      },
      {
        label: "The principle",
        title: "Human owners retain authority.",
        body: "The vision is a reviewable, evidence-linked process rather than an opaque action. Proposed classifications, journal treatments and next steps remain visible and reversible. Reviewers retain responsibility for what they accept, reject or hold.",
      },
      {
        label: "The starting point",
        title: "One entity is enough to ask a serious question.",
        body: "The proposed initial scope is 20 daily closes, read-only statement and GL exports, an unmatched queue and a reviewer-signed position memo. It excludes bank rails and payment initiation. Its value must be demonstrated against the actual current workflow.",
      },
      {
        label: "Where we are",
        title: "An honest concept preview.",
        body: "The product shown here is synthetic and isolated. Customer demand, production integrations, pricing acceptance and improved exception closure have not been demonstrated. The next useful step is a qualified conversation and a carefully bounded evaluation.",
      },
    ],
    faq: [
      {
        q: "Is CashVariance an operating treasury platform?",
        a: "No. This website presents a research-stage product concept and a synthetic interactive preview. It does not provide bank connectivity, payment services or a production customer account.",
      },
      {
        q: "Why focus on exceptions first?",
        a: "A narrow daily job provides a more specific evaluation than a broad dashboard promise. If exception review does not produce incremental value with approved access and controls, wider scope is not justified.",
      },
    ],
    cta: "Discuss the concept",
    ctaHref: "/contact",
  },
  privacy: {
    eyebrow: "Website preview notice",
    title: "Know what this preview asks you to share.",
    lead: "This website preview has no connected inquiry backend. Forms prepare a draft in your browser. Use sample contact details and keep bank records, credentials and personal financial information out of the forms.",
    theme: "ivory",
    hero: "privacy",
    sections: [
      {
        label: "Current scope",
        title: "A prepared draft is not a delivered inquiry.",
        body: "The inquiry pages prepare a text draft that you may download. They do not send submissions to a sales, support or CRM service. The confirmation means that the draft is ready; it does not mean an operator has received a message.",
      },
      {
        label: "Browser handling",
        title: "Your entries stay in the current page.",
        body: "Form values and the prepared draft stay in browser memory and clear on reload. Optional browser-only usage events are off by default; enable them through Usage preferences in the footer. They describe page visits, module selections and preview interactions, with no email addresses, inquiry text or raw financial records. There is no network analytics collector, cookie or local-storage persistence. The usage preference resets on reload. A draft you choose to download remains on your device until you delete it.",
      },
      {
        label: "Synthetic product data",
        title: "The demo begins with invented records.",
        body: "North Quay Group, its people, accounts, transactions and review outcomes are fictional. No real bank or ERP connection is present. The demo does not require credentials or financial uploads, and any local memo export must retain its synthetic-data label.",
      },
      {
        label: "Planned collection",
        title: "A future inquiry should ask for only what it needs.",
        body: "The intended intake is limited to business contact details, role, company, selected module and a non-sensitive question. Request-specific consent and an optional updates opt-in should be separate. Raw statements, account data and financial records do not belong in public forms.",
      },
      {
        label: "Before collection",
        title: "Operational details must be established first.",
        body: "The legal operator, contact destination, retention schedule, processors, rights request route and any analytics choices must be finalized and disclosed before real lead collection is enabled. This preview is not a finalized privacy policy for a live service.",
        bullets: [
          "Identify the actual data controller and contact route",
          "Specify storage, processors and retention",
          "Provide a working correction and deletion route",
          "Explain any analytics and consent choices",
        ],
      },
    ],
    faq: [
      {
        q: "Has my preview form been sent to CashVariance?",
        a: "No. There is no connected inquiry backend in this website preview. Do not rely on the demonstration as a sent message, support request or deletion request.",
      },
      {
        q: "How do I clear my draft?",
        a: "Reload the page to clear the application’s in-memory draft. If you downloaded the text file, delete that file separately from your device. The contact form cannot deliver a deletion request because it has no submission backend.",
      },
      {
        q: "Can I include account numbers or statements?",
        a: "No. Use sample details only. Real records would require an agreed purpose, authorized transfer process and security handling outside the public preview.",
      },
    ],
    cta: "View the preview contact route",
    ctaHref: "/contact",
  },
  terms: {
    eyebrow: "Concept preview boundaries",
    title: "Clear boundaries for a concept preview.",
    lead: "Synthetic records illustrate a proposed review workflow. They are not live financial records, executable instructions or an operating treasury service.",
    theme: "limestone",
    hero: "terms",
    sections: [
      {
        label: "01 / Status",
        title: "Research, proposed modules and a browser demonstration.",
        body: "CashVariance is presented as a research-stage concept. Product descriptions explain intended workflows, not a promise of current availability. This notice describes the website preview’s boundaries; it is not a finalized commercial agreement.",
      },
      {
        label: "02 / Demonstration",
        title: "Every record and outcome is illustrative.",
        body: "People, organizations, account identifiers, transactions, source documents and review decisions in the demo are fictional. A completed review or downloaded memo is a synthetic illustration and cannot be treated as a certified cash position or real approval.",
      },
      {
        label: "03 / Execution",
        title: "No funds move and no journals post.",
        body: "The preview has no bank rails, payment initiation, payment-file transmission or ERP write capability. Draft journals and intercompany proposals remain illustrative. Nothing shown here substitutes for the company’s existing treasury, accounting or payment controls.",
      },
      {
        label: "04 / Commercial scope",
        title: "Test prices are hypotheses.",
        body: "The $3,000 diagnostic and $1,500–$5,000 monthly entity-group range are hypothetical prices. There is no checkout, accepted quote or purchase commitment. Any real pilot would require a separately agreed scope, parties, data handling and commercial terms.",
      },
      {
        label: "05 / Before a live service",
        title: "Finalize the actual agreement before onboarding.",
        body: "Operator identity, governing terms, service responsibilities, support, data handling and liability provisions need to be established for any real pilot. This preview does not fabricate those details or imply that a live agreement already exists.",
      },
    ],
    faq: [
      {
        q: "Can I rely on the illustrative journal or forecast?",
        a: "No. They explain synthetic scenarios and assumptions. Real accounting treatment, forecasts and payment decisions require review of the actual records through the organization’s authorized processes.",
      },
      {
        q: "Does completing the request form start a pilot?",
        a: "No. The form prepares a browser-only draft, has no submission backend and cannot create an agreement. A real pilot would require an explicit scope, approved data access and agreed commercial terms.",
      },
    ],
    cta: "Explore the concept boundaries",
    ctaHref: "/controls",
  },
};
