import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buildMetadata, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";
import { asset } from "@/lib/asset";

export const metadata: Metadata = buildMetadata({
  title: "Charcuterie italienne de Gombitelli — Salamis toscans, Mortadella",
  description:
    "Charcuterie artisanale italienne de Gombitelli (Toscane) : salamis toscans, mortadella, prosciutto. Affinage lent, recettes anciennes — disponibles chez Salute! Villejuif.",
  path: "/charcuterie",
});

const breadcrumbs = [
  { name: "Accueil", path: "/" },
  { name: "Épicerie", path: "/epicerie" },
  { name: "Charcuterie", path: "/charcuterie" },
];

export default function CharcuteriePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd(breadcrumbs)) }}
      />

      <article className="mx-auto max-w-5xl px-4 py-12">
        <nav aria-label="Fil d'Ariane" className="text-sm opacity-70">
          <ol className="flex flex-wrap gap-2">
            {breadcrumbs.map((b, i) => (
              <li key={b.path} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden>/</span>}
                {i === breadcrumbs.length - 1 ? (
                  <span aria-current="page">{b.name}</span>
                ) : (
                  <Link href={b.path} className="hover:underline">
                    {b.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <header className="mt-6">
          <p className="font-display text-sm uppercase tracking-[0.2em] text-salute-terracotta">
            Toscane · Lunigiana
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Charcuterie de Gombitelli
          </h1>
          <p className="mt-4 max-w-prose text-lg leading-relaxed">
            Salamis toscans, mortadella di Gombitelli, prosciutto — une charcuterie italienne
            artisanale rare, affinée selon des recettes anciennes, disponible chez Salute! à
            Villejuif.
          </p>
        </header>

        <figure className="mt-10 overflow-hidden rounded-2xl">
          <Image
            src={asset("/images/products/charcuterie.jpg")}
            alt="Plateau de salamis toscans de Gombitelli et mortadella italienne"
            width={1600}
            height={1000}
            className="h-auto w-full object-cover"
            priority
          />
        </figure>

        <section className="mt-12 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-semibold">
              Gombitelli, capitale toscane de la charcuterie
            </h2>
            <p className="text-base leading-relaxed">
              Sur les collines boisées de Lucca, le village de <strong>Gombitelli</strong> est un
              haut lieu de la charcuterie artisanale toscane, réputé dans toute la région pour la
              qualité et l'authenticité de ses produits.
            </p>
            <p className="text-base leading-relaxed">
              Le village bénéficie d'un microclimat particulier — entre <em>brise marine</em> et{" "}
              <em>forêts de châtaigniers</em> — qui crée des conditions optimales pour l'affinage
              lent des viandes. Les produits sont issus de <strong>porcs élevés localement</strong> et
              préparés dans le respect des anciennes traditions.
            </p>

            <h2 className="mt-10 font-display text-2xl font-semibold">Notre sélection</h2>
            <ul className="space-y-6">
              <li>
                <h3 className="font-display text-xl font-semibold">Mortadella di Gombitelli</h3>
                <p className="mt-2 text-base leading-relaxed">
                  Aussi appelée <em>salame nostrale</em> : une mortadelle locale au caractère affirmé,
                  bien différente de la mortadelle industrielle. Texture ferme, parfum profond, à
                  déguster en tranches fines à l'apéritif ou en panino.
                </p>
              </li>
              <li>
                <h3 className="font-display text-xl font-semibold">Salamis toscans</h3>
                <p className="mt-2 text-base leading-relaxed">
                  Élaborés selon des recettes anciennes, assaisonnés avec sel, poivre, herbes
                  aromatiques et parfois vin rouge, puis <strong>affinés lentement</strong> dans des
                  caves naturelles. Chaque salami développe ainsi des notes uniques.
                </p>
              </li>
            </ul>
          </div>

          <aside className="space-y-6">
            <div className="overflow-hidden rounded-xl border border-salute-stone/20">
              <Image
                src={asset("/images/charcuterie/01.jpg")}
                alt="Salami toscan affiné, tranché"
                width={576}
                height={1024}
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-xl border border-salute-stone/20">
              <Image
                src={asset("/images/charcuterie/02.jpg")}
                alt="Mortadella di Gombitelli en tranches"
                width={576}
                height={1024}
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-xl border border-salute-stone/20">
              <Image
                src={asset("/images/charcuterie/03.jpg")}
                alt="Charcuterie italienne artisanale"
                width={576}
                height={1024}
                className="h-auto w-full object-cover"
              />
            </div>
          </aside>
        </section>

        <section className="mt-16 rounded-2xl bg-salute-green p-8 text-salute-cream sm:p-12">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            Composer votre plateau
          </h2>
          <p className="mt-4 max-w-prose text-base leading-relaxed">
            Charcuterie de Gombitelli, fromages affinés, antipasti, focaccia et pain frais — venez en
            boutique composer votre plateau apéritif, ou commandez en avance pour vos événements.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/traiteur#plateaux"
              className="touch-target inline-flex items-center rounded-md bg-salute-cream px-5 py-3 text-sm font-medium text-salute-ink hover:opacity-90"
            >
              Voir les plateaux
            </Link>
            <Link
              href="/contact"
              className="touch-target inline-flex items-center rounded-md border border-salute-cream px-5 py-3 text-sm font-medium hover:bg-salute-cream hover:text-salute-ink"
            >
              Demander un devis
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
