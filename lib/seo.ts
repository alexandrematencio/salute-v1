import type { Metadata } from "next";
import { siteConfig, formatAddressOneLine } from "./site-config";

/**
 * Builds Next.js Metadata for a page. Use this in every `generateMetadata` /
 * `metadata` export so we don't drift on title / OG / canonical conventions.
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  image,
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  image?: { url: string; width?: number; height?: number; alt?: string };
  noIndex?: boolean;
}): Metadata {
  const url = `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
  const og = image ?? {
    url: `${siteConfig.url}/og/default.jpg`,
    width: 1200,
    height: 630,
    alt: `${siteConfig.name} — ${siteConfig.tagline}`,
  };

  return {
    title: `${title} | ${siteConfig.name} — ${siteConfig.tagline}`,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: og.url,
          width: og.width ?? 1200,
          height: og.height ?? 630,
          alt: og.alt ?? title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [og.url],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true, maxImagePreview: "large" } },
  };
}

// ──────────────────────────────────────────────────────────────────────────────
// JSON-LD builders. Render via <Script type="application/ld+json"> in pages.
// Validation: https://validator.schema.org/  + https://search.google.com/test/rich-results
// ──────────────────────────────────────────────────────────────────────────────

/**
 * FoodEstablishment schema for the homepage. Extends LocalBusiness with
 * restaurant/deli-specific fields. The audit identified the absence of
 * structured data as a critical SEO gap — this is the fix.
 */
export function foodEstablishmentJsonLd() {
  const openingHours = siteConfig.openingHours
    .filter((d): d is Extract<typeof d, { opens: string }> => !("closed" in d) || !d.closed)
    .flatMap((d) => {
      const ranges = [{ opens: d.opens, closes: d.closes }];
      if ("reopens" in d && d.reopens && d.closesEvening) {
        ranges.push({ opens: d.reopens, closes: d.closesEvening });
      }
      return ranges.map((r) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${d.day}`,
        opens: r.opens,
        closes: r.closes,
      }));
    });

  return {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    alternateName: "Salute Villejuif",
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.nap.phone,
    email: siteConfig.nap.email,
    image: [`${siteConfig.url}/og/default.jpg`],
    priceRange: "€€",
    servesCuisine: "Italian",
    paymentAccepted: "Cash, Credit Card, Debit Card, Contactless",
    currenciesAccepted: "EUR",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.nap.street,
      postalCode: siteConfig.nap.postalCode,
      addressLocality: siteConfig.nap.city,
      addressRegion: siteConfig.nap.region,
      addressCountry: siteConfig.nap.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHoursSpecification: openingHours,
    sameAs: [
      siteConfig.socials.facebook,
      siteConfig.socials.instagram,
      siteConfig.socials.googleBusiness,
    ].filter(Boolean),
    hasMap: siteConfig.socials.googleBusiness,
    areaServed: [
      { "@type": "City", name: "Villejuif" },
      { "@type": "City", name: "Le Kremlin-Bicêtre" },
      { "@type": "City", name: "L'Haÿ-les-Roses" },
      { "@type": "City", name: "Cachan" },
      { "@type": "City", name: "Arcueil" },
      { "@type": "City", name: "Vitry-sur-Seine" },
    ],
  };
}

/** BreadcrumbList — required on every non-home page for rich results. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

/** Helper to embed JSON-LD as a script string. */
export function jsonLdScript(data: unknown) {
  // Escape `</script>` to prevent XSS via injected content
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export const description = formatAddressOneLine;
