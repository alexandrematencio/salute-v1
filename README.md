# Salute! — Site web

Site officiel de **Salute!**, épicerie italienne & traiteur à Villejuif (94800).
Construit avec **Next.js 15** (App Router) et **TinaCMS** (CMS headless Git-backed).

> Référence d'architecture et règles à respecter : voir `CLAUDE.md` à la racine.
> L'audit qui a motivé cette refonte est dans `../Salute Audit/audit-salute-france.md`.

## Démarrage rapide

```bash
# 1. Copier les variables d'environnement
cp .env.example .env

# 2. Installer les dépendances
npm install

# 3. Renseigner NEXT_PUBLIC_TINA_CLIENT_ID et TINA_TOKEN dans .env
#    (obtenus depuis https://app.tina.io)

# 4. Lancer le dev server (Tina + Next en parallèle)
npm run dev
```

- Site → http://localhost:3000
- Admin Tina → http://localhost:3000/admin

## Stack

| Couche       | Outil                                              |
|--------------|----------------------------------------------------|
| Framework    | Next.js 15 (App Router, React 19, Server Components) |
| Langage      | TypeScript                                         |
| Styling      | Tailwind CSS                                       |
| CMS          | TinaCMS (Git-backed, Visual Editor)                |
| Hébergement  | Vercel                                             |
| Validation   | zod (formulaires + Server Actions)                 |

## Structure

```
app/                      # Routes App Router
  layout.tsx              # Layout racine (lang fr, fonts, JSON-LD, header/footer, cookie banner)
  page.tsx                # Page d'accueil
  globals.css             # Styles globaux + tokens design
  sitemap.ts              # Sitemap XML dynamique
  robots.ts               # robots.txt
  not-found.tsx           # 404 propre (vrai status 404)
  mentions-legales/       # Mentions légales (LCEN art. 6-III)
  politique-de-confidentialite/  # Politique RGPD
  cookies/                # Page cookies (CNIL)
components/               # Composants partagés
  Header.tsx              # Navigation principale
  Footer.tsx              # Footer avec NAP + liens RGPD
  CookieBanner.tsx        # Bannière cookies CNIL-compliant
  OpenNowIndicator.tsx    # Indicateur "Ouvert maintenant"
  ManageCookiesLink.tsx   # Lien "Gérer mes cookies" (footer)
lib/
  site-config.ts          # Source de vérité : NAP, horaires, infos légales
  seo.ts                  # Helpers Metadata + JSON-LD
tina/
  config.ts               # Schéma CMS (collections + champs SEO obligatoires)
content/                  # Contenu géré par Tina (généré au premier run)
  settings/
  pages/
  menu/
  events/
  posts/
middleware.ts             # noindex sur /draft, normalisations
next.config.ts            # En-têtes de sécurité, images, redirections
```

## Règles de contribution

Toutes les règles techniques, SEO, UX-2026 et RGPD sont dans **`CLAUDE.md`**.
À lire avant toute modification.

Points critiques :

- **NAP byte-identique** partout (source de vérité : `lib/site-config.ts`).
- **Pas de tracker tiers** avant consentement utilisateur (CNIL).
- **Mentions légales** obligatoires en France (LCEN art. 6-III).
- **next/image** systématiquement (pas de `<img>` brut).
- **next/font** auto-hébergé (pas de fuite IP vers Google).
- **Tina** : chaque collection a ses champs SEO (`seoTitle`, `seoDescription`, `ogImage`) obligatoires.

## Vérifications avant déploiement

Voir la checklist complète en §10 du `CLAUDE.md`. En résumé :

- [ ] `npm run build` passe sans erreur
- [ ] `npm run typecheck` propre
- [ ] Lighthouse mobile ≥ 90 (Performance / A11y / Best Practices / SEO)
- [ ] axe DevTools : 0 violation critique / sérieuse
- [ ] Validator schema.org passe pour la home + une page intérieure
- [ ] Cookies refusés → 0 requête tierce dans l'onglet Réseau
- [ ] NAP identique en pied de page et sur Google Business

## À faire avant lancement (TODO client)

- [ ] Confirmer SIRET (SIREN + 5 chiffres NIC)
- [ ] Confirmer capital social et numéro de TVA intracom
- [ ] Créer la boîte mail `contact@salute-villejuif.fr` et `privacy@salute-villejuif.fr`
- [ ] Signer les DPA (Vercel, Tina Cloud, sender email, analytics)
- [ ] Valider la charte graphique (couleurs actuelles = placeholders dans `tailwind.config.ts`)
- [ ] Fournir les vraies photos (l'audit recommande un shooting pro — 30+ photos minimum)
- [ ] Choisir l'outil analytics (Matomo / Plausible / Vercel Analytics — voir `.env.example`)
- [ ] Activer la fiche TripAdvisor (quick win audit n°1)
- [ ] Migrer/rediriger l'ancien domaine `salute-france.fr` → `salute-villejuif.fr`
