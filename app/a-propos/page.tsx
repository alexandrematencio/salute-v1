import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buildMetadata, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Notre histoire — Une passion italienne à Villejuif",
  description:
    "Salute! est une épicerie italienne familiale à Villejuif. Découvrez notre passion pour la gastronomie italienne et les trésors de la Lunigiana.",
  path: "/a-propos",
});

const breadcrumbs = [
  { name: "Accueil", path: "/" },
  { name: "Notre histoire", path: "/a-propos" },
];

export default function AProposPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd(breadcrumbs)) }}
      />

      <article className="mx-auto max-w-4xl px-4 py-12">
        <nav aria-label="Fil d'Ariane" className="text-sm opacity-70">
          <ol className="flex gap-2">
            <li>
              <Link href="/" className="hover:underline">Accueil</Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page">Notre histoire</li>
          </ol>
        </nav>

        <header className="mt-6">
          <p className="font-display text-sm uppercase tracking-[0.2em] text-salute-terracotta">
            Notre histoire
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Une passion italienne au cœur de Villejuif
          </h1>
        </header>

        <figure className="mt-10 overflow-hidden rounded-2xl">
          <Image
            src="/images/brand/storefront.png"
            alt="La devanture de Salute! au 59 rue Jean-Jaurès à Villejuif"
            width={1600}
            height={1000}
            className="h-auto w-full object-cover"
            priority
          />
        </figure>

        <section className="mt-12 space-y-6 text-lg leading-relaxed">
          <p>
            Bienvenue chez <strong>{siteConfig.name}</strong>, votre épicerie dédiée aux saveurs
            authentiques de l'Italie. Au {siteConfig.nap.street}, nous partageons depuis Villejuif
            notre amour pour la cuisine italienne, ses traditions et ses producteurs.
          </p>
          <p>
            Grâce à un réseau unique de spécialistes de la gastronomie italienne, nous
            sélectionnons avec passion les meilleurs produits : <strong>charcuteries fines</strong>,{" "}
            <strong>fromages artisanaux</strong>, antipasti gourmands, pâtes fraîches, focaccia
            croustillante, épicerie fine, pâtisseries délicates, vins et spiritueux raffinés.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            La Lunigiana, notre fil rouge
          </h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed">
            <p>
              Nous mettons tout particulièrement en lumière les trésors culinaires de la{" "}
              <strong>Lunigiana</strong>, une région aux produits d'exception, pourtant méconnue en
              France. Située entre la Toscane et la Ligurie, blottie entre Apennins et mer
              Tyrrhénienne, c'est une terre de châtaigneraies, de pâturages et de villages perchés
              où la gastronomie se transmet de génération en génération.
            </p>
            <p>
              De Gombitelli — capitale toscane de la charcuterie artisanale — aux pâtes fraîches
              de Pontremoli en passant par les vins du Colli di Luni, chaque produit que nous
              choisissons raconte un terroir, un savoir-faire, et l'histoire d'un producteur que
              nous connaissons personnellement.
            </p>
            <p className="font-display text-xl italic text-salute-terracotta">
              🫶 Salute! a tutti e… buon appetito ! 🫶
            </p>
          </div>
        </section>

        <section className="mt-16 grid gap-8 rounded-2xl bg-salute-cream p-8 dark:bg-salute-ink/40 sm:grid-cols-2 sm:p-12">
          <div>
            <h2 className="font-display text-2xl font-semibold">Venir nous rencontrer</h2>
            <address className="mt-4 not-italic text-base leading-relaxed">
              {siteConfig.nap.street}
              <br />
              {siteConfig.nap.postalCode} {siteConfig.nap.city}
              <br />
              {siteConfig.nap.phone}
            </address>
          </div>
          <div className="flex flex-col gap-3 sm:items-end sm:justify-center">
            <Link
              href="/contact"
              className="touch-target inline-flex items-center justify-center rounded-md bg-salute-green px-5 py-3 text-sm font-medium text-salute-cream hover:opacity-90"
            >
              Nous écrire
            </Link>
            <Link
              href="/epicerie"
              className="touch-target inline-flex items-center justify-center rounded-md border border-salute-ink px-5 py-3 text-sm font-medium hover:bg-salute-ink hover:text-salute-cream dark:border-salute-cream"
            >
              Découvrir nos produits
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
