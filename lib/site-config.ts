/**
 * Source de vérité unique pour les données de l'établissement.
 *
 * Toute donnée NAP (Nom, Adresse, Téléphone), horaire, ou identifiant légal
 * affichée sur le site doit dériver de ce fichier. Toute incohérence avec la
 * fiche Google Business Profile est une régression — l'audit a identifié la
 * cohérence NAP comme un signal SEO local critique.
 *
 * Quand le contenu est éditable par le client (horaires saisonniers, etc.),
 * on l'expose via la collection `siteSettings` de TinaCMS et on garde ici les
 * valeurs par défaut + structures statiques (SIREN, hébergeur…).
 */

export type OpeningHours =
  | { day: string; closed: true }
  | {
      day: string;
      opens: string;
      closes: string;
      reopens?: string;
      closesEvening?: string;
    };

export const siteConfig = {
  name: "Salute!",
  legalName: "Salute! SAS",
  tagline: "Épicerie italienne & Traiteur à Villejuif",
  description:
    "Épicerie italienne, charcuterie, fromages, pâtes fraîches, focaccia, pizza al taglio et plateaux traiteur — à Villejuif (94800).",

  // URL de démo (GitHub Pages). À remplacer par https://salute-villejuif.fr en prod.
  url: "https://alexandrematencio.github.io/salute-v1",
  locale: "fr_FR",
  language: "fr",

  // NAP — doit être byte-identique partout sur le site et sur la fiche Google
  nap: {
    name: "Salute!",
    street: "59 rue Jean-Jaurès",
    postalCode: "94800",
    city: "Villejuif",
    region: "Île-de-France",
    country: "France",
    countryCode: "FR",
    phone: "+33 1 46 58 21 04",
    phoneE164: "+33146582104",
    email: "contact@salute-villejuif.fr", // À confirmer avec le client avant lancement
  },

  // Coordonnées géographiques (approximatives — à valider via Google Maps)
  geo: {
    latitude: 48.7912,
    longitude: 2.3582,
  },

  // Horaires d'ouverture (depuis Google Business Profile au moment de l'audit)
  // Format ISO pour openingHoursSpecification JSON-LD
  openingHours: [
    { day: "Monday", closed: true },
    { day: "Tuesday", opens: "10:00", closes: "14:00", reopens: "15:30", closesEvening: "19:30" },
    { day: "Wednesday", opens: "10:00", closes: "14:00", reopens: "15:30", closesEvening: "19:30" },
    { day: "Thursday", opens: "10:00", closes: "14:00", reopens: "15:30", closesEvening: "19:30" },
    { day: "Friday", opens: "10:00", closes: "14:00", reopens: "15:30", closesEvening: "19:30" },
    { day: "Saturday", opens: "10:00", closes: "19:30" },
    { day: "Sunday", closed: true },
  ] as OpeningHours[],

  socials: {
    facebook: "https://www.facebook.com/profile.php?id=100075890296345",
    instagram: "https://www.instagram.com/salute.villejuif/",
    tiktok: "https://www.tiktok.com/@salutevillejuif", // À activer (recommandation audit priorité 5)
    googleBusiness:
      "https://www.google.com/maps/search/Salute+59+rue+Jean+Jaurès+94800+Villejuif",
  },

  // Informations légales — récupérées depuis le footer du site existant (salute-france.fr)
  // À CONFIRMER quand même avec le client avant lancement (notamment SIRET complet)
  legal: {
    siren: "899 409 320",
    siret: "À CONFIRMER", // SIRET = SIREN + 5 chiffres NIC (établissement)
    rcs: "Créteil",
    legalForm: "SAS, société par actions simplifiée",
    capital: "1 000 €",
    vatNumber: "FR 21 899409320",
    publicationDirector: "Giovanna Rizzi",
    ownerName: "Mme Giovanna Rizzi",
  },

  // Hébergeur — mention obligatoire LCEN art. 6-III
  hosting: {
    name: "Vercel Inc.",
    address: "340 S Lemon Ave #4133, Walnut, CA 91789, USA",
    phone: "+1 (559) 288-7060",
    website: "https://vercel.com",
  },

  // DPO / contact RGPD — à valider avec le client
  privacy: {
    contactEmail: "privacy@salute-villejuif.fr",
    contactPostalAddress: "Salute! SAS — 59 rue Jean-Jaurès, 94800 Villejuif",
    cnilComplaintUrl: "https://www.cnil.fr/fr/plaintes",
    policyLastUpdated: "2026-05-23",
  },

  // Sous-traitants RGPD à déclarer dans la politique de confidentialité
  // (DPA à signer avant lancement)
  dataProcessors: [
    { name: "Vercel Inc.", purpose: "Hébergement web", country: "USA (SCC)" },
    { name: "Tina Cloud", purpose: "Gestion de contenu (CMS)", country: "USA (SCC)" },
    // Ajouter le sender d'email (Resend / Postmark / etc.) et l'analytics si Matomo Cloud
  ],
} as const;

export type SiteConfig = typeof siteConfig;

// Helpers pour afficher l'adresse de manière cohérente
export const formatAddress = () =>
  `${siteConfig.nap.street}, ${siteConfig.nap.postalCode} ${siteConfig.nap.city}, ${siteConfig.nap.country}`;

export const formatAddressOneLine = () =>
  `${siteConfig.nap.street}, ${siteConfig.nap.postalCode} ${siteConfig.nap.city}`;

export const telLink = `tel:${siteConfig.nap.phoneE164}`;
export const mailtoLink = `mailto:${siteConfig.nap.email}`;

/** Formate un jour d'ouverture en string lisible — gère la pause déjeuner. */
export function formatOpeningHours(day: OpeningHours): string {
  if ("closed" in day) return "Fermé";
  if (day.reopens && day.closesEvening) {
    return `${day.opens}–${day.closes} · ${day.reopens}–${day.closesEvening}`;
  }
  return `${day.opens}–${day.closes}`;
}

export function frenchDay(day: string): string {
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
