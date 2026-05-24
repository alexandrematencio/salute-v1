import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buildMetadata, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Carte & Formules midi à Villejuif — Pizza, pâtes, plateaux",
  description:
    "Carte de Salute! à Villejuif : formules déjeuner, pizza al taglio, pâtes fraîches, focaccia, plateaux apéritifs italiens. À emporter ou sur place.",
  path: "/carte",
});

const breadcrumbs = [
  { name: "Accueil", path: "/" },
  { name: "Carte & Formules", path: "/carte" },
];

/**
 * Carte — version démo. À terme : alimentée par la collection `menu` de Tina
 * pour que le client puisse modifier libellés, prix et allergènes sans dev.
 */
const sections = [
  {
    title: "Formules midi",
    items: [
      { name: "Formule pizza al taglio", desc: "Part de pizza + boisson + dessert au choix", price: "12 €" },
      { name: "Formule pâtes fraîches", desc: "Plat de pâtes du jour + boisson + café", price: "14 €" },
      { name: "Formule italienne", desc: "Antipasti + plat chaud + dessert + café", price: "18 €" },
    ],
  },
  {
    title: "À la coupe",
    items: [
      { name: "Pizza al taglio", desc: "Part de pizza romaine, garnitures de saison", price: "à partir de 4 €" },
      { name: "Focaccia ligure", desc: "À l'huile d'olive et au gros sel", price: "à partir de 3 €" },
      { name: "Lasagne maison", desc: "Bolognaise, ragoût lent, béchamel", price: "à partir de 8 € / part" },
    ],
  },
  {
    title: "Plateaux à partager",
    items: [
      { name: "Plateau apéritif", desc: "Charcuterie, fromages, olives, focaccia (4-6 pers.)", price: "à partir de 35 €" },
      { name: "Plateau buffet", desc: "Antipasti froids et chauds, focaccia, mini-pizzas (10-12 pers.)", price: "à partir de 95 €" },
      { name: "Plateau prestige", desc: "Charcuterie de Gombitelli, fromages affinés, pâtes farcies (15-20 pers.)", price: "sur devis" },
    ],
  },
];

export default function CartePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd(breadcrumbs)) }}
      />

      <article className="mx-auto max-w-4xl px-4 py-12">
        <nav aria-label="Fil d'Ariane" className="text-sm opacity-70">
          <ol className="flex gap-2">
            <li><Link href="/" className="hover:underline">Accueil</Link></li>
            <li aria-hidden>/</li>
            <li aria-current="page">Carte &amp; Formules</li>
          </ol>
        </nav>

        <header className="mt-6">
          <p className="font-display text-sm uppercase tracking-[0.2em] text-salute-terracotta">
            Carte &amp; formules
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Nos formules midi &amp; à emporter
          </h1>
          <p className="mt-4 max-w-prose text-lg leading-relaxed">
            Du déjeuner sur le pouce aux plateaux pour vos événements, voici ce que vous pouvez
            commander chez nous. La carte évolue chaque semaine au gré des arrivages.
          </p>
          <p className="mt-3 text-sm opacity-70">
            Les prix indiqués sont des prix indicatifs susceptibles d'évoluer — confirmation en boutique.
          </p>
        </header>

        <figure className="mt-10 overflow-hidden rounded-2xl">
          <Image
            src="/images/products/pizza-al-taglio.jpg"
            alt="Pizza al taglio à la romaine, cuite chez Salute!"
            width={1600}
            height={1000}
            className="h-auto w-full object-cover"
            priority
          />
        </figure>

        <div className="mt-12 space-y-12">
          {sections.map((sec) => (
            <section key={sec.title}>
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">{sec.title}</h2>
              <ul className="mt-6 divide-y divide-salute-stone/20 rounded-xl border border-salute-stone/20">
                {sec.items.map((item) => (
                  <li key={item.name} className="flex flex-col gap-2 p-5 sm:flex-row sm:items-start sm:justify-between">
                    <div className="sm:flex-1">
                      <h3 className="font-display text-lg font-semibold">{item.name}</h3>
                      <p className="mt-1 text-sm opacity-80">{item.desc}</p>
                    </div>
                    <p className="font-display text-base font-semibold text-salute-terracotta sm:ml-6 sm:whitespace-nowrap">
                      {item.price}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <aside className="mt-16 rounded-2xl bg-salute-cream p-8 dark:bg-salute-ink/40 sm:p-12">
          <h2 className="font-display text-2xl font-semibold">Allergènes &amp; régimes</h2>
          <p className="mt-3 text-base leading-relaxed">
            Les informations allergènes sont disponibles en boutique pour chaque préparation.
            N'hésitez pas à nous demander : nos plats peuvent contenir gluten, lait, œufs, fruits à
            coque, sulfites. Nous adaptons certaines préparations sur demande pour les régimes
            végétariens et sans gluten.
          </p>
        </aside>
      </article>
    </>
  );
}
