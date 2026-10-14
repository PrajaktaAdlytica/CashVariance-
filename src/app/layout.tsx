import { RouteEvents } from "@/components/Analytics";
import type { Metadata } from "next";
import "./globals.css";
import { MotionProvider } from "@/components/Primitives";
import { Header, Footer } from "@/components/Shell";
export const metadata: Metadata = {
  title: {
    default: "CashVariance — Explain the difference",
    template: "%s | CashVariance",
  },
  description:
    "A proposed treasury review workspace for daily bank-to-GL exceptions, dated evidence and human decisions. Explore the synthetic concept.",
  icons: {
    icon: [
      { url: "/brand/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/favicon/favicon-32.png", sizes: "32x32" },
    ],
    apple: "/brand/favicon/apple-touch-icon.png",
  },
  robots: { index: false, follow: false },
  metadataBase: new URL(
    "https://cashvariance-preview.artfullarch32.chatgpt.site",
  ),
  openGraph: {
    title: "CashVariance — Explain the difference",
    description: "Treasury exception review. Evidence before action.",
    type: "website",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MotionProvider>
          <RouteEvents />
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
