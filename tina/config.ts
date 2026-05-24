import { defineConfig } from "tinacms";

/**
 * Schéma TinaCMS pour salute-villejuif.fr
 *
 * Règles d'or :
 * - Chaque collection éditable côté public porte des champs SEO obligatoires
 *   (seoTitle, seoDescription, ogImage). L'audit a montré que l'ancien site
 *   manquait de meta-données : on les rend non-optionnelles.
 * - Chaque image porte `alt`, `width`, `height` — pas juste l'URL — pour éviter
 *   le CLS et garantir l'accessibilité.
 * - Les slugs sont kebab-case, sans accent (normalisation côté hooks).
 * - Tous les libellés visibles côté public sont en français.
 */

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

// ─── Reusable field templates ────────────────────────────────────────────────

const seoFields = [
  {
    type: "string",
    name: "seoTitle",
    label: "Titre SEO (50–60 caractères)",
    required: true,
    ui: {
      validate: (value?: string) => {
        if (!value) return "Le titre SEO est obligatoire.";
        if (value.length < 30) return "Trop court — vise 50 à 60 caractères.";
        if (value.length > 65) return "Trop long — Google coupe au-delà de 60 caractères.";
      },
    },
  },
  {
    type: "string",
    name: "seoDescription",
    label: "Meta description (140–160 caractères)",
    required: true,
    ui: {
      component: "textarea",
      validate: (value?: string) => {
        if (!value) return "La meta description est obligatoire.";
        if (value.length < 120) return "Trop courte — vise 140 à 160 caractères.";
        if (value.length > 165) return "Trop longue — Google coupe au-delà de 160 caractères.";
      },
    },
  },
  {
    type: "image",
    name: "ogImage",
    label: "Image Open Graph (1200×630, < 300 Ko, photo réelle)",
    required: true,
  },
  {
    type: "string",
    name: "canonicalOverride",
    label: "URL canonique (override — optionnel)",
    description: "Ne renseigner que si cette page duplique une autre URL.",
  },
] as const;

const imageWithMetadata = {
  type: "object" as const,
  name: "image",
  label: "Image",
  fields: [
    { type: "image" as const, name: "src", label: "Fichier", required: true },
    {
      type: "string" as const,
      name: "alt",
      label: "Texte alternatif (descriptif, ≥ 5 caractères)",
      required: true,
      ui: {
        validate: (value?: string) => {
          if (!value || value.length < 5) return "Alt obligatoire, ≥ 5 caractères.";
        },
      },
    },
    { type: "number" as const, name: "width", label: "Largeur (px)" },
    { type: "number" as const, name: "height", label: "Hauteur (px)" },
    { type: "string" as const, name: "credit", label: "Crédit photo (optionnel)" },
  ],
};

