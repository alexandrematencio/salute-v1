# CLAUDE.md — salute-villejuif.fr

Operating manual for Claude Code on the Salute! website. **Every rule here is a
hard constraint.** Do not regress any item without first asking the user.

---

## 0. Project context

- **Business:** Salute! — Italian deli & traiteur, 59 rue Jean-Jaurès, 94800
  Villejuif, France. Owner: see `business-context.json` in the parent folder.
- **Audit reference:** `../Salute Audit/audit-salute-france.md` — the deficiencies
  documented there are what this website must solve. Re-read it before building
  any major page so the work addresses real gaps, not generic best practices.
- **Stack:** Next.js 15 (App Router, Server Components by default) + TinaCMS
  (Git-backed headless CMS) + TypeScript + Tailwind CSS.
- **Deployment:** Vercel.
- **Primary language:** French (`fr-FR`). Mixed-language English subheadings are
  not used on the public site — they only appear in the audit deliverable.
- **Target audience:** local residents within ~3 km of Villejuif + walk-ins +
  online order / pre-order customers.

---

## 1. Non-negotiable invariants (run-before-merge checklist)

Verify each item before declaring any page complete. If you cannot satisfy one,
stop and surface it to the user — do not ship.

### SEO
- [ ] Exactly one `<h1>` per page, primary keyword near the start.
- [ ] Strict heading nesting (`h1 → h2 → h3`), no level skips.
- [ ] Unique `<title>` (50–60 chars) and `<meta description>` (140–160 chars) per route.
- [ ] Canonical tag absolute, present on every route.
- [ ] `lang="fr"` on `<html>`.
- [ ] Every `<img>` has descriptive `alt` (empty `alt=""` only for decoration).
- [ ] JSON-LD validates against schema.org.
- [ ] Sitemap.xml + robots.txt generated; sitemap referenced in robots.txt.

### Performance (Core Web Vitals — Vercel will measure these in production)
- [ ] LCP ≤ 2.5 s on mobile (Slow 4G throttling).
- [ ] INP ≤ 200 ms.
- [ ] CLS ≤ 0.1.
- [ ] Lighthouse mobile ≥ 90 on Performance / Accessibility / Best Practices / SEO.
- [ ] Total JS shipped to client < 150 KB gzipped on the homepage.

### UX-2026
- [ ] WCAG 2.2 AA passes (axe DevTools, no critical violations).
- [ ] Keyboard-navigable end-to-end, visible focus ring on every interactive element.
- [ ] Reduced-motion media query respected (no parallax/auto-play for those users).
- [ ] Dark-mode theme implemented and equally polished.
- [ ] Loading, empty, and error states implemented for every async surface.
- [ ] Touch targets ≥ 44×44 px on mobile.

### RGPD
- [ ] Cookie banner: CNIL-compliant (see §6). No tracker fires before consent.
- [ ] `/mentions-legales` and `/politique-de-confidentialite` pages exist and
      are linked in the footer.
- [ ] All forms have an unchecked consent box and a privacy-policy link.
- [ ] No third-party request leaves the browser before consent, except those
      strictly necessary (auth session, CSRF) — verified in the Network tab.

---

## 2. Next.js 15 conventions for this project

### Routing & rendering
- App Router only. No `pages/` directory.
- Server Components by default. Add `"use client"` only where browser APIs,
  event handlers, or React state are genuinely required.
- Use `loading.tsx` for route-level Suspense skeletons.
- Use `error.tsx` + `global-error.tsx` for graceful failure.
- Use `not-found.tsx` returning a real 404 (no soft 404s).

### Metadata API
Every route exports `generateMetadata` (or static `metadata`) — never inject
`<title>` / `<meta>` manually in JSX.

