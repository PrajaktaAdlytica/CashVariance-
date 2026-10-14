"use client";
import Link from "next/link";
import { products, Product } from "@/data/products";
import { SupportPage } from "@/data/pages";
import {
  Accordion,
  Button,
  Disclosure,
  Eyebrow,
  FinalCTA,
  HeroArt,
  Icon,
  Reveal,
} from "./Primitives";
export function ProductPage({ product: p }: { product: Product }) {
  return (
    <>
      <section className={`page-hero theme-${p.theme}`}>
        <div className="container page-hero-grid">
          <Reveal>
            <Eyebrow>
              Proposed module / 0{p.id} / {p.name}
            </Eyebrow>
            <h1>{p.headline}</h1>
            <p className="lead">{p.description}</p>
            <Button href={`/request-diagnostic?offer=${p.id}`}>
              Discuss {p.name}
            </Button>
            <Disclosure />
          </Reveal>
          <Reveal delay={0.15}>
            <HeroArt name={p.slug} />
          </Reveal>
        </div>
      </section>
      <div className="container">
        <section className="product-summary">
          <div>
            <h2>The job</h2>
            <p>{p.job}</p>
          </div>
          <div>
            <h2>Permissioned inputs</h2>
            <ul>
              {p.input.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Proposed output</h2>
            <p>{p.output}</p>
          </div>
        </section>
        <section className="product-detail">
          <div className="product-detail-grid">
            <Reveal>
              <Eyebrow>A reviewable process</Eyebrow>
              <h2>
                What happens
                <br />
                between input
                <br />
                and decision.
              </h2>
            </Reveal>
            <div>
              {p.steps.map((s, i) => (
                <Reveal key={s.title}>
                  <article>
                    <Eyebrow>
                      0{i + 1} / {p.name}
                    </Eyebrow>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </div>
      <section className="product-demo-band">
        <div className="container">
          <Reveal>
            <Eyebrow>Inspect the concept</Eyebrow>
            <h2>One record. Every relevant detail.</h2>
            <p>
              Follow the fictional North Quay Group example. Inspect the source,
              challenge a candidate and record a reviewed hold.
            </p>
          </Reveal>
          <Button href={`/demo?module=${p.slug}`}>
            Explore synthetic demo
          </Button>
        </div>
      </section>
      <section className="container product-evaluation">
        <Reveal>
          <Eyebrow>The question to test</Eyebrow>
          <h2>
            Useful is something
            <br />
            we need to measure.
          </h2>
          <p>{p.question}</p>
          <Link href="/resources/pilot-scorecard" className="text-link">
            Review the evaluation method <Icon name="arrow" />
          </Link>
        </Reveal>
        <Reveal>
          <Eyebrow>Scope boundary</Eyebrow>
          <h3>
            What this module
            <br />
            does not do.
          </h3>
          <p>{p.boundary}</p>
          <Link href="/controls" className="text-link">
            Controls & data <Icon name="arrow" />
          </Link>
        </Reveal>
      </section>
      <section className="container product-faq">
        <Eyebrow>A few specifics</Eyebrow>
        <h2>Before you evaluate.</h2>
        <Accordion items={p.faq} />
      </section>
      <FinalCTA />
    </>
  );
}
export function ProductsPage() {
  return (
    <>
      <section className="page-hero-center container">
        <Eyebrow>Five proposed modules</Eyebrow>
        <h1>
          A focused job.
          <br />A standard of evidence.
        </h1>
        <p>
          Start with the recurring review task. Each offer has its own inputs,
          decisions and evaluation question. Bundle only when the evidence
          supports it.
        </p>
      </section>
      <section className="container catalog-grid">
        {products.map((p) => (
          <Reveal key={p.slug}>
            <Link
              href={`/products/${p.slug}`}
              className={`catalog-card theme-${p.theme}`}
            >
              <div>
                <Eyebrow>0{p.id} / Proposed module</Eyebrow>
                <h2>{p.name}</h2>
                <p>{p.job}</p>
                <div className="text-link">
                  Explore the workflow <Icon name="arrow-up-right" />
                </div>
              </div>
              <HeroArt name={p.slug} />
            </Link>
          </Reveal>
        ))}
      </section>
      <section className="container comparison">
        <Eyebrow>Choose the first repeat job</Eyebrow>
        <h2>
          Different questions.
          <br />
          Distinct proposals.
        </h2>
        <div
          className="table-scroll"
          tabIndex={0}
          aria-label="Scrollable module comparison"
        >
          <table>
            <thead>
              <tr>
                <th>Module</th>
                <th>Input focus</th>
                <th>Review output</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>
                    <Link href={`/products/${p.slug}`}>{p.name} ↗</Link>
                  </td>
                  <td>{p.input.join(" · ")}</td>
                  <td>{p.output}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
function Bullet({ text }: { text: string }) {
  const m = text.match(/(https?:\/\/\S+)/);
  if (!m) return <>{text}</>;
  return (
    <>
      {text.slice(0, m.index)}
      <a href={m[0]} target="_blank" rel="noreferrer">
        Read original source ↗
      </a>
    </>
  );
}
export function SupportingPage({
  page: p,
  slug,
}: {
  page: SupportPage;
  slug: string;
}) {
  const legal = ["privacy", "terms"].includes(slug);
  return (
    <>
      <section
        className={`page-hero theme-${p.theme} ${legal ? "legal-hero" : ""}`}
      >
        <div className="container page-hero-grid">
          <Reveal>
            <Eyebrow>{p.eyebrow}</Eyebrow>
            <h1>{p.title}</h1>
            <p className="lead">{p.lead}</p>
            <Button href={p.ctaHref}>{p.cta}</Button>
            {legal ? (
              <p className="privacy-update">Preview notice · 14 October 2026</p>
            ) : (
              <Disclosure />
            )}
          </Reveal>
          <Reveal delay={0.1}>
            <HeroArt name={p.hero} />
          </Reveal>
        </div>
      </section>
      {slug === "controls" && (
        <section className="container permissions-section">
          <Eyebrow>Proposed pilot / permission boundary</Eyebrow>
          <h2>Read, review, record.</h2>
          <div
            className="table-scroll"
            tabIndex={0}
            aria-label="Permissions matrix"
          >
            <table>
              <thead>
                <tr>
                  <th>Capability</th>
                  <th>Proposed pilot</th>
                  <th>Authority</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "Read historical exports",
                    "In scope",
                    "Permissioned by the company",
                  ],
                  [
                    "Propose classification / journal",
                    "Draft only",
                    "Named reviewer",
                  ],
                  ["Record a review decision", "In scope", "Treasury reviewer"],
                  [
                    "Acknowledge payment-file review",
                    "Separate simulated reviews",
                    "Two distinct reviewers",
                  ],
                  ["Post to ERP or bank", "Unavailable", "Outside pilot"],
                  [
                    "Transmit file or move funds",
                    "Unavailable",
                    "Outside pilot",
                  ],
                ].map((row) => (
                  <tr key={row[0]}>
                    {row.map((x) => (
                      <td key={x}>{x}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
      <section className="container support-content">
        {p.sections.map((s) => (
          <Reveal key={s.title}>
            <article className="support-section">
              <div>
                <Eyebrow>{s.label}</Eyebrow>
                <h2>{s.title}</h2>
              </div>
              <div>
                <p>{s.body}</p>
                {s.bullets && (
                  <ul>
                    {s.bullets.map((b) => (
                      <li key={b}>
                        <Bullet text={b} />
                      </li>
                    ))}
                  </ul>
                )}
                {slug === "use-cases" && (
                  <Link
                    href={`/request-diagnostic?role=${encodeURIComponent(s.label === "Controllers" ? "Controller" : s.label === "Implementation partners" ? "Implementation partner" : s.label === "PE finance operating teams" ? "CFO / Finance" : "Treasury")}`}
                    className="text-link"
                  >
                    Discuss this workflow <Icon name="arrow" />
                  </Link>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </section>
      {p.faq.length > 0 && (
        <section className="container support-faq">
          <Reveal>
            <Eyebrow>Questions & distinctions</Eyebrow>
            <h2>
              Before the
              <br />
              next step.
            </h2>
          </Reveal>
          <Accordion items={p.faq} />
        </section>
      )}
      {slug === "resources" && (
        <section className="container resource-links">
          {[
            ["Evaluation method", "/resources/pilot-scorecard"],
            ["Data preparation", "/resources/data-checklist"],
            ["Research & sources", "/resources/research"],
          ].map(([t, h]) => (
            <Link href={h} key={h}>
              {t}
              <Icon name="arrow-up-right" />
            </Link>
          ))}
        </section>
      )}
      {!legal && <FinalCTA />}
    </>
  );
}
