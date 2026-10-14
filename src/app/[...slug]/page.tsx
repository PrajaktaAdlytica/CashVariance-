import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { supportPages } from "@/data/pages";
import { ProductPage, ProductsPage, SupportingPage } from "@/components/Pages";
import { Button, Eyebrow } from "@/components/Primitives";
import Inquiry from "@/components/Inquiry";
import TreasuryDemo from "@/components/TreasuryDemo";
const special = [
  "products",
  "request-diagnostic",
  "request-demo",
  "contact",
  "sign-in",
  "demo",
];
export function generateStaticParams() {
  return [
    ...special,
    ...Object.keys(supportPages),
    ...products.map((p) => `products/${p.slug}`),
  ].map((p) => ({ slug: p.split("/") }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const key = slug.join("/");
  const product = products.find((p) => key === `products/${p.slug}`);
  const page = supportPages[key];
  return {
    title: product
      ? `${product.name} — ${product.job}`
      : page?.title ||
        {
          products: "Proposed treasury modules",
          demo: "Interactive synthetic demo",
          "request-diagnostic": "Request a diagnostic",
          "request-demo": "Request a guided demo",
          contact: "Contact",
          "sign-in": "Concept preview access",
        }[key] ||
        "CashVariance",
    description:
      product?.description ||
      page?.lead ||
      "Explore the CashVariance treasury exception review concept.",
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const key = slug.join("/");
  const product = products.find((p) => key === `products/${p.slug}`);
  if (product) return <ProductPage product={product} />;
  if (supportPages[key])
    return <SupportingPage page={supportPages[key]} slug={key} />;
  if (key === "products") return <ProductsPage />;
  if (key === "request-diagnostic") return <Inquiry kind="diagnostic" />;
  if (key === "request-demo") return <Inquiry kind="demo" />;
  if (key === "contact") return <Inquiry kind="contact" />;
  if (key === "demo")
    return (
      <section className="demo-page">
        <div className="container">
          <div className="demo-page-heading">
            <div>
              <Eyebrow>Interactive concept / Synthetic records</Eyebrow>
              <h1>A difference you can inspect.</h1>
            </div>
            <p>
              All records, people and outcomes are fictional. No live bank
              connection, payment execution or ERP writes.
            </p>
          </div>
          <TreasuryDemo />
        </div>
      </section>
    );
  if (key === "sign-in")
    return (
      <section className="access-page">
        <div className="access-card">
          <img
            className="rise"
            src="/brand/logo/symbol-ink.svg"
            alt="CashVariance symbol"
          />
          <Eyebrow>Concept preview access</Eyebrow>
          <h1>
            Clarity starts
            <br />
            with a closer look.
          </h1>
          <p>
            Customer accounts are not available. Explore the synthetic workflow
            without entering credentials.
          </p>
          <Button href="/demo">Enter synthetic demo</Button>
          <Link href="/request-demo" className="text-link">
            Request a guided walkthrough ↗
          </Link>
          <p className="small-note">
            No credentials collected · No production sign-in
          </p>
        </div>
      </section>
    );
  notFound();
}
