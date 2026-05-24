import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buildMetadata, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Traiteur italien à Villejuif — Plateaux, buffets, événements",
  description:
    "Service traiteur italien à Villejuif et Val-de-Marne : plateaux apéritifs, buffets, traiteur entreprise et événements gourmands sur devis. Salute! vous accompagne.",
  path: "/traiteur",
});

const breadcrumbs = [
  { name: "Accueil", path: "/" },
  { name: "Traiteur", path: "/traiteur" },
];

const services = [
  {
    id: "formules",
    title: "Formules déjeuner",
    image: "/images/products/pizza-al-taglio.jpg",
    alt: "Formule déjeuner italienne — pizza al taglio et plats du jour",
    desc: "Pizza al taglio à la coupe, pâtes fraîches du jour, plats traiteur chauds ou froids. Idéal pour la pause déjeuner, à emporter ou sur place.",
    points: ["Pâtes fraîches faites maison", "Pizza al taglio à la romaine", "Plat du jour à emporter"],
  },
  {
    id: "evenements",
    title: "Vos événements gourmands",
    image: "/images/products/traiteur.jpg",
    alt: "Préparations traiteur italiennes pour événements — lasagne, risotto",
    desc: "Mariages, anniversaires, repas d'entreprise, cocktails : nous adaptons nos préparations à votre événement, pour 10 ou 200 convives.",
    points: ["Devis personnalisé sous 48h", "Préparations chaudes & froides", "Livraison locale possible"],
  },
  {
    id: "plateaux",
    title: "Plateaux apéritifs",
    image: "/images/products/plateau-aperitif.jpg",
    alt: "Plateau apéritif italien — charcuterie, fromages, antipasti, focaccia",
    desc: "Plateaux à partager généreusement garnis : charcuterie de Gombitelli, fromages affinés, antipasti, focaccia. Sur commande 48h à l'avance.",
    points: ["Charcuterie & fromages", "Antipasti & légumes grillés", "Focaccia et pain frais"],
  },
];

export default function TraiteurPage() {
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
            <li aria-current="page">Traiteur</li>
          </ol>
        </nav>

        <header className="mt-6">
          <p className="font-display text-sm uppercase tracking-[0.2em] text-salute-terracotta">
            Traiteur italien
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Vos événements, à l'italienne
          </h1>
          <p className="mt-4 max-w-prose text-lg leading-relaxed">
            De la pause déjeuner aux grandes tablées, Salute! met l'authenticité italienne au
            service de vos moments gourmands. Plateaux apéritifs, buffets, traiteur entreprise —
            tout est préparé maison et sur mesure.
          </p>
        </header>

        <div className="mt-12 space-y-16">
          {services.map((s, idx) => (
            <section key={s.id} id={s.id} className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div className={`order-2 ${idx % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className={`order-1 ${idx % 2 === 1 ? "lg:order-2" : "lg:order-1"}`}>
                <h2 className="font-display text-3xl font-semibold">{s.title}</h2>
                <p className="mt-4 text-base leading-relaxed">{s.desc}</p>
                <ul className="mt-6 space-y-2 text-base">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span aria-hidden className="text-salute-terracotta">→</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link
                    href="/contact?sujet=devis"
                    className="touch-target inline-flex items-center rounded-md bg-salute-green px-5 py-3 text-sm font-medium text-salute-cream hover:opacity-90"
                  >
                    Demander un devis →
                  </Link>
                </div>
              </div>
            </section>
          ))}
        </div>

        <aside className="mt-16 rounded-2xl bg-salute-terracotta p-8 text-salute-cream sm:p-12">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            Un projet d'événement&nbsp;?
          </h2>
          <p className="mt-4 max-w-prose text-base leading-relaxed">
            Parlez-nous de votre projet : date, nombre de convives, budget indicatif. Nous vous
            répondons avec un devis personnalisé sous 48 heures.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact?sujet=devis"
              className="touch-target inline-flex items-center rounded-md bg-salute-cream px-5 py-3 text-sm font-medium text-salute-ink hover:opacity-90"
            >
              Formulaire de devis
            </Link>
            <a
              href="tel:+33146582104"
              className="touch-target inline-flex items-center rounded-md border border-salute-cream px-5 py-3 text-sm font-medium hover:bg-salute-cream hover:text-salute-ink"
            >
              Appeler 01 46 58 21 04
            </a>
          </div>
        </aside>
      </article>
    </>
  );
}
