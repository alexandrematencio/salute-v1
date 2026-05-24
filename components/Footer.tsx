import Link from "next/link";
import { siteConfig, formatAddressOneLine, telLink, mailtoLink, formatOpeningHours, frenchDay } from "@/lib/site-config";
import { OpenNowIndicator } from "./OpenNowIndicator";
import { ManageCookiesLink } from "./ManageCookiesLink";

/**
 * Footer affichant le NAP complet sur chaque page (signal SEO local critique
 * identifié par l'audit). Liens RGPD obligatoires + lien "Gérer mes cookies"
 * persistant requis par la CNIL.
 */
export function Footer() {
  return (
    <footer className="mt-16 border-t border-salute-stone/20 bg-salute-ink text-salute-cream">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* Coordonnées — NAP authoritative */}
        <section aria-labelledby="footer-nap">
          <h2 id="footer-nap" className="font-display text-lg font-semibold">
            {siteConfig.name}
          </h2>
          <p className="mt-2 text-sm">{siteConfig.tagline}</p>
          <address className="mt-4 text-sm not-italic leading-relaxed">
            {formatAddressOneLine()}
            <br />
            <a href={telLink} className="hover:underline">
              {siteConfig.nap.phone}
            </a>
            <br />
            <a href={mailtoLink} className="hover:underline">
              {siteConfig.nap.email}
            </a>
          </address>
        </section>

        {/* Horaires + indicateur "ouvert maintenant" */}
        <section aria-labelledby="footer-hours">
          <h2 id="footer-hours" className="font-display text-lg font-semibold">
            Horaires
          </h2>
          <OpenNowIndicator />
          <dl className="mt-3 space-y-1 text-sm">
            {siteConfig.openingHours.map((d) => (
              <div key={d.day} className="flex justify-between gap-3">
                <dt>{frenchDay(d.day)}</dt>
                <dd className="text-right">{formatOpeningHours(d)}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Navigation secondaire */}
        <nav aria-labelledby="footer-nav">
          <h2 id="footer-nav" className="font-display text-lg font-semibold">
            Plan du site
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/carte" className="hover:underline">Carte & Formules</Link></li>
            <li><Link href="/traiteur" className="hover:underline">Traiteur événementiel</Link></li>
            <li><Link href="/epicerie" className="hover:underline">Épicerie</Link></li>
            <li><Link href="/a-propos" className="hover:underline">Notre histoire</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
            <li><Link href="/blog" className="hover:underline">Actualités</Link></li>
          </ul>
        </nav>

        {/* Liens légaux + réseaux */}
        <section aria-labelledby="footer-legal">
          <h2 id="footer-legal" className="font-display text-lg font-semibold">
            Informations
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/mentions-legales" className="hover:underline">Mentions légales</Link></li>
            <li><Link href="/politique-de-confidentialite" className="hover:underline">Politique de confidentialité</Link></li>
            <li><Link href="/cookies" className="hover:underline">Cookies</Link></li>
            <li><ManageCookiesLink /></li>
          </ul>
          <ul className="mt-4 flex gap-4 text-sm">
            <li>
              <a href={siteConfig.socials.instagram} rel="noopener" target="_blank" aria-label="Instagram">
                Instagram
              </a>
            </li>
            <li>
              <a href={siteConfig.socials.facebook} rel="noopener" target="_blank" aria-label="Facebook">
                Facebook
              </a>
            </li>
            <li>
              <a href={siteConfig.socials.googleBusiness} rel="noopener" target="_blank" aria-label="Google">
                Google
              </a>
            </li>
          </ul>
        </section>
      </div>

      <div className="border-t border-salute-cream/10">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs">
          © {new Date().getFullYear()} {siteConfig.legalName}. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}

