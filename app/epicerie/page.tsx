import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const metadata: Metadata = buildMetadata({
  title: "Épicerie fine italienne à Villejuif — Charcuterie, pâtes, vins",
  description:
    "Toute l'épicerie fine italienne de Salute! à Villejuif : charcuterie, fromages, pâtes fraîches et sèches, sauces, huiles, vins, spiritueux, focaccia, pâtisseries.",
  path: "/epicerie",
});

const breadcrumbs = [
  { name: "Accueil", path: "/" },
  { name: "Épicerie", path: "/epicerie" },
];

export default function EpiceriePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd(breadcrumbs)) }}
      />

      <article className="mx-auto max-w-6xl px-4 py-12">
        <nav aria-label="Fil d'Ariane" className="text-sm opacity-70">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link href="/" className="hover:underline">
                Accueil
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page">Épicerie</li>
          </ol>
        </nav>

        <header className="mt-6">
          <p className="font-display text-sm uppercase tracking-[0.2em] text-salute-terracotta">
            Épicerie fine italienne
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Notre épicerie italienne à Villejuif
          </h1>
          <p className="mt-4 max-w-prose text-lg leading-relaxed">
            Une sélection passionnée des meilleurs produits italiens, des classiques aux trésors
            méconnus de la Lunigiana. À retrouver en boutique au {" "}
            <strong>59 rue Jean-Jaurès, 94800 Villejuif</strong>.
          </p>
        </header>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, idx) => (
            <li key={p.slug}>
              <ProductCard product={p} priority={idx < 3} />
            </li>
          ))}
        </ul>

        <aside className="mt-16 rounded-2xl border border-salute-stone/20 bg-salute-cream p-8 dark:bg-salute-ink/40 sm:p-12">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            Un produit en particulier&nbsp;?
          </h2>
          <p className="mt-3 max-w-prose text-base leading-relaxed">
            Notre catalogue évolue chaque semaine au gré des arrivages. Passez en boutique ou
            appelez-nous, nous vous conseillerons avec plaisir.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="tel:+33146582104"
              className="touch-target inline-flex items-center rounded-md bg-salute-terracotta px-5 py-3 text-sm font-medium text-salute-cream hover:opacity-90"
            >
              Appeler la boutique
            </a>
            <Link
              href="/contact"
              className="touch-target inline-flex items-center rounded-md border border-salute-ink px-5 py-3 text-sm font-medium hover:bg-salute-ink hover:text-salute-cream dark:border-salute-cream"
            >
              Nous écrire
            </Link>
          </div>
        </aside>
      </article>
    </>
  );
}
