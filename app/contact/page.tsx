import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";
import { siteConfig, formatAddressOneLine, telLink, mailtoLink, formatOpeningHours, frenchDay } from "@/lib/site-config";
import { ContactForm } from "@/components/ContactForm";
import { MapEmbed } from "@/components/MapEmbed";

export const metadata: Metadata = buildMetadata({
  title: "Contact & accès — Salute! Villejuif",
  description:
    "Contactez Salute!, épicerie italienne et traiteur à Villejuif (94800). Horaires, plan d'accès, demande de devis traiteur et formulaire de contact.",
  path: "/contact",
});

const breadcrumbs = [
  { name: "Accueil", path: "/" },
  { name: "Contact", path: "/contact" },
];

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd(breadcrumbs)) }}
      />

      <article className="mx-auto max-w-6xl px-4 py-12">
        <nav aria-label="Fil d'Ariane" className="text-sm opacity-70">
          <ol className="flex gap-2">
            <li><Link href="/" className="hover:underline">Accueil</Link></li>
            <li aria-hidden>/</li>
            <li aria-current="page">Contact</li>
          </ol>
        </nav>

        <header className="mt-6">
          <p className="font-display text-sm uppercase tracking-[0.2em] text-salute-terracotta">
            Contact &amp; accès
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Contactez-nous&nbsp;!
          </h1>
          <p className="mt-4 max-w-prose text-lg leading-relaxed">
            Question, demande de devis traiteur, ou simple envie de nous dire bonjour : nous serons
            ravis de vous lire.
          </p>
        </header>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          {/* Coordonnées + horaires */}
          <aside className="space-y-8">
            <section>
              <h2 className="font-display text-xl font-semibold">Boutique</h2>
              <address className="mt-3 not-italic leading-relaxed">
                {formatAddressOneLine()}
                <br />
                <a href={telLink} className="hover:underline">{siteConfig.nap.phone}</a>
                <br />
                <a href={mailtoLink} className="hover:underline">{siteConfig.nap.email}</a>
              </address>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold">Horaires d'ouverture</h2>
              <dl className="mt-3 space-y-1 text-sm">
                {siteConfig.openingHours.map((d) => (
                  <div key={d.day} className="flex gap-4">
                    <dt className="w-24 font-medium">{frenchDay(d.day)}</dt>
                    <dd>{formatOpeningHours(d)}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold">Accès</h2>
              <p className="mt-3 text-sm leading-relaxed">
                Métro ligne 7, station <strong>Villejuif – Léo Lagrange</strong> · à 5 min à pied.
                <br />
                Bus 162, 172, 185, 285 — arrêt Jean-Jaurès.
              </p>
            </section>

            <MapEmbed />
          </aside>

          {/* Formulaire */}
          <ContactForm />
        </div>
      </article>
    </>
  );
}

