/**
 * Catalogue produits — démo basée sur le contenu scrapé de salute-france.fr.
 *
 * En production : remplacer cet objet statique par une lecture depuis la
 * collection `menu` (ou une collection `products` dédiée) de TinaCMS.
 */

export type Product = {
  slug: string;
  name: string;
  category:
    | "epicerie-sucree"
    | "huiles-vinaigres"
    | "cafe"
    | "pates-seches"
    | "sauces"
    | "epicerie-salee"
    | "traiteur"
    | "charcuterie"
    | "pizza"
    | "pates-fraiches"
    | "legumes"
    | "spiritueux"
    | "focaccia"
    | "plateau";
  description: string;
  image: string;
  imageAlt: string;
};

export const products: Product[] = [
  {
    slug: "epicerie-sucree",
    name: "Épicerie sucrée",
    category: "epicerie-sucree",
    description:
      "Colomba artisanale, panettoni de saison, biscuits secs et douceurs italiennes pour la pause café ou la fin de repas.",
    image: "/images/products/epicerie-sucree.jpg",
    imageAlt: "Colomba et panettoni artisanaux italiens proposés chez Salute! à Villejuif",
  },
  {
    slug: "huiles-et-vinaigres",
    name: "Huiles & vinaigres",
    category: "huiles-vinaigres",
    description:
      "Huiles d'olive extra-vierges de petits producteurs italiens, vinaigres balsamiques et de vin pour relever toutes vos préparations.",
    image: "/images/products/huiles-vinaigres.jpg",
    imageAlt: "Sélection d'huiles d'olive et vinaigres balsamiques italiens",
  },
  {
    slug: "cafe",
    name: "Le café",
    category: "cafe",
    description:
      "Cafés en grains et moulus, mélanges italiens torréfiés artisanalement pour retrouver le vrai goût de l'espresso à la maison.",
    image: "/images/products/cafe.jpg",
    imageAlt: "Café italien en grains et moulu sélectionné par Salute!",
  },
  {
    slug: "pates",
    name: "Les pâtes",
    category: "pates-seches",
    description:
      "Pâtes sèches artisanales — tréfilage au bronze, séchage lent — issues des meilleurs pastifici régionaux d'Italie.",
    image: "/images/products/pates.jpg",
    imageAlt: "Pâtes sèches artisanales italiennes tréfilées au bronze",
  },
  {
    slug: "sauces",
    name: "Les sauces",
    category: "sauces",
    description:
      "Sauces tomate, pesto à la genovese, ragù et préparations italiennes traditionnelles, prêtes à accompagner vos pâtes.",
    image: "/images/products/sauces.jpg",
    imageAlt: "Bocaux de sauces tomate, pesto et ragù italiens",
  },
  {
    slug: "epicerie-salee",
    name: "Épicerie salée",
    category: "epicerie-salee",
    description:
      "Taralli, grissini, friselle et autres incontournables salés pour l'apéritif ou un en-cas authentique.",
    image: "/images/products/taralli.jpg",
    imageAlt: "Taralli et biscuits salés italiens pour l'apéritif",
  },
  {
    slug: "traiteur",
    name: "Traiteur",
    category: "traiteur",
    description:
      "Lasagne, risotti, frittate, tiramisù — préparations chaudes et froides faites maison, à emporter ou pour vos événements.",
    image: "/images/products/traiteur.jpg",
    imageAlt: "Préparations traiteur italiennes faites maison — lasagne, risotto, tiramisù",
  },
  {
    slug: "charcuterie",
    name: "Charcuterie",
    category: "charcuterie",
    description:
      "Salamis toscans de Gombitelli, mortadella, prosciutto et autres trésors de la charcuterie italienne artisanale.",
    image: "/images/products/charcuterie.jpg",
    imageAlt: "Plateau de charcuterie italienne — salamis toscans, mortadella, jambon",
  },
  {
    slug: "pizza-al-taglio",
    name: "La pizza al taglio",
    category: "pizza",
    description:
      "Pizza à la coupe à la romaine — pâte longuement maturée, garnitures de saison, cuite sur place tous les jours.",
    image: "/images/products/pizza-al-taglio.jpg",
    imageAlt: "Pizza al taglio à la romaine cuite chez Salute!",
  },
  {
    slug: "pates-fraiches",
    name: "Pâtes fraîches",
    category: "pates-fraiches",
    description:
      "Ravioli, tagliatelle, tortelli — pâtes fraîches préparées chaque semaine selon la tradition italienne.",
    image: "/images/products/pates-fraiches.jpg",
    imageAlt: "Pâtes fraîches faites maison — ravioli, tagliatelle, tortelli",
  },
  {
    slug: "legumes-conserves-tartinables",
    name: "Légumes : conserves & tartinables",
    category: "legumes",
    description:
      "Antipasti à l'huile, légumes grillés, tartinables d'aubergine ou d'artichaut, olives — tout pour composer un buffet généreux.",
    image: "/images/products/legumes-conserves.jpg",
    imageAlt: "Légumes en conserve et tartinables italiens — antipasti, olives, tartinables",
  },
  {
    slug: "spiritueux-grappa-marsala-limoncello",
    name: "Spiritueux : Grappa, Marsala, Limoncello",
    category: "spiritueux",
    description:
      "Grappas, marsalas, limoncellos et amari italiens — la cave d'apéritifs et de digestifs pour prolonger le repas.",
    image: "/images/products/spiritueux.jpg",
    imageAlt: "Sélection de grappa, marsala et limoncello italiens",
  },
  {
    slug: "focaccia",
    name: "Les focaccia",
    category: "focaccia",
    description:
      "Focaccia ligure, croustillante et moelleuse, à l'huile d'olive et au gros sel — cuite sur place chaque jour.",
    image: "/images/products/focaccia.jpg",
    imageAlt: "Focaccia ligure croustillante cuite sur place",
  },
  {
    slug: "plateaux-aperitifs",
    name: "Plateaux apéritifs",
    category: "plateau",
    description:
      "Plateaux à partager pour vos apéritifs et événements : charcuterie, fromages, antipasti, focaccia — sur commande.",
    image: "/images/products/plateau-aperitif.jpg",
    imageAlt: "Plateau apéritif italien — charcuterie, fromages, antipasti, focaccia",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
