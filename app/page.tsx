import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const metadata: Metadata = buildMetadata({
  title: "Épicerie italienne & Traiteur à Villejuif",
  description:
    "Salute! — épicerie italienne et traiteur à Villejuif (94800). Charcuterie de Gombitelli, fromages, pâtes fraîches, focaccia, pizza al taglio et plateaux apéritifs pour vos événements.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-salute-cream dark:bg-salute-ink">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="font-display text-sm uppercase tracking-[0.2em] text-salute-terracotta">
              Bienvenue chez Salute!
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
              Épicerie italienne <span className="italic text-salute-terracotta">&amp;</span>{" "}
              Traiteur à Villejuif
            </h1>
            <p className="mt-6 max-w-prose text-lg leading-relaxed">
              Au cœur de Villejuif (94800), {siteConfig.name} vous propose les saveurs authentiques
              de l'Italie : charcuteries fines, fromages artisanaux, antipasti gourmands, pâtes
              fraîches, focaccia croustillante, pâtisseries et vins. Nous mettons en lumière les
              trésors culinaires de la <strong>Lunigiana</strong>, une région d'exception encore
              méconnue en France.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/carte"
                className="touch-target inline-flex items-center rounded-md bg-salute-green px-5 py-3 text-sm font-medium text-salute-cream hover:opacity-90"
              >
                Découvrir nos formules
              </Link>
              <Link
                href="/traiteur"
                className="touch-target inline-flex items-center rounded-md border border-salute-ink px-5 py-3 text-sm font-medium hover:bg-salute-ink hover:text-salute-cream dark:border-salute-cream"
              >
                Plateaux &amp; événements
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl lg:aspect-[5/4]">
            <Image
              src="/images/brand/hero.png"
              alt="Devanture de Salute!, épicerie italienne et traiteur à Villejuif"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* ─── Storytelling Lunigiana ───────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-4 py-16 text-center">
        <p className="font-display text-sm uppercase tracking-[0.2em] text-salute-terracotta">
          Notre passion
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
          L'Italie au bout des doigts
        </h2>
        <p className="mx-auto mt-6 max-w-prose text-lg leading-relaxed">
          Grâce à un réseau unique de spécialistes de la gastronomie italienne, nous sélectionnons
          avec passion les meilleurs produits : <strong>charcuteries fines</strong>,{" "}
          <strong>fromages artisanaux</strong>, antipasti gourmands, pâtes fraîches, focaccia
          croustillante, épicerie fine, pâtisseries délicates, vins et spiritueux raffinés.
        </p>
        <p className="mt-4 text-base opacity-80">
          🫶 <em>Salute! a tutti e… buon appetito !</em> 🫶
        </p>
      </section>

      {/* ─── Services ─────────────────────────────────────────────────────── */}
      <section aria-labelledby="services" className="bg-salute-cream/70 py-16 dark:bg-salute-ink/40">
        <div className="mx-auto max-w-6xl px-4">
          <h2 id="services" className="font-display text-3xl font-semibold sm:text-4xl">
            Que propose notre épicerie-traiteur&nbsp;?
          </h2>
          <p className="mt-4 max-w-prose text-base leading-relaxed">
            Découvrez l'essence de la gastronomie italienne avec Salute!. De nos plateaux apéritifs
            gourmands aux préparations traiteur pour vos événements gourmands, en passant par nos
            savoureuses formules déjeuner à emporter, nous vous offrons une expérience authentique,
            alliant qualité et convivialité.
          </p>

          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                href: "/carte",
                title: "Formules déjeuner",
                desc: "Pizza al taglio, pâtes fraîches, plat du jour — à emporter ou sur place.",
                cta: "Trouvez votre formule idéale →",
              },
              {
                href: "/traiteur",
                title: "Vos événements gourmands",
                desc: "Buffets, traiteur entreprise, événements privés — sur devis personnalisé.",
                cta: "Découvrez nos options →",
              },
              {
                href: "/traiteur#plateaux",
                title: "Plateaux apéritifs",
                desc: "Plateaux à partager : charcuterie, fromages, antipasti, focaccia.",
                cta: "Découvrir nos plateaux à partager →",
              },
            ].map((s) => (
              <li key={s.title}>
                <Link
                  href={s.href}
                  className="group block h-full rounded-xl border border-salute-stone/20 bg-white p-6 transition hover:border-salute-terracotta hover:shadow-md dark:bg-salute-ink/40"
                >
                  <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed opacity-80">{s.desc}</p>
                  <p className="mt-4 text-sm font-medium text-salute-terracotta">{s.cta}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── Produits ─────────────────────────────────────────────────────── */}
      <section aria-labelledby="products" className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-display text-sm uppercase tracking-[0.2em] text-salute-terracotta">
              Notre sélection
            </p>
            <h2 id="products" className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
              Nos produits
            </h2>
          </div>
          <Link href="/epicerie" className="text-sm font-medium underline hover:text-salute-terracotta">
            Voir toute l'épicerie →
          </Link>
        </div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 9).map((p, idx) => (
            <li key={p.slug}>
              <ProductCard product={p} priority={idx < 3} />
            </li>
          ))}
        </ul>
      </section>

      {/* ─── Témoignage ───────────────────────────────────────────────────── */}
      <section className="bg-salute-green text-salute-cream">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <blockquote className="font-display text-xl italic leading-relaxed sm:text-2xl">
            « Salute, c'est bien plus qu'une simple épicerie italienne : c'est un vrai petit coin
            d'Italie. L'équipe est toujours accueillante, souriante et passionnée, et ça se ressent
            dans la qualité exceptionnelle des produits. »
          </blockquote>
          <p className="mt-6 text-sm uppercase tracking-[0.2em] opacity-80">Avis Google Maps · ⭐ 4,9/5</p>
          <a
            href={siteConfig.socials.googleBusiness}
            rel="noopener"
            target="_blank"
            className="touch-target mt-8 inline-flex items-center rounded-md bg-salute-cream px-5 py-3 text-sm font-medium text-salute-ink hover:opacity-90"
          >
            Lire les 73 avis sur Google →
          </a>
        </div>
      </section>

      {/* ─── Visite ───────────────────────────────────────────────────────── */}
      <section aria-labelledby="visit" className="mx-auto max-w-6xl px-4 py-16">
        <h2 id="visit" className="font-display text-3xl font-semibold sm:text-4xl">
          Venir nous voir
        </h2>
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div>
            <p className="text-lg leading-relaxed">
              Retrouvez-nous au <strong>{siteConfig.nap.street}</strong>,{" "}
              {siteConfig.nap.postalCode} {siteConfig.nap.city} — à 5 minutes à pied du métro
              Villejuif-Léo Lagrange (ligne 7).
            </p>
            <dl className="mt-6 space-y-2 text-sm">
              {siteConfig.openingHours.map((d) => (
                <div key={d.day} className="flex gap-4">
                  <dt className="w-24 font-medium">{frenchDay(d.day)}</dt>
                  <dd>
                    {"closed" in d && d.closed
                      ? "Fermé"
                      : "reopens" in d && d.reopens
                        ? `${d.opens}–${d.closes} · ${d.reopens}–${d.closesEvening}`
                        : `${d.opens}–${d.closes}`}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`tel:${siteConfig.nap.phoneE164}`}
                className="touch-target inline-flex items-center rounded-md bg-salute-terracotta px-5 py-3 text-sm font-medium text-salute-cream hover:opacity-90"
              >
                Appeler {siteConfig.nap.phone}
              </a>
              <Link
                href="/contact"
                className="touch-target inline-flex items-center rounded-md border border-salute-ink px-5 py-3 text-sm font-medium hover:bg-salute-ink hover:text-salute-cream dark:border-salute-cream"
              >
                Nous écrire
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src="/images/brand/storefront.png"
              alt={`Devanture de la boutique Salute! au ${siteConfig.nap.street}`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function frenchDay(day: string): string {
  const map: Record<string, string> = {
    Monday: "Lundi",
    Tuesday: "Mardi",
    Wednesday: "Mercredi",
    Thursday: "Jeudi",
    Friday: "Vendredi",
    Saturday: "Samedi",
    Sunday: "Dimanche",
  };
  return map[day] ?? day;
}
