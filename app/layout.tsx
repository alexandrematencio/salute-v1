import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import { foodEstablishmentJsonLd, jsonLdScript } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import "./globals.css";

/**
 * next/font auto-héberge les polices Google sans requête vers Google côté client
 * — clé pour éviter de fuiter l'IP utilisateur avant consentement (RGPD).
 */
const fontDisplay = Fraunces({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-display",
  preload: true,
});

const fontSans = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-sans",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.legal.ownerName }],
  generator: "Next.js",
  keywords: [
    "épicerie italienne Villejuif",
    "traiteur italien 94800",
    "charcuterie italienne",
    "fromages italiens",
    "pâtes fraîches Villejuif",
    "pizza al taglio",
    "plateaux traiteur Val-de-Marne",
    "épicerie fine italienne",
  ],
  alternates: { canonical: siteConfig.url },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}/og/default.jpg`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, maxImagePreview: "large", maxSnippet: -1 },
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBF6EC" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1814" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={siteConfig.language} className={`${fontDisplay.variable} ${fontSans.variable}`}>
      <body>
        {/* Skip link — premier élément focusable, WCAG 2.4.1 */}
        <a href="#main" className="skip-to-content">
          Aller au contenu principal
        </a>

        {/* JSON-LD FoodEstablishment — corrige le gap "schema markup absent" identifié dans l'audit */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(foodEstablishmentJsonLd()) }}
        />

        <Header />
        <main id="main">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