```ts
import type { Metadata } from "next";

export async function generateMetadata({ params }): Promise<Metadata> {
  const page = await getPage(params.slug);
  return {
    title: `${page.title} | Salute! Traiteur italien Villejuif`,
    description: page.seoDescription,
    alternates: { canonical: `https://salute-villejuif.fr/${page.slug}` },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      url: `https://salute-villejuif.fr/${page.slug}`,
      title: page.title,
      description: page.seoDescription,
      images: [{ url: page.ogImage, width: 1200, height: 630 }],
      siteName: "Salute!",
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
  };
}
```

### Sitemap & robots
- `app/sitemap.ts` — generate from TinaCMS content at build/ISR time. Include
  `lastModified` from the file's git commit date or Tina frontmatter.
- `app/robots.ts` — allow everything except `/admin`, `/api/private/*`, `/draft/*`.
- Do **not** put `robots.txt` or `sitemap.xml` as static files — use the
  Metadata API so they regenerate when content changes.

### Images
- Always use `next/image`. Never raw `<img>` for product/photo content.
- Always pass `width` + `height` (or `fill` with a sized parent).
- Set `priority` on the LCP image only.
- Default to AVIF: configure `images.formats: ["image/avif", "image/webp"]` in
  `next.config.ts`.
- For Tina-managed images, store the intrinsic dimensions in the CMS schema so
  the page can render with correct aspect ratio (prevents CLS).

### Fonts
- `next/font/google` (or self-hosted) — never `<link>` to Google Fonts in `<head>`.
- One primary + at most one display face. Subset to `latin` + `latin-ext`.
- `display: "swap"`, `preload: true` on the primary face only.

### Caching
- Default to static rendering. Use `revalidate` (ISR) for content pages tied to
  TinaCMS so editor changes propagate without redeploying.
- `revalidateTag` / `revalidatePath` from a Tina webhook on content publish.
- Never `fetch(..., { cache: "no-store" })` on a public page unless personalised.

### Server Actions
- Use Server Actions for forms (contact, newsletter, pre-order). Validate on
  the server with `zod`. Never trust client validation.
- Rate-limit form submissions (Upstash Redis or `@vercel/firewall`).
- Return typed `{ ok, errors }` responses, never throw to the client.

---

## 3. TinaCMS conventions

### Schema (`tina/config.ts`)
- **Every content collection ships SEO fields**: `seoTitle`, `seoDescription`,
  `ogImage`, `canonicalOverride?` (optional). These are required, not optional
  — enforce with `required: true` in the Tina schema.
- **Every image field stores `alt`, `width`, `height`, `credit?`** as a sibling
  object — not just the URL.
- Slugs are kebab-case, lowercase, no accents (`épicerie` → `epicerie`). Use
  a Tina `beforeSubmit` to normalise.
- All visible strings are French. Schema labels in the Tina admin can stay in
  English for the dev, but `name` and content values are FR.

### Required collections (minimum)
- `pages` — home, à-propos, contact, traiteur, épicerie, livraison.
- `menu` — sections + items (name, description, allergens, price, image, vegan/veggie tags).
- `events` — wine tastings, private dinners (with start/end dates + schema.org/Event JSON-LD).
- `blog` (optional but recommended for SEO long-tail).
- `siteSettings` — NAP, opening hours, social URLs, legal info (mentions légales fields).

### Visual editing
- Use `tinaField()` markers on every editable element so the Tina visual editor
  highlights them. Without these, content editors cannot click-to-edit.
- Test the visual editor on every new component before considering it done.

### Draft mode
- Use Next.js Draft Mode for unpublished Tina content (`/api/draft/enable`).
- Pages in draft mode must have `<meta name="robots" content="noindex,nofollow">`.
- Never expose `/draft/*` URLs publicly — gate with an HMAC token from Tina.

### Content guidelines for the editor (write these into Tina helper text)
- Title length: show character count, warn over 60.
- Meta description: show character count, warn over 160 or under 120.
- Alt text: enforced minimum 5 characters, cannot equal the filename.
- Show the canonical URL preview in the sidebar.

---

## 4. SEO standards

### URL strategy
- Lowercase, hyphenated, no accents, no trailing slash inconsistency (we use
  **no trailing slash** — enforce via `next.config.ts` redirects).
- French slugs for FR keywords (`/traiteur-italien-villejuif`,
  `/epicerie-italienne-villejuif`, `/livraison-traiteur-villejuif-94`).
- One canonical URL per piece of content. 301 redirect any change.

### Local SEO (this is a 1-km-radius business — the audit highlighted this as critical)
- NAP must be **byte-identical** everywhere on-site and match the Google
  Business Profile exactly. Source of truth: `siteSettings` in Tina.
  - Name: `Salute!`
  - Address: `59 rue Jean-Jaurès, 94800 Villejuif, France`
  - Phone: same E.164 format every time (`+33 ...`)
- Footer renders NAP + opening hours + GBP link on every page.
- Embed Google Map (lazy-loaded `<iframe loading="lazy">`) on `/contact`.
- Mention surrounding communes naturally — never stuff: Villejuif,
  Le Kremlin-Bicêtre, L'Haÿ-les-Roses, Cachan, Arcueil, Vitry-sur-Seine, Paris 13e.

### Structured data (JSON-LD, injected via Next.js Metadata or a `<Script type="application/ld+json">`)

Minimum required:
- Home → `FoodEstablishment` (extends `LocalBusiness`) with `openingHoursSpecification`,
  `geo`, `priceRange`, `image`, `sameAs`, `acceptsReservations`.
- Every non-home page → `BreadcrumbList`.
- Menu page → `Menu` + `MenuSection` + `MenuItem` (`priceCurrency: "EUR"`).
- Product / pre-order page → `Product` with `Offer`.
- Events → `Event` with location + offers.
- **Never** invent `Review` / `AggregateRating`. Use them only if reviews are
  also visible on-page and the data is real.

Validate with https://validator.schema.org/ and the Rich Results Test before each release.

### Content rules
- One primary keyword + 2–3 semantic variants per page. Natural density.
- Primary keyword + location in the first 100 words.
- 300 words minimum on any indexed page; 600–1000 for service/category pages.
- Internal anchors are descriptive ("voir notre carte traiteur"), never "cliquez ici".
- External links: `rel="noopener"` always; `target="_blank"` only when justified;
  `rel="nofollow"` for paid/untrusted.

### What NOT to do
- Don't duplicate titles / meta descriptions across routes.
- Don't block CSS or JS in robots.txt (Google needs to render).
- Don't use `<h1>` for styling — use Tailwind classes.
- Don't ship lorem ipsum, TODO copy, or English placeholder text to production.
- Don't add third-party widgets without measuring CLS/LCP impact.

---

## 5. UX-2026 standards

The bar for 2026: every interaction feels intentional, accessible by default,
respectful of user attention, and works on a 3-year-old Android over 4G.

### Accessibility (WCAG 2.2 AA — mandatory; aim for AAA on text contrast)
- Contrast: body text ≥ 4.5:1, large text ≥ 3:1, UI components & graphics ≥ 3:1.
- Every interactive element keyboard-reachable, with a visible focus ring
  (`focus-visible:` Tailwind variant). Never `outline: none` without replacement.
- Semantic HTML over ARIA. Use `<button>`, `<nav>`, `<main>`, `<article>`,
  `<section>`. ARIA only when no native element fits.
- Skip-to-content link as the first focusable element on every page.
- All form inputs have a visible `<label>` (placeholder is not a label).
- Error messages programmatically linked via `aria-describedby` + `aria-invalid`.
- Live regions (`aria-live="polite"`) for toasts and async updates.
- Heading order respected. Page region landmarks present.
- `prefers-reduced-motion: reduce` disables non-essential animation.
- `prefers-color-scheme` respected; manual override stored in `localStorage`.
- Minimum touch target 44×44 px (WCAG 2.5.5). Use padding, not just font size.
- No information conveyed by colour alone (add icon / text label).
- Forms support browser autofill (`autocomplete` attributes: `name`, `email`,
  `tel`, `street-address`, `postal-code`, etc.).

### Responsive design
- Mobile-first. Design for 360 px width up.
- Use Tailwind's container queries (`@container`) for component-level responsiveness.
- Test at 360 / 414 / 768 / 1024 / 1440 / 1920 breakpoints before declaring done.
- No horizontal scroll at any width except intentional galleries.

### Modern interaction patterns
- **View Transitions API** for client-side route changes that should feel
  continuous (gallery → detail). Fall back gracefully.
- **Optimistic UI** for actions like "add to cart" / "save reservation"
  (use `useOptimistic`).
- **Skeleton loaders** that match the final layout shape (prevent CLS).
- **Empty states** are designed, not blank — include illustration + action.
- **Error states** explain what happened and offer recovery; never expose stack traces.
- **Toast notifications** dismiss automatically, are stackable, and announce
  via `aria-live`.
- **Inline form validation** on blur (not on every keystroke). Show success
  states too, not just errors.

### Visual & motion
- Type scale uses a modular ratio (e.g. 1.25). Body: 16–18 px on mobile, 18–20 px on desktop.
- Line-height ≥ 1.5 for body copy, ≥ 1.2 for headings.
- Line length 45–75 characters on body copy.
- Spacing follows a 4/8 px grid (Tailwind defaults align).
- Animation durations 150–300 ms for UI, 400–600 ms for hero/storytelling.
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` (Tailwind `ease-out`) for entrances,
  `ease-in` for exits.
- Never auto-play video with sound. Respect reduced-motion.

### Trust signals (especially important for a local food business)
- Real photography only. No stock images of "an Italian restaurant".
- Real reviews surfaced on-page (linked to Google), never invented.
- Real team photos on the about page.
- Live indicator: "Ouvert maintenant" / "Ferme à 19h30" computed from `siteSettings`
  opening hours (with `<time>` element and `datetime` attribute).

### Forms (contact, reservation, newsletter, pre-order)
- One column on mobile.
- Logical `<input type>` (`email`, `tel`, `date`, `number`, `url`).
- `inputmode` for numeric-only fields on mobile.
- Required fields marked with `*` AND `aria-required="true"`.
- Submit button shows pending state (`disabled` + spinner) during Server Action.
- Success state is a real new screen / confirmation, not just a toast that disappears.
- Honeypot field + Vercel rate limiting; no captcha unless abuse occurs (CAPTCHAs hurt UX and accessibility).

### AI-readability (2026 reality)
- Semantic HTML matters more than ever — LLM crawlers parse structure.
- JSON-LD with full data (address, hours, menu, prices) so AI assistants can
  answer "where can I buy fresh burrata near Villejuif?".
- Stable, descriptive URLs.
- `llms.txt` at the root summarising the site for LLMs (optional but recommended).

---

## 6. RGPD / CNIL compliance (France)

France enforces RGPD via the CNIL, with its own published recommendations.
This site must comply with both. Below is the full checklist — do not omit any.

### Required pages
- **`/mentions-legales`** (mandatory under LCEN art. 6-III). Must list:
  - Legal name of the business (raison sociale), SIREN/SIRET, RCS registration,
    capital (if applicable), VAT number.
  - Head office address.
  - Publication director name (`directeur de la publication`).
  - Contact email and phone.
  - **Hébergeur**: name, address, phone of the hosting provider (Vercel Inc.,
    340 S Lemon Ave #4133, Walnut, CA 91789, USA — confirm with the user before
    publishing).
- **`/politique-de-confidentialite`** — must cover:
  - Identity & contact of the data controller (`responsable de traitement`).
  - DPO contact if applicable (else a privacy contact email).
  - Purposes of each processing operation and legal basis (consent, contract,
    legitimate interest, legal obligation).
  - Categories of data collected.
  - Recipients of the data (Vercel, Tina Cloud, analytics provider, email sender).
  - Transfers outside the EU + the safeguards used (SCCs, adequacy decisions).
  - Retention periods (e.g. contact form data: 3 years; newsletter: until unsubscribe).
  - User rights: access, rectification, erasure, restriction, portability,
    objection, withdraw consent, lodge a complaint with the CNIL
    (https://www.cnil.fr/fr/plaintes).
  - How to exercise rights (email + postal address).
  - Cookies & trackers (cross-link to the cookie preferences manager).
  - Date of last update.
- **`/cookies`** (or a section within the confidentialité page) — full list of
  trackers, their purpose, lifetime, and provider. Updated whenever a tracker
  changes.
- **`/cgv`** if any e-commerce / pre-order paid online. Required under French
  consumer law.

### Cookie banner (CNIL guidelines, current at audit date)
- **No tracker, no third-party request fires before user choice.** This
  includes Google Fonts (self-host), Google Maps (lazy-load behind consent or
  use the `loading="lazy"` + privacy-enhanced iframe), YouTube embeds (use
  `youtube-nocookie.com` and load only after consent), and analytics.
- **"Accepter tout"** and **"Refuser tout"** buttons on the **same level**
  (same size, same visual weight, same step count). No dark patterns. No
  pre-checked boxes.
- **"Personnaliser"** option allowing granular per-category consent (Strictly
  necessary / Audience measurement / Marketing / Social media).
- **Strictly necessary** cookies (session, CSRF, consent itself) are the only
  ones exempt from consent — but still disclosed in `/cookies`.
- **Cookie wall is prohibited** — content must remain accessible if the user refuses.
- **Consent storage**: 6 months max for "refuse" decisions per CNIL recommendation;
  store the consent record (timestamp, version of the policy, choices) in
  `localStorage` + a first-party cookie. Re-prompt after expiry or after a
  material change in trackers.
- **Withdrawal as easy as giving** — persistent "Gérer mes cookies" link in
  the footer that re-opens the banner.
- Banner is **keyboard-accessible**, escapable, screen-reader announced, and
  does not block scrolling of the page underneath.

### Analytics
- Prefer a CNIL-exempted analytics setup so it can run without consent:
  - **Matomo self-hosted** with IP anonymisation, no cross-site, no fingerprinting,
    cookie-less mode, and the CNIL exemption configuration. OR
  - **Plausible** / **Simple Analytics** (cookie-less, GDPR-friendly by design).
- If Google Analytics 4 is used, it requires consent (it is **not** CNIL-exempt
  even with IP anonymisation, per the CNIL's 2022 position).
- Server-side analytics via Vercel Analytics is fine if configured without
  personal data (it's compliant by default — verify in the Vercel docs).

### Forms
- Every form has an unchecked consent box: *"J'accepte que mes données soient
  utilisées pour [purpose]. En savoir plus dans notre [politique de confidentialité]."*
- Newsletter requires **double opt-in** (confirmation email).
- Collect the minimum data needed (data minimisation principle).
- Show retention period and rights at point of collection (or link to the policy).
- Submission stores: timestamp, consent version, IP (hashed), purpose.

### Data handling in code
- Never log personal data (emails, names, phones) at `info` level. Use
  structured logging with redaction.
- Hash IPs at rest.
- Set HTTP security headers via `next.config.ts` `headers()`:
  - `Content-Security-Policy` (strict; nonce-based for inline scripts).
  - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`.
  - `X-Content-Type-Options: nosniff`.
  - `Referrer-Policy: strict-origin-when-cross-origin`.
  - `Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()`.
- All cookies set by our code: `Secure`, `HttpOnly` (when not needed in JS),
  `SameSite=Lax` (or `Strict` for auth).
- Third-party scripts loaded via `next/script` with `strategy="afterInteractive"`
  AND only after consent.

### Subject Access Requests (DSAR)
- Provide an email address (e.g. `privacy@salute-villejuif.fr`) in the policy.
- Respond within **1 month** (RGPD art. 12). The user should set up a
  monitored inbox before launch.

### Records of processing (art. 30)
- Maintain a register of processing activities (offline, but reference it in
  the privacy policy if asked). The user is responsible for this; we surface
  the need.

### Data Processing Agreements (DPAs)
- Before launch, the user must sign DPAs with: Vercel, Tina Cloud, the email
  sender (Resend / Postmark / etc.), the analytics provider, and any
  reservation / order platform. List them in the privacy policy.

---

## 7. Security defaults

- All user input validated server-side with `zod`.
- Server Actions check origin and rate-limit.
- No secrets in client bundles. Verify with `next build` output review.
- Environment variables: prefix with `NEXT_PUBLIC_` **only** when intentionally
  client-exposed. Default to server-only.
- Dependencies: run `npm audit` on every PR. No `high` or `critical`
  vulnerabilities merged.
- Forms protected by honeypot + rate limit (Upstash Redis or Vercel WAF).
- File uploads (Tina media): validate MIME, cap size, scan for malware
  (Tina Cloud does this by default).

---

## 8. Workflow rules for Claude

- **Before building any feature**: re-read the relevant section of
  `../Salute Audit/audit-salute-france.md` so the work targets a real audit gap.
- **Before shipping any page**: walk the §1 checklist explicitly and report
  pass/fail per item to the user.
- **Before adding a dependency**: justify it. Prefer Next.js / Web platform
  primitives. The bundle budget is tight.
- **Before adding a third-party script**: it goes behind cookie consent unless
  it is strictly necessary. Document it in `/cookies`.
- **Before declaring "done"**: run `npm run build`, `npm run lint`, and
  visually verify the page in a real browser (Chrome + Safari mobile emulation).
  Type-check is not enough.
- **Never** ship copy you wrote without the user reviewing it. You can draft;
  the owner approves.
- **Never** invent NAP, opening hours, prices, reviews, or any other factual
  data. Pull from `siteSettings` in Tina or ask the user.

---

## 9. Stack-specific gotchas

- **TinaCMS + Next.js App Router**: Tina's preview iframe needs the page to be
  rendered in a Client Component context for live editing. Use the
  `tinacms/dist/edit-state` provider in a `(tina)` route group and keep public
  pages as Server Components.
- **Vercel + RGPD**: Vercel Web Analytics is GDPR-compliant by default (no
  cookies, no PII). Vercel Speed Insights is too. Enable both — they don't
  trigger the consent banner.
- **next/image + AVIF**: Vercel optimises on-the-fly. Make sure
  `images.remotePatterns` allows the Tina media CDN.
- **next/font self-hosted**: prevents the Google Fonts request that would
  otherwise leak the user's IP to Google before consent.
- **Middleware**: use it for the `noindex` header on `/draft/*` and for
  redirects (trailing-slash normalisation, www → apex).

---

## 10. Verification checklist before each deploy

- [ ] `npm run build` succeeds, no type errors, no ESLint errors.
- [ ] Lighthouse mobile ≥ 90 on all four categories on the home and one inner page.
- [ ] `https://validator.schema.org/` passes for home, menu, contact, one product.
- [ ] `https://search.google.com/test/rich-results` passes.
- [ ] `https://www.opengraph.xyz/` previews correctly for home + one inner page.
- [ ] axe DevTools: 0 critical, 0 serious issues.
- [ ] Network tab with cookies refused: 0 third-party requests except those
      strictly necessary.
- [ ] Network tab with cookies accepted: only the declared third parties fire.
- [ ] NAP byte-identical on every page footer and matches the Google Business Profile.
- [ ] All canonical URLs resolve 200.
- [ ] `/mentions-legales`, `/politique-de-confidentialite`, `/cookies` present
      and linked from the footer.
- [ ] Cookie banner: "Accepter" and "Refuser" same visual weight; "Gérer" link
      persistent in footer.
- [ ] Manual keyboard run: Tab through the homepage end-to-end, every focus
      ring visible, no traps.
- [ ] Test the page at 360 px width on a real mobile or emulator (not just devtools).
