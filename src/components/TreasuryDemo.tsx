"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { track } from "./Analytics";
import "./demo.css";

type Transaction = {
  id: string;
  description: string;
  amount: number;
  time: string;
  category: string;
};
const transactions: Transaction[] = [
  {
    id: "TR-801",
    description: "Customer receipt A",
    amount: 50000,
    time: "06:12",
    category: "Customer receipt",
  },
  {
    id: "TR-802",
    description: "Supplier settlement",
    amount: -20000,
    time: "06:26",
    category: "Supplier payment",
  },
  {
    id: "TR-803",
    description: "Customer receipt B",
    amount: 12000,
    time: "06:41",
    category: "Customer receipt",
  },
  {
    id: "TR-804",
    description: "Rent",
    amount: -5000,
    time: "06:55",
    category: "Operating expense",
  },
  {
    id: "TR-805",
    description: "Payroll adjustment",
    amount: -3000,
    time: "07:04",
    category: "Payroll",
  },
  {
    id: "TR-806",
    description: "Customer receipt C",
    amount: 8000,
    time: "07:18",
    category: "Customer receipt",
  },
  {
    id: "TR-807",
    description: "Vendor settlement",
    amount: -10000,
    time: "07:26",
    category: "Supplier payment",
  },
  {
    id: "TR-808",
    description: "Intercompany attribution",
    amount: 8000,
    time: "07:36",
    category: "Attribution unconfirmed",
  },
  {
    id: "TR-809",
    description: "Refund received",
    amount: 2000,
    time: "07:43",
    category: "Refund",
  },
  {
    id: "TR-810",
    description: "Service settlement",
    amount: -2000,
    time: "07:51",
    category: "Operating expense",
  },
];
const tabs = [
  "Evidence",
  "Cash outlook",
  "Payment review",
  "Close memo",
] as const;
type Tab = (typeof tabs)[number];
const money = (n: number) =>
  `${n < 0 ? "−" : ""}$${Math.abs(n).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
const reviewers = ["Evan Cole", "Lena Ortiz"];

function Icon({ name, size = 18 }: { name: string; size?: number }) {
  const paths: Record<string, ReactNode> = {
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 4 4" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14m-5-5 5 5-5 5" />
      </>
    ),
    down: <path d="m7 10 5 5 5-5" />,
    check: <path d="m5 12 4 4L19 6" />,
    lock: (
      <>
        <rect x="5" y="10" width="14" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3" />
      </>
    ),
    file: (
      <>
        <path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8zM14 3v5h5M9 12h6m-6 4h6" />
      </>
    ),
    reset: (
      <>
        <path d="M4 9a8 8 0 1 1 0 6M4 4v5h5" />
      </>
    ),
    download: (
      <>
        <path d="M12 3v12m-4-4 4 4 4-4M4 17v4h16v-4" />
      </>
    ),
    alert: (
      <>
        <path d="m12 3 10 18H2zM12 9v5m0 3v.1" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.file}
    </svg>
  );
}

function Tag({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "amber" | "green";
}) {
  return <span className={`td-tag td-tag-${tone}`}>{children}</span>;
}

function CardTitle({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="td-card-heading">
      <div>
        <span className="td-eyebrow">{eyebrow} · SYNTHETIC</span>
        <h3>{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function TreasuryDemo() {
  const reduce = useReducedMotion();
  const [tab, setTab] = useState<Tab>("Evidence");
  useEffect(() => {
    const module = new URLSearchParams(window.location.search).get("module");
    if (module === "cash-proof") setTab("Cash outlook");
    if (module === "cash-signal") setTab("Payment review");
  }, []);
  useEffect(() => {
    if (tab === "Evidence") track("evidence_view", { concept_id: 16, step: "bank-gl-evidence" });
  }, [tab]);
  const [selected, setSelected] = useState("TR-808");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [freshnessOpen, setFreshnessOpen] = useState(false);
  const [journalOpen, setJournalOpen] = useState(false);
  const [candidateOpen, setCandidateOpen] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [reason, setReason] = useState("");
  const [nextAction, setNextAction] = useState("2026-10-12T11:00");
  const [decision, setDecision] = useState(
    "Held — awaiting counterparty evidence",
  );
  const [reviewMode, setReviewMode] = useState("hold");
  useEffect(() => {
    if (reviewMode === "override") track("override_view", { concept_id: 16, step: "reviewer-override" });
  }, [reviewMode]);
  const [reviewError, setReviewError] = useState("");
  const [history, setHistory] = useState<string[]>([
    "10:00 UTC · Mira Shah (fictional) opened the review. Source remains stale.",
  ]);
  const [notice, setNotice] = useState("");
  const [starting, setStarting] = useState(232000);
  const [outflows, setOutflows] = useState(250000);
  const [buffer, setBuffer] = useState(20000);
  const [includeReceipt, setIncludeReceipt] = useState(false);
  const [receipt, setReceipt] = useState(30000);
  const [receiptDate, setReceiptDate] = useState("2026-10-13");
  const [paymentVersion, setPaymentVersion] = useState(1);
  const [paymentEvidence, setPaymentEvidence] = useState(false);
  const [firstReviewer, setFirstReviewer] = useState("Evan Cole");
  const [secondReviewer, setSecondReviewer] = useState("Lena Ortiz");
  const [approvals, setApprovals] = useState<string[]>([]);
  const [memoReviewed, setMemoReviewed] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const record = transactions.find((item) => item.id === selected)!;
  const isException = selected === "TR-808";
  const filtered = transactions.filter(
    (item) =>
      (filter === "all" ||
        (filter === "exception"
          ? item.id === "TR-808"
          : item.id !== "TR-808")) &&
      `${item.id} ${item.description}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const projected = starting - outflows + (includeReceipt ? receipt : 0);
  const gap = Math.max(0, buffer - projected);
  const receiptDateValid =
    /^\d{4}-\d{2}-\d{2}$/.test(receiptDate) && receiptDate >= "2026-10-12";
  const receiptFallsWithinHorizon =
    receiptDateValid && receiptDate <= "2026-10-14";
  const effectiveProjected =
    starting -
    outflows +
    (includeReceipt && receiptFallsWithinHorizon ? receipt : 0);
  const effectiveGap = Math.max(0, buffer - effectiveProjected);

  function tell(message: string) {
    setNotice(message);
  }
  function addHistory(message: string) {
    setHistory((old) => [...old, `10:00 UTC · ${message}`]);
    setMemoReviewed(false);
  }
  function activateTab(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft")
      next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    setTab(tabs[next]);
    tabRefs.current[next]?.focus();
  }
  function acceptExplanation() {
    setConfirmed(true);
    setDecision("Explanation accepted — journal remains held and unposted");
    addHistory(
      "Owen Reed (fictional) supplied IC-NQ-808 confirmation. Explanation accepted; treatment held for accounting review.",
    );
    tell(
      "Additional synthetic evidence loaded. The observed $8,000 difference is unchanged; no journal was posted.",
    );
  }
  function saveReview() {
    if (reason.trim().length < 8) {
      setReviewError(
        "Add a reason of at least 8 characters so the decision is reviewable.",
      );
      return;
    }
    if (!nextAction || nextAction < "2026-10-12T10:00") {
      setReviewError(
        "Choose a next action at or after the simulated review time, 12 October 2026 at 10:00 UTC.",
      );
      return;
    }
    setReviewError("");
    const label =
      reviewMode === "hold"
        ? "Held for follow-up"
        : "Reviewer override — proposed classification under review";
    setDecision(label);
    addHistory(
      `Evan Cole (fictional): ${label}. Reason: ${reason.trim()} Next action: ${nextAction.replace("T", " ")} UTC.`,
    );
    tell(
      "Review saved locally. Source values, missing evidence and execution restrictions are unchanged.",
    );
  }
  function changePayment() {
    setPaymentVersion((value) => value + 1);
    setPaymentEvidence(false);
    setApprovals([]);
    addHistory(
      "Synthetic payment file changed. Supporting evidence and both previous review acknowledgments were invalidated.",
    );
    tell(
      "File version changed. Previous approvals are invalid; review the new version from the beginning.",
    );
  }
  function approvePayment(slot: number) {
    const who = slot === 0 ? firstReviewer : secondReviewer;
    if (
      !paymentEvidence ||
      approvals.includes(who) ||
      (slot === 1 && approvals.length !== 1)
    )
      return;
    setApprovals((old) => [...old, who]);
    addHistory(
      `${who} (fictional) acknowledged PAY-DEMO-01 v${paymentVersion}. Execution remains unavailable.`,
    );
    tell(
      `${who} acknowledged the synthetic file review. No payment can be sent.`,
    );
  }
  function getMemo() {
    return `DEMO — SYNTHETIC DATA / CONCEPT PREVIEW\nCASHVARIANCE · MEMO-NQUS-20261012\n\nAll organizations, people, documents, amounts and outcomes are fictional. Local illustrative review only.\n\nEntity: North Quay Group / NQ-US / USD\nBank account: ••2317 / GL account: GL-61\nDate: 12 October 2026 / Simulated review: 10:00 UTC\nBank and GL source cutoff: 08:00 UTC\nExpected bank update: 09:00 UTC — not received\nFRESHNESS: STALE. This is not a confirmed 10:00 cash position.\n\nOpening balance: $200,000 on each source\n10 bank transactions: +$40,000 / 9 matched GL transactions: +$32,000\nObserved bank balance: $240,000\nObserved GL balance: $232,000\nOBSERVED DIFFERENCE: +$8,000 (unchanged)\nTR-808: $8,000 receipt present in bank source; absent from GL.\nExplanation: ${confirmed ? "Additional synthetic NQ-UK confirmation loaded; explanation accepted." : "Intercompany attribution unconfirmed; evidence pending."}\nDisposition: ${decision}\nJournal J-DRAFT-808: HELD / UNPOSTED. Conditional debit cash GL-61 $8,000, credit intercompany receivable $8,000, subject to review.\nFalse candidate TR-806: ${rejected ? "Rejected; already matched to another source identity." : "Not yet reviewed; equal amount is not evidence of a match."}\n\nSources: ST-NQUS-20261012-0800 row 8; GL-NQUS-20261012-0800 (no TR-808 match); IC-NQ-808. All sources synthetic.\nReviewer: Evan Cole (fictional)\nReview acknowledgment: ${memoReviewed ? "Simulated acknowledgment recorded; not certification of a current reconciled position." : "Pending simulated acknowledgment."}\nNext action: ${nextAction.replace("T", " ")} UTC — seek fresh source and confirm accounting treatment.\n\nPAY-DEMO-01 v${paymentVersion}: separate illustrative $12,000 file, excluded from position totals. ${approvals.length}/2 review acknowledgments. Execution unavailable.\n\nREVIEW HISTORY\n${history.join("\n")}\n\nNo source values changed. No journal posted. No funds moved. No bank or ERP connection.\nDEMO — SYNTHETIC DATA / CONCEPT PREVIEW`;
  }
  function downloadMemo() {
    const url = URL.createObjectURL(
      new Blob([getMemo()], { type: "text/plain;charset=utf-8" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "CashVariance-DEMO-MEMO-NQUS-20261012.txt";
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    tell(
      "Illustrative memo downloaded locally with synthetic-data and stale-source labels.",
    );
  }
  function resetDemo() {
    setTab("Evidence");
    setSelected("TR-808");
    setQuery("");
    setFilter("all");
    setFreshnessOpen(false);
    setJournalOpen(false);
    setCandidateOpen(false);
    setRejected(false);
    setConfirmed(false);
    setReason("");
    setNextAction("2026-10-12T11:00");
    setDecision("Held — awaiting counterparty evidence");
    setReviewMode("hold");
    setReviewError("");
    setHistory([
      "10:00 UTC · Mira Shah (fictional) opened the review. Source remains stale.",
    ]);
    setStarting(232000);
    setOutflows(250000);
    setBuffer(20000);
    setIncludeReceipt(false);
    setReceipt(30000);
    setReceiptDate("2026-10-13");
    setPaymentVersion(1);
    setPaymentEvidence(false);
    setFirstReviewer("Evan Cole");
    setSecondReviewer("Lena Ortiz");
    setApprovals([]);
    setMemoReviewed(false);
    tell("Demo reset to its original synthetic records.");
  }

  return (
    <section
      className="td-workbench"
      aria-label="Interactive synthetic treasury demonstration"
    >
      <div className="td-topbar">
        <div className="td-demo-label">
          <span className="td-square" />
          DEMO — SYNTHETIC DATA{" "}
          <span className="td-desktop-only">/ CONCEPT PREVIEW</span>
        </div>
        <button className="td-text-button" onClick={resetDemo}>
          <Icon name="reset" size={15} />
          Reset demo
        </button>
      </div>
      <header className="td-header">
        <div>
          <span className="td-eyebrow">DAILY POSITION / 12 OCT 2026</span>
          <h2>
            North Quay Group<span>Fictional organization</span>
          </h2>
          <p>
            NQ-US <span>·</span> USD <span>·</span> Account ••2317{" "}
            <span>·</span> GL-61
          </p>
        </div>
        <div className="td-reviewer">
          <span className="td-avatar">MS</span>
          <span>
            Mira Shah <small>Treasury analyst · fictional</small>
          </span>
        </div>
      </header>

      <div className="td-freshness">
        <button
          onClick={() => setFreshnessOpen(!freshnessOpen)}
          aria-expanded={freshnessOpen}
          aria-controls="td-freshness-detail"
        >
          <Icon name="clock" />
          <span>
            <strong>Source is stale.</strong> Last update 08:00 UTC; expected
            09:00 UTC.
          </span>
          <span className="td-freshness-link">
            View cutoff <Icon name="down" size={15} />
          </span>
        </button>
        <AnimatePresence initial={false}>
          {freshnessOpen && (
            <motion.div
              id="td-freshness-detail"
              className="td-freshness-detail"
              initial={{ height: reduce ? "auto" : 0, opacity: reduce ? 1 : 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: reduce ? "auto" : 0, opacity: reduce ? 1 : 0 }}
              transition={{ duration: reduce ? 0 : 0.22 }}
            >
              <p>
                Both source snapshots cover activity through{" "}
                <strong>08:00 on 12 October 2026</strong>. The expected 09:00
                bank update is missing. The fixed simulation clock is 10:00 UTC.
                This screen does not certify a current 10:00 cash position.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="td-position-grid">
        <div className="td-position">
          <span className="td-eyebrow">BANK / SYNTHETIC</span>
          <strong>
            $240,000<span>.00</span>
          </strong>
          <span className="td-position-meta">10 records · as of 08:00 UTC</span>
        </div>
        <div className="td-position">
          <span className="td-eyebrow">GENERAL LEDGER / SYNTHETIC</span>
          <strong>
            $232,000<span>.00</span>
          </strong>
          <span className="td-position-meta">
            9 matched records · as of 08:00 UTC
          </span>
        </div>
        <div className="td-position td-position-delta">
          <span className="td-eyebrow">OBSERVED DIFFERENCE / SYNTHETIC</span>
          <strong>
            $8,000<span>.00</span>
          </strong>
          <span className="td-position-meta">
            <span className="td-dot" />
            {confirmed
              ? "Explanation accepted · journal unposted"
              : "1 exception · explanation pending"}
          </span>
        </div>
      </div>

      <div
        className="td-tabs"
        role="tablist"
        aria-label="Treasury demo workspace"
      >
        {tabs.map((item, index) => (
          <button
            key={item}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            id={`td-tab-${index}`}
            role="tab"
            aria-selected={tab === item}
            aria-controls={`td-panel-${index}`}
            tabIndex={tab === item ? 0 : -1}
            onKeyDown={(event) => activateTab(event, index)}
            onClick={() => setTab(item)}
            className={tab === item ? "td-tab-active" : ""}
          >
            {item}
            {item === "Evidence" && <span>01</span>}
            {tab === item && (
              <motion.i
                layoutId="td-active-tab"
                transition={{ duration: reduce ? 0 : 0.25 }}
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={tab}
          id={`td-panel-${tabs.indexOf(tab)}`}
          role="tabpanel"
          aria-labelledby={`td-tab-${tabs.indexOf(tab)}`}
          className="td-panel"
          initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : -4 }}
          transition={{ duration: reduce ? 0 : 0.18 }}
        >
          {tab === "Evidence" && (
            <div className="td-evidence-layout">
              <aside
                className="td-queue"
                aria-label="Synthetic transaction queue"
              >
                <div className="td-queue-title">
                  <h3>Transaction queue</h3>
                  <span>10</span>
                </div>
                <span className="td-eyebrow">SYNTHETIC RECORDS</span>
                <label className="td-search">
                  <Icon name="search" size={16} />
                  <input
                    aria-label="Search transactions"
                    placeholder="Search ID or description"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </label>
                <div className="td-filter" aria-label="Filter transactions">
                  {[
                    ["all", "All"],
                    ["exception", "Unmatched"],
                    ["matched", "Matched"],
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      aria-pressed={filter === value}
                      onClick={() => setFilter(value)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <div className="td-transaction-list">
                  {filtered.map((item) => (
                    <button
                      key={item.id}
                      className={`td-transaction ${selected === item.id ? "td-selected" : ""}`}
                      onClick={() => setSelected(item.id)}
                      aria-pressed={selected === item.id}
                    >
                      <span className="td-transaction-top">
                        <span>{item.id}</span>
                        <strong>{money(item.amount)}</strong>
                      </span>
                      <span className="td-transaction-description">
                        {item.description}
                      </span>
                      <span
                        className={`td-transaction-status ${item.id === "TR-808" ? "td-pending" : ""}`}
                      >
                        <span />
                        {item.id === "TR-808"
                          ? "Unmatched · held"
                          : "Matched · reviewed"}
                        <small>{item.time}</small>
                      </span>
                    </button>
                  ))}
                  {filtered.length === 0 && (
                    <p className="td-empty">
                      No matching records. Try an ID such as TR-808.
                    </p>
                  )}
                </div>
                <div className="td-queue-footer">
                  Opening position <strong>$200,000</strong>
                  <small>Both sources · synthetic USD</small>
                </div>
              </aside>
              <div className="td-record-area">
                <div className="td-record-header">
                  <div>
                    <span className="td-eyebrow">
                      {record.id} / SYNTHETIC RECORD
                    </span>
                    <h3>
                      {isException
                        ? "One amount. An explanation to verify."
                        : record.description}
                    </h3>
                  </div>
                  <Tag tone={isException ? "amber" : "green"}>
                    {isException ? "Held / unposted" : "Matched"}
                  </Tag>
                </div>
                <div className="td-record-summary">
                  <div>
                    <span>Bank source</span>
                    <strong>{money(record.amount)}</strong>
                  </div>
                  <div>
                    <span>GL source</span>
                    <strong>{money(isException ? 0 : record.amount)}</strong>
                  </div>
                  <div>
                    <span>Difference</span>
                    <strong>{money(isException ? 8000 : 0)}</strong>
                  </div>
                </div>
                <div className="td-source-grid">
                  <div className="td-source-card">
                    <span className="td-eyebrow">
                      <Icon name="file" size={14} /> BANK STATEMENT · SYNTHETIC
                    </span>
                    <h4>Receipt recorded at {record.time}</h4>
                    <code>ST-NQUS-20261012-0800</code>
                    <p>
                      Source row {transactions.indexOf(record) + 1} · account
                      ••2317
                    </p>
                    <span className="td-source-footer">
                      12 OCT 2026 / 08:00 UTC
                    </span>
                  </div>
                  <div className="td-source-card">
                    <span className="td-eyebrow">
                      <Icon name="file" size={14} /> GENERAL LEDGER · SYNTHETIC
                    </span>
                    <h4>
                      {isException
                        ? "No corresponding entry"
                        : "Corresponding entry found"}
                    </h4>
                    <code>GL-NQUS-20261012-0800</code>
                    <p>
                      {isException
                        ? "GL-61 · attribution remains unconfirmed"
                        : `GL-61 · source reference ${record.id}-GL`}
                    </p>
                    <span className="td-source-footer">
                      12 OCT 2026 / 08:00 UTC
                    </span>
                  </div>
                </div>
                {isException ? (
                  <>
                    <div className="td-counterparty">
                      <div>
                        <span className="td-eyebrow">
                          COUNTERPARTY EVIDENCE · SYNTHETIC
                        </span>
                        <h4>
                          NQ-US <span>↔</span> NQ-UK
                        </h4>
                        <p>
                          {confirmed
                            ? "Owen Reed (fictional) confirms the candidate relationship in additional synthetic evidence. Accounting treatment still requires review."
                            : "IC-NQ-808 suggests an intercompany receipt. Counterparty confirmation is missing. The receipt is already in the bank snapshot."}
                        </p>
                      </div>
                      <div className="td-counterparty-action">
                        <Tag tone={confirmed ? "green" : "amber"}>
                          {confirmed
                            ? "Explanation accepted"
                            : "Confirmation pending"}
                        </Tag>
                        <button
                          className="td-button td-button-small"
                          onClick={acceptExplanation}
                          disabled={confirmed}
                        >
                          {confirmed ? (
                            <>
                              <Icon name="check" size={15} />
                              Evidence loaded
                            </>
                          ) : (
                            <>
                              Load synthetic confirmation
                              <Icon name="arrow" size={15} />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="td-accordion">
                      <button
                        aria-expanded={candidateOpen}
                        aria-controls="td-candidate"
                        onClick={() => setCandidateOpen(!candidateOpen)}
                      >
                        <span>
                          <span className="td-mini-number">01</span>Suggested
                          match: TR-806{" "}
                          <Tag tone={rejected ? "neutral" : "amber"}>
                            {rejected ? "Rejected" : "Review needed"}
                          </Tag>
                        </span>
                        <Icon name="down" size={16} />
                      </button>
                      <AnimatePresence initial={false}>
                        {candidateOpen && (
                          <motion.div
                            id="td-candidate"
                            className="td-accordion-content"
                            initial={{
                              height: reduce ? "auto" : 0,
                              opacity: reduce ? 1 : 0,
                            }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{
                              height: reduce ? "auto" : 0,
                              opacity: reduce ? 1 : 0,
                            }}
                            transition={{ duration: reduce ? 0 : 0.2 }}
                          >
                            <div>
                              <span className="td-eyebrow">
                                FAILED RECOMMENDATION · SYNTHETIC
                              </span>
                              <p>
                                TR-806 is also $8,000, but it is a customer
                                receipt with a different source identity and an
                                existing GL match. Equal amounts do not
                                establish a relationship.
                              </p>
                              <button
                                className="td-button td-button-secondary td-button-small"
                                disabled={rejected}
                                onClick={() => {
                                  setRejected(true);
                                  addHistory(
                                    "Evan Cole (fictional) rejected TR-806: distinct source identity; already matched. No source was reused.",
                                  );
                                  tell(
                                    "False match rejected and retained in the review history.",
                                  );
                                }}
                              >
                                {rejected
                                  ? "Rejection recorded"
                                  : "Reject this match"}
                                <Icon
                                  name={rejected ? "check" : "arrow"}
                                  size={15}
                                />
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="td-accordion">
                      <button
                        aria-expanded={journalOpen}
                        aria-controls="td-journal"
                        onClick={() => setJournalOpen(!journalOpen)}
                      >
                        <span>
                          <span className="td-mini-number">02</span>Conditional
                          journal proposal <Tag>Draft only</Tag>
                        </span>
                        <Icon name="down" size={16} />
                      </button>
                      <AnimatePresence initial={false}>
                        {journalOpen && (
                          <motion.div
                            id="td-journal"
                            className="td-accordion-content"
                            initial={{
                              height: reduce ? "auto" : 0,
                              opacity: reduce ? 1 : 0,
                            }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{
                              height: reduce ? "auto" : 0,
                              opacity: reduce ? 1 : 0,
                            }}
                            transition={{ duration: reduce ? 0 : 0.2 }}
                          >
                            <div>
                              <span className="td-eyebrow">
                                J-DRAFT-808 · SYNTHETIC / UNPOSTED
                              </span>
                              <div className="td-journal-line">
                                <span>Debit · Cash / GL-61</span>
                                <strong>$8,000</strong>
                              </div>
                              <div className="td-journal-line">
                                <span>Credit · Intercompany receivable</span>
                                <strong>$8,000</strong>
                              </div>
                              <p>
                                Conditional on confirmed attribution and
                                accounting treatment.{" "}
                                {confirmed
                                  ? "An explanation has been accepted; the proposed entry is still held. "
                                  : "Counterparty confirmation is still required. "}
                                Observed bank $240,000 and GL $232,000 remain
                                unchanged.
                              </p>
                              <div className="td-lock-note">
                                <Icon name="lock" size={15} />
                                Posting unavailable in this concept preview.
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="td-review-card">
                      <CardTitle
                        eyebrow="REVIEWER DECISION"
                        title="A person owns the next step."
                      />
                      <div className="td-field-row">
                        <label>
                          Decision
                          <select
                            aria-label="Decision"
                            value={reviewMode}
                            onChange={(event) =>
                              setReviewMode(event.target.value)
                            }
                          >
                            <option value="hold">Keep proposal held</option>
                            <option value="override">
                              Override proposed classification
                            </option>
                          </select>
                        </label>
                        <label>
                          Next action · UTC
                          <input
                            type="datetime-local"
                            min="2026-10-12T10:00"
                            value={nextAction}
                            onChange={(event) =>
                              setNextAction(event.target.value)
                            }
                          />
                        </label>
                      </div>
                      <label className="td-field">
                        {reviewMode === "override"
                          ? "Override reason"
                          : "Reason for hold"}
                        <textarea
                          value={reason}
                          onChange={(event) => setReason(event.target.value)}
                          placeholder={
                            reviewMode === "override"
                              ? "Explain why the proposed classification needs review…"
                              : "e.g. Await fresh bank source and accounting review."
                          }
                          aria-describedby={
                            reviewError ? "td-review-error" : "td-review-help"
                          }
                          aria-invalid={!!reviewError}
                          rows={2}
                        />
                      </label>
                      <p className="td-helper" id="td-review-help">
                        Evan Cole · fictional reviewer. An override cannot
                        change source values or bypass missing evidence.
                      </p>
                      {reviewError && (
                        <p
                          className="td-error"
                          id="td-review-error"
                          role="alert"
                        >
                          {reviewError}
                        </p>
                      )}
                      <div className="td-review-bottom">
                        <span>
                          <span className="td-dot" />
                          {decision}
                        </span>
                        <button
                          className="td-button td-button-small"
                          onClick={saveReview}
                        >
                          Save local review
                          <Icon name="arrow" size={15} />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="td-matched-note">
                    <Icon name="check" size={22} />
                    <div>
                      <h4>Source identity and amount agree.</h4>
                      <p>
                        This fictional record is included in the nine matched
                        transactions, which net to $32,000. No additional action
                        is proposed.
                      </p>
                      <button
                        className="td-text-button"
                        onClick={() => setSelected("TR-808")}
                      >
                        Return to the $8,000 exception{" "}
                        <Icon name="arrow" size={15} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {tab === "Cash outlook" && (
            <div className="td-secondary-panel">
              <div className="td-panel-intro">
                <span className="td-eyebrow">
                  CASH PROOF / ILLUSTRATIVE ASSUMPTIONS
                </span>
                <h3>Make the assumptions visible.</h3>
                <p>
                  Explore the buffer through 14 October 2026 using the stale GL
                  snapshot. These are editable synthetic inputs, not a forecast
                  of an operating company.
                </p>
              </div>
              <div className="td-forecast-layout">
                <div className="td-assumptions">
                  <CardTitle
                    eyebrow="SCENARIO INPUTS"
                    title="What changes the position?"
                  />
                  {[
                    ["Starting GL position", starting, setStarting],
                    ["Planned outflows", outflows, setOutflows],
                    ["Minimum buffer", buffer, setBuffer],
                  ].map(([label, value, setter]) => (
                    <label className="td-number-field" key={label as string}>
                      <span>
                        {label as string}
                        <small>USD · synthetic assumption</small>
                      </span>
                      <span className="td-currency-input">
                        <span>$</span>
                        <input
                          aria-label={label as string}
                          type="number"
                          min="0"
                          step="1000"
                          value={value as number}
                          onChange={(event) =>
                            (setter as (n: number) => void)(
                              Math.max(0, Number(event.target.value)),
                            )
                          }
                        />
                      </span>
                    </label>
                  ))}
                  <div className="td-receipt-assumption">
                    <label className="td-check-label">
                      <input
                        type="checkbox"
                        checked={includeReceipt}
                        onChange={(event) =>
                          setIncludeReceipt(event.target.checked)
                        }
                      />
                      <span>
                        Include expected customer receipt
                        <small>Separate scenario EXPECTED-CUST-30</small>
                      </span>
                    </label>
                    <div className="td-field-row">
                      <label>
                        Assumed amount · USD
                        <input
                          type="number"
                          min="0"
                          step="1000"
                          value={receipt}
                          disabled={!includeReceipt}
                          onChange={(event) =>
                            setReceipt(Math.max(0, Number(event.target.value)))
                          }
                        />
                      </label>
                      <label>
                        Expected receipt date
                        <input
                          type="date"
                          min="2026-10-12"
                          value={receiptDate}
                          disabled={!includeReceipt}
                          onChange={(event) =>
                            setReceiptDate(event.target.value)
                          }
                        />
                      </label>
                    </div>
                    <p className="td-helper">
                      TR-808 is already present in the bank snapshot and is
                      never counted as a future inflow.
                    </p>
                  </div>
                </div>
                <div className="td-forecast-result">
                  <span className="td-eyebrow">
                    THROUGH 14 OCT 2026 / SYNTHETIC
                  </span>
                  <span className="td-result-label">
                    Projected closing position
                  </span>
                  <strong className="td-big-number">
                    {money(effectiveProjected)}
                  </strong>
                  <div
                    className="td-forecast-bars"
                    aria-label={`Starting position ${money(starting)}, outflows ${money(outflows)}, assumed inflow ${money(includeReceipt && receiptFallsWithinHorizon ? receipt : 0)}`}
                  >
                    <div>
                      <span>Starting GL</span>
                      <i
                        style={{
                          width: `${Math.min(100, (starting / Math.max(starting, outflows, 1)) * 100)}%`,
                        }}
                      />
                      <strong>{money(starting)}</strong>
                    </div>
                    <div>
                      <span>Outflows</span>
                      <i
                        className="td-bar-outflow"
                        style={{
                          width: `${Math.min(100, (outflows / Math.max(starting, outflows, 1)) * 100)}%`,
                        }}
                      />
                      <strong>−{money(outflows)}</strong>
                    </div>
                    <div>
                      <span>Assumed inflow</span>
                      <i
                        className="td-bar-inflow"
                        style={{
                          width: `${includeReceipt && receiptFallsWithinHorizon ? Math.max(3, Math.min(100, (receipt / Math.max(starting, outflows, receipt, 1)) * 100)) : 0}%`,
                        }}
                      />
                      <strong>
                        {money(
                          includeReceipt && receiptFallsWithinHorizon
                            ? receipt
                            : 0,
                        )}
                      </strong>
                    </div>
                  </div>
                  <div className="td-buffer-gap">
                    <span>
                      {effectiveGap > 0
                        ? "Below minimum buffer by"
                        : "Minimum buffer met"}
                    </span>
                    <strong>{money(effectiveGap)}</strong>
                  </div>
                  {includeReceipt && !receiptDateValid && (
                    <p className="td-error" role="status">
                      Choose a receipt date on or after 12 October 2026. The
                      undated or earlier receipt is excluded from this scenario.
                    </p>
                  )}
                  {includeReceipt &&
                    receiptDateValid &&
                    !receiptFallsWithinHorizon && (
                      <p className="td-helper">
                        The expected receipt is after 14 October and is excluded
                        from this horizon. With that later receipt, the
                        illustrative position would be {money(projected)} and
                        the buffer gap {money(gap)}.
                      </p>
                    )}
                  <p className="td-lock-note">
                    <Icon name="clock" size={16} />
                    Stale starting source. Inputs and timing require human
                    review.
                  </p>
                </div>
              </div>
            </div>
          )}

          {tab === "Payment review" && (
            <div className="td-secondary-panel">
              <div className="td-panel-intro">
                <span className="td-eyebrow">CASH SIGNAL / BLOCKED DRAFT</span>
                <h3>Two reviewers. No execution.</h3>
                <p>
                  A separate illustrative $12,000 approved-file record. It is
                  excluded from the bank activity above. Every acknowledgment is
                  tied to this file version.
                </p>
              </div>
              <div className="td-payment-layout">
                <div className="td-payment-file">
                  <CardTitle
                    eyebrow={`PAY-DEMO-01 / VERSION ${paymentVersion}`}
                    title="Payment-file anomaly review"
                  >
                    <Tag tone="amber">Execution blocked</Tag>
                  </CardTitle>
                  <div className="td-payment-amount">
                    <strong>
                      $12,000<span>.00 USD</span>
                    </strong>
                    <span>Fictional approved payment file</span>
                  </div>
                  <div className="td-source-line">
                    <span>Counterparty</span>
                    <strong>North Quay Services · fictional</strong>
                  </div>
                  <div className="td-source-line">
                    <span>File</span>
                    <code>NQUS-payment-v{paymentVersion}.csv</code>
                  </div>
                  <div className="td-payment-warning">
                    <Icon name={paymentEvidence ? "check" : "alert"} />
                    <div>
                      <strong>
                        {paymentEvidence
                          ? "Synthetic supporting reference loaded"
                          : "Supporting reference missing"}
                      </strong>
                      <p>
                        {paymentEvidence
                          ? `Reference SUPPORT-PAY-01-v${paymentVersion} is available for this version only. Reviewers may now acknowledge the file.`
                          : "The approved file lacks a supporting reference. Both reviewer actions stay blocked until evidence is present."}
                      </p>
                    </div>
                  </div>
                  <button
                    className="td-button td-button-secondary"
                    disabled={paymentEvidence}
                    onClick={() => {
                      setPaymentEvidence(true);
                      tell(
                        "Synthetic support loaded for the current file version. Separate reviewers can now acknowledge the review.",
                      );
                    }}
                  >
                    {paymentEvidence
                      ? "Supporting evidence loaded"
                      : "Load synthetic supporting evidence"}
                    <Icon
                      name={paymentEvidence ? "check" : "arrow"}
                      size={16}
                    />
                  </button>
                  <button
                    className="td-text-button td-change-file"
                    onClick={changePayment}
                  >
                    <Icon name="reset" size={15} />
                    Simulate a changed file
                  </button>
                  <p className="td-helper">
                    Changing the file removes supporting evidence and
                    invalidates both approvals.
                  </p>
                </div>
                <div className="td-payment-reviewers">
                  <CardTitle
                    eyebrow="SEGREGATION OF DUTIES"
                    title="Independent review"
                  >
                    <span className="td-review-count">
                      {approvals.length}
                      <small>/ 2</small>
                    </span>
                  </CardTitle>
                  {[0, 1].map((slot) => {
                    const reviewer =
                      slot === 0 ? firstReviewer : secondReviewer;
                    const acknowledged =
                      approvals.includes(reviewer) &&
                      (slot === 0
                        ? approvals[0] === reviewer
                        : approvals[1] === reviewer);
                    const sameReviewer =
                      slot === 1 && firstReviewer === secondReviewer;
                    const disabled =
                      !paymentEvidence ||
                      acknowledged ||
                      (slot === 0 && approvals.length > 0) ||
                      (slot === 1 &&
                        (approvals.length !== 1 ||
                          sameReviewer ||
                          approvals.includes(reviewer)));
                    return (
                      <div className="td-reviewer-step" key={slot}>
                        <div className="td-step-number">0{slot + 1}</div>
                        <div>
                          <span className="td-eyebrow">
                            {slot === 0 ? "FIRST" : "SECOND"} REVIEWER /
                            FICTIONAL
                          </span>
                          <label
                            className="td-sr-only"
                            htmlFor={`td-reviewer-${slot}`}
                          >
                            {slot === 0 ? "First" : "Second"} payment reviewer
                          </label>
                          <select
                            id={`td-reviewer-${slot}`}
                            value={reviewer}
                            disabled={
                              (approvals.length > 0 && slot === 0) ||
                              approvals.length > 1
                            }
                            onChange={(event) =>
                              slot === 0
                                ? setFirstReviewer(event.target.value)
                                : setSecondReviewer(event.target.value)
                            }
                          >
                            {reviewers.map((name) => (
                              <option key={name}>{name}</option>
                            ))}
                          </select>
                          <button
                            className="td-button td-button-small td-button-secondary"
                            disabled={disabled}
                            onClick={() => approvePayment(slot)}
                          >
                            {acknowledged
                              ? "Review acknowledged"
                              : "Acknowledge review"}
                            <Icon
                              name={acknowledged ? "check" : "arrow"}
                              size={15}
                            />
                          </button>
                          {sameReviewer && (
                            <p className="td-error">
                              Choose a different second reviewer.
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  <div className="td-execution-block">
                    <button className="td-button" disabled>
                      <Icon name="lock" size={16} />
                      Send / execute unavailable
                    </button>
                    <p>
                      {approvals.length === 2
                        ? "Both synthetic reviews are acknowledged. This concept still cannot send a file, initiate a payment or write to a bank or ERP."
                        : "Review-only concept. Execution remains unavailable even after both reviews."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === "Close memo" && (
            <div className="td-secondary-panel">
              <div className="td-panel-intro">
                <span className="td-eyebrow">
                  MEMO-NQUS-20261012 / SYNTHETIC
                </span>
                <h3>A reviewable close. Including what is unresolved.</h3>
                <p>
                  Acknowledging this memo records a simulated review. It does
                  not certify a current reconciled cash position or post the
                  proposed journal.
                </p>
              </div>
              <div className="td-memo-layout">
                <article className="td-memo">
                  <div className="td-memo-top">
                    <span className="td-eyebrow">
                      CASHVARIANCE / POSITION MEMO
                    </span>
                    <Tag>DEMO · SYNTHETIC</Tag>
                  </div>
                  <h4>North Quay Group</h4>
                  <p className="td-memo-meta">
                    NQ-US · 12 October 2026 · 10:00 UTC
                  </p>
                  <div className="td-memo-warning">
                    <Icon name="clock" size={16} />
                    Stale sources: 08:00 cutoff; 09:00 update missing.
                  </div>
                  <dl>
                    <div>
                      <dt>Bank position</dt>
                      <dd>$240,000</dd>
                    </div>
                    <div>
                      <dt>GL position</dt>
                      <dd>$232,000</dd>
                    </div>
                    <div className="td-memo-difference">
                      <dt>Observed difference</dt>
                      <dd>$8,000</dd>
                    </div>
                  </dl>
                  <div className="td-memo-paragraph">
                    <span className="td-eyebrow">EXPLANATION</span>
                    <p>
                      {confirmed
                        ? "Additional synthetic counterparty confirmation supports the intercompany attribution. Explanation accepted; journal unposted."
                        : "An $8,000 bank receipt has an unconfirmed intercompany attribution. Confirmation remains outstanding."}
                    </p>
                  </div>
                  <div className="td-memo-paragraph">
                    <span className="td-eyebrow">DISPOSITION</span>
                    <p>
                      {decision}. J-DRAFT-808 remains held and unposted. The
                      observed difference is unchanged.
                    </p>
                  </div>
                  <div className="td-memo-paragraph">
                    <span className="td-eyebrow">NEXT ACTION</span>
                    <p>
                      {nextAction.replace("T", " ")} UTC. Seek a fresh source
                      and confirm accounting treatment.
                    </p>
                  </div>
                  <div className="td-memo-signature">
                    <span className="td-avatar">EC</span>
                    <span>
                      Evan Cole{" "}
                      <small>
                        Fictional reviewer ·{" "}
                        {memoReviewed
                          ? "review acknowledged"
                          : "acknowledgment pending"}
                      </small>
                    </span>
                  </div>
                  <p className="td-memo-provenance">
                    Sources: ST-NQUS-20261012-0800 · GL-NQUS-20261012-0800 ·
                    IC-NQ-808. All records and people are invented. No bank or
                    ERP connection.
                  </p>
                </article>
                <aside className="td-memo-side">
                  <CardTitle
                    eyebrow="LOCAL REVIEW HISTORY"
                    title="The decision trail"
                  />
                  <ol className="td-history">
                    {history.map((entry, index) => (
                      <li key={`${index}-${entry}`}>{entry}</li>
                    ))}
                  </ol>
                  <button
                    className="td-button"
                    disabled={memoReviewed}
                    onClick={() => {
                      setMemoReviewed(true);
                      tell(
                        "Simulated memo acknowledgment recorded. This is not certification of a reconciled current position.",
                      );
                    }}
                  >
                    {memoReviewed
                      ? "Simulated review acknowledged"
                      : "Acknowledge simulated review"}
                    <Icon name={memoReviewed ? "check" : "arrow"} size={16} />
                  </button>
                  <button
                    className="td-button td-button-secondary"
                    onClick={downloadMemo}
                  >
                    <Icon name="download" size={16} />
                    Download illustrative memo
                  </button>
                  <p className="td-helper">
                    Local text download. No external send, sensitive data or
                    production action.
                  </p>
                </aside>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      <div className="td-status" role="status" aria-live="polite">
        {notice ||
          "Explore the synthetic records. All changes are local and reset when this page reloads."}
      </div>
      <footer className="td-footer">
        <span>
          <Icon name="lock" size={14} />
          Read-only concept. No funds moved. No journals posted.
        </span>
        <span>DEMO — SYNTHETIC DATA</span>
      </footer>
    </section>
  );
}