// ─── Collections ─────────────────────────────────────────────────────────────

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "media",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      // ───────────────────────────────────────────────────────────────────
      // siteSettings — singleton avec NAP, horaires, infos légales
      // ───────────────────────────────────────────────────────────────────
      {
        name: "siteSettings",
        label: "Paramètres du site",
        path: "content/settings",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: "object",
            name: "nap",
            label: "NAP (Nom / Adresse / Téléphone)",
            description:
              "ATTENTION : doit être byte-identique à la fiche Google Business Profile.",
            fields: [
              { type: "string", name: "name", label: "Nom", required: true },
              { type: "string", name: "street", label: "Rue", required: true },
              { type: "string", name: "postalCode", label: "Code postal", required: true },
              { type: "string", name: "city", label: "Ville", required: true },
              { type: "string", name: "phone", label: "Téléphone (format international)", required: true },
              { type: "string", name: "email", label: "Email de contact", required: true },
            ],
          },
          {
            type: "object",
            name: "openingHours",
            label: "Horaires d'ouverture",
            list: true,
            ui: { itemProps: (item: { day?: string }) => ({ label: item?.day || "Jour" }) },
            fields: [
              {
                type: "string",
                name: "day",
                label: "Jour",
                required: true,
                options: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              },
              { type: "boolean", name: "closed", label: "Fermé" },
              { type: "string", name: "opens", label: "Ouvre (HH:MM)" },
              { type: "string", name: "closes", label: "Ferme (HH:MM)" },
              { type: "string", name: "reopens", label: "Réouvre (HH:MM, après pause déjeuner)" },
              { type: "string", name: "closesEvening", label: "Ferme soir (HH:MM)" },
            ],
          },
          {
            type: "object",
            name: "socials",
            label: "Réseaux sociaux",
            fields: [
              { type: "string", name: "facebook", label: "Facebook" },
              { type: "string", name: "instagram", label: "Instagram" },
              { type: "string", name: "tiktok", label: "TikTok" },
              { type: "string", name: "googleBusiness", label: "Fiche Google Business" },
            ],
          },
          {
            type: "object",
            name: "legal",
            label: "Informations légales (mentions légales)",
            fields: [
              { type: "string", name: "legalName", label: "Raison sociale" },
              { type: "string", name: "siren", label: "SIREN" },
              { type: "string", name: "siret", label: "SIRET" },
              { type: "string", name: "rcs", label: "RCS" },
              { type: "string", name: "legalForm", label: "Forme juridique" },
              { type: "string", name: "capital", label: "Capital social" },
              { type: "string", name: "vatNumber", label: "Numéro TVA" },
              { type: "string", name: "publicationDirector", label: "Directeur de la publication" },
            ],
          },
        ],
      },

      // ───────────────────────────────────────────────────────────────────
      // pages — pages génériques (home, à-propos, traiteur, livraison, contact)
      // ───────────────────────────────────────────────────────────────────
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        format: "mdx",
        ui: {
          router: ({ document }: { document: { _sys: { filename: string } } }) =>
            document._sys.filename === "home" ? "/" : `/${document._sys.filename}`,
          filename: {
            slugify: (values: { title?: string }) =>
              (values?.title || "")
                .toLowerCase()
                .normalize("NFD")
                .replace(/[̀-ͯ]/g, "") // strip diacritics
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, ""),
          },
        },
        fields: [
          { type: "string", name: "title", label: "Titre (H1)", required: true, isTitle: true },
          {
            type: "string",
            name: "intro",
            label: "Introduction (premier paragraphe — keyword + ville dans les 100 premiers mots)",
            ui: { component: "textarea" },
          },
          imageWithMetadata,
          { type: "rich-text", name: "body", label: "Contenu", isBody: true },
          ...seoFields,
        ],
      },

      // ───────────────────────────────────────────────────────────────────
      // menu — sections + items (formules, plateaux, produits)
      // ───────────────────────────────────────────────────────────────────
      {
        name: "menu",
        label: "Carte & Formules",
        path: "content/menu",
        format: "json",
        fields: [
          { type: "string", name: "title", label: "Nom de la section", required: true, isTitle: true },
          { type: "string", name: "description", label: "Description courte", ui: { component: "textarea" } },
          { type: "number", name: "order", label: "Ordre d'affichage" },
          {
            type: "object",
            name: "items",
            label: "Items",
            list: true,
            ui: { itemProps: (item: { name?: string }) => ({ label: item?.name || "Item" }) },
            fields: [
              { type: "string", name: "name", label: "Nom", required: true },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "number", name: "price", label: "Prix (€)" },
              {
                type: "string",
                name: "priceLabel",
                label: "Libellé prix (ex: '12 € / pers.', 'à partir de 25 €')",
              },
              {
                type: "string",
                name: "allergens",
                label: "Allergènes",
                list: true,
                options: [
                  "gluten",
                  "crustacés",
                  "œufs",
                  "poisson",
                  "arachides",
                  "soja",
                  "lait",
                  "fruits-à-coque",
                  "céleri",
                  "moutarde",
                  "sésame",
                  "sulfites",
                  "lupin",
                  "mollusques",
                ],
              },
              { type: "boolean", name: "vegetarian", label: "Végétarien" },
              { type: "boolean", name: "vegan", label: "Vegan" },
              { type: "boolean", name: "homemade", label: "Fait maison" },
              imageWithMetadata,
            ],
          },
        ],
      },

      // ───────────────────────────────────────────────────────────────────
      // events — dégustations, soirées privées, ateliers
      // ───────────────────────────────────────────────────────────────────
      {
        name: "event",
        label: "Événements",
        path: "content/events",
        format: "mdx",
        fields: [
          { type: "string", name: "title", label: "Titre", required: true, isTitle: true },
          { type: "datetime", name: "startDate", label: "Date de début", required: true },
          { type: "datetime", name: "endDate", label: "Date de fin" },
          {
            type: "string",
            name: "location",
            label: "Lieu",
            description: "Par défaut : la boutique. Préciser si autre.",
          },
          { type: "number", name: "price", label: "Prix (€) — 0 si gratuit" },
          imageWithMetadata,
          { type: "rich-text", name: "body", label: "Contenu", isBody: true },
          ...seoFields,
        ],
      },

      // ───────────────────────────────────────────────────────────────────
      // blog — articles d'actualité, recettes, focus produits
      // Recommandation audit : alimenter EAT + signaux de fraîcheur
      // ───────────────────────────────────────────────────────────────────
      {
        name: "post",
        label: "Articles (blog)",
        path: "content/posts",
        format: "mdx",
        fields: [
          { type: "string", name: "title", label: "Titre", required: true, isTitle: true },
          { type: "datetime", name: "publishedAt", label: "Date de publication", required: true },
          { type: "string", name: "excerpt", label: "Chapô (150-200 caractères)", ui: { component: "textarea" } },
          { type: "string", name: "tags", label: "Tags", list: true },
          imageWithMetadata,
          { type: "rich-text", name: "body", label: "Contenu", isBody: true },
          ...seoFields,
        ],
      },
    ],
  },
});
