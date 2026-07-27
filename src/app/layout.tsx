import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import { site } from "@/content/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Cormorant Garamond — the face used in the Duke & Lume wordmark, so headings
// and the logo read as one system. Wider and calmer than the previous
// Instrument Serif, which was narrow enough to look vertically stretched.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dukelume.com"),
  title: {
    default: "Duke&Lume — Digital Art Gallery",
    template: "%s — Duke&Lume",
  },
  description: site.siteDescription,
  openGraph: {
    title: "Duke&Lume — Digital Art Gallery",
    description: site.siteDescription,
    type: "website",
    siteName: "Duke&Lume",
  },
  twitter: {
    card: "summary_large_image",
    title: "Duke&Lume — Digital Art Gallery",
    description: site.siteDescription,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
        <body>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-[var(--color-surface)] focus:px-4 focus:py-2 focus:type-micro"
          >
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </body>
      </html>
    </ViewTransitions>
  );
}
