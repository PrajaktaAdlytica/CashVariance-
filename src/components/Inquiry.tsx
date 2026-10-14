"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { products } from "@/data/products";
import { Eyebrow, HeroArt, Icon } from "./Primitives";
export default function Inquiry({
  kind,
}: {
  kind: "diagnostic" | "demo" | "contact";
}) {
  const reduce = useReducedMotion();
  const [errors, setErrors] = useState<Record<string, string>>({}),
    [prepared, setPrepared] = useState(false),
    [draft, setDraft] = useState(""),
    [offer, setOffer] = useState("undecided"),
    [values, setValues] = useState<Record<string, string>>({});
  const title =
    kind === "diagnostic"
      ? "Start with the exception you keep explaining."
      : kind === "demo"
        ? "Walk through one held exception."
        : "A useful conversation starts with a clear question.";
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const o = params.get("offer");
    if (o && products.some((p) => String(p.id) === o)) setOffer(o);
    const r = params.get("role");
    if (
      r &&
      [
        "Treasury",
        "Controller",
        "CFO / Finance",
        "Implementation partner",
        "Other",
      ].includes(r)
    )
      setValues((v) => ({ ...v, role: r }));
  }, []);
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget),
      next: Record<string, string> = {};
    if (!String(f.get("email") || "").match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      next.email = "Enter a complete work email address.";
    if (!String(f.get("company") || "").trim())
      next.company = "Enter your company name.";
    if (!f.get("role")) next.role = "Choose your role.";
    if (!f.get("consent"))
      next.consent = "Confirm that you want to prepare this inquiry draft.";
    setErrors(next);
    if (Object.keys(next).length) {
      setTimeout(
        () => document.getElementById(Object.keys(next)[0])?.focus(),
        20,
      );
      return;
    }
    const lines = [
      "CashVariance — inquiry draft",
      "PREVIEW ONLY — NOT SENT",
      `Request: ${kind}`,
      `Name: ${f.get("name") || "Not supplied"}`,
      `Work email: ${f.get("email")}`,
      `Company: ${f.get("company")}`,
      `Role: ${f.get("role")}`,
      `Module: ${products.find((p) => String(p.id) === offer)?.name || "Undecided"}`,
      `Topic: ${f.get("topic") || "Diagnostic"}`,
      `Question: ${f.get("question") || "Not supplied"}`,
      "Contact-purpose consent: checked",
      `Optional updates: ${f.get("updates") ? "opted in for a future submitted inquiry" : "not opted in"}`,
      "No data sent. No payment collected. Share only through an agreed contact channel.",
    ];
    setValues(
      Object.fromEntries(
        Array.from(f.entries()).map(([k, v]) => [k, String(v)]),
      ),
    );
    setDraft(lines.join("\n"));
    setPrepared(true);
  }
  function download() {
    const url = URL.createObjectURL(new Blob([draft], { type: "text/plain" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "cashvariance-inquiry-draft.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <section className="form-page container">
      <div className="form-grid">
        <div className="form-intro">
          <Eyebrow>
            {kind === "demo"
              ? "Request a guided demo"
              : kind === "contact"
                ? "Contact CashVariance"
                : "Bank-statement exception diagnostic"}
          </Eyebrow>
          <h1>{title}</h1>
          <p>
            {kind === "demo"
              ? "Inspect a synthetic daily close, from stale source data through an $8,000 difference and a reviewer-owned next action."
              : "Tell us the recurring review task, the current process and who owns the decision. No bank details or sensitive records are needed."}
          </p>
          <HeroArt
            name={
              kind === "contact"
                ? "contact"
                : kind === "demo"
                  ? "request-demo"
                  : "request-diagnostic"
            }
          />
        </div>
        <div className="inquiry-form">
          <AnimatePresence mode="wait" initial={false}>
            {prepared ? (
              <motion.div
                key="prepared"
                className="prepared"
                role="status"
                initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Icon name="evidence" size={30} />
                <h2>
                  Your inquiry draft
                  <br />
                  is ready.
                </h2>
                <p>
                  Nothing has been sent. Download the draft for your records.
                  Inquiry delivery is not connected in this concept preview.
                </p>
                <button className="button" onClick={download}>
                  <span>Download inquiry draft</span>
                  <Icon name="export" />
                </button>
                <button
                  className="secondary"
                  onClick={() => setPrepared(false)}
                >
                  Return to the form
                </button>
                <p className="form-note">
                  Your entries remain in this browser tab only and are cleared
                  when the page reloads.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={submit}
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="form-banner">
                  <Icon name="evidence" size={18} />
                  <p>
                    Preview form. Prepare a local inquiry draft; no request is
                    sent, stored on a server or booked in a calendar.
                  </p>
                </div>
                <div className="form-fields">
                  <div className="field">
                    <label htmlFor="name">
                      Name <span>(optional)</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      defaultValue={values.name || ""}
                      autoComplete="name"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="email">Work email *</label>
                    <input
                      id="email"
                      name="email"
                      defaultValue={values.email || ""}
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                    />
                    {errors.email && (
                      <span id="email-error" className="field-error">
                        {errors.email}
                      </span>
                    )}
                  </div>
                  <div className="field">
                    <label htmlFor="company">Company *</label>
                    <input
                      id="company"
                      name="company"
                      defaultValue={values.company || ""}
                      autoComplete="organization"
                      placeholder="Company name"
                      aria-invalid={!!errors.company}
                      aria-describedby={
                        errors.company ? "company-error" : undefined
                      }
                    />
                    {errors.company && (
                      <span id="company-error" className="field-error">
                        {errors.company}
                      </span>
                    )}
                  </div>
                  <div className="field">
                    <label htmlFor="role">Your role *</label>
                    <select
                      key={values.role || "role"}
                      id="role"
                      name="role"
                      defaultValue={values.role || ""}
                      aria-invalid={!!errors.role}
                      aria-describedby={errors.role ? "role-error" : undefined}
                    >
                      <option value="" disabled>
                        Select your role
                      </option>
                      {[
                        "Treasury",
                        "Controller",
                        "CFO / Finance",
                        "Implementation partner",
                        "Other",
                      ].map((x) => (
                        <option key={x}>{x}</option>
                      ))}
                    </select>
                    {errors.role && (
                      <span id="role-error" className="field-error">
                        {errors.role}
                      </span>
                    )}
                  </div>
                  <div className="field full">
                    <label htmlFor="offer">Which proposed module?</label>
                    <select
                      id="offer"
                      name="offer"
                      value={offer}
                      onChange={(e) => setOffer(e.target.value)}
                    >
                      <option value="undecided">
                        Help me identify the first repeat job
                      </option>
                      {products.map((p) => (
                        <option value={p.id} key={p.id}>
                          {p.name} — {p.job}
                        </option>
                      ))}
                    </select>
                  </div>
                  {kind === "contact" && (
                    <div className="field full">
                      <label htmlFor="topic">Inquiry topic</label>
                      <select
                        id="topic"
                        name="topic"
                        defaultValue={values.topic || "General inquiry"}
                      >
                        <option>General inquiry</option>
                        <option>Partner conversation</option>
                        <option>Privacy / deletion</option>
                      </select>
                    </div>
                  )}
                  <div className="field full">
                    <label htmlFor="question">
                      What keeps the review open? <span>(optional)</span>
                    </label>
                    <textarea
                      id="question"
                      name="question"
                      defaultValue={values.question || ""}
                      maxLength={1000}
                      placeholder="A recurring workflow question. Please do not include bank details, account numbers or financial records."
                    />
                  </div>
                </div>
                <label className="consent-label">
                  <input
                    id="consent"
                    type="checkbox"
                    name="consent"
                    defaultChecked={!!values.consent}
                    aria-describedby={
                      errors.consent ? "consent-error" : undefined
                    }
                  />
                  <span>
                    I agree to use these details to prepare this inquiry draft.
                    Nothing is sent from this preview.{" "}
                    <Link href="/privacy">Privacy notice</Link>.
                  </span>
                </label>
                {errors.consent && (
                  <p id="consent-error" className="field-error">
                    {errors.consent}
                  </p>
                )}
                <label className="consent-label">
                  <input
                    type="checkbox"
                    name="updates"
                    defaultChecked={!!values.updates}
                  />
                  <span>
                    Include an optional request for research and pilot updates
                    in my draft.
                  </span>
                </label>
                <button className="button form-submit" type="submit">
                  <span>
                    Prepare {kind === "demo" ? "demo" : "inquiry"} request
                  </span>
                  <Icon name="arrow" />
                </button>
                <p className="form-note">
                  No bank credentials, financial files, payment or sensitive
                  records. A real pilot requires an agreed scope and
                  permissioned handling.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
