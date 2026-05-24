import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";
import { ManageCookiesLink } from "@/components/ManageCookiesLink";

export const metadata: Metadata = buildMetadata({
  title: "Cookies",
  description: "Liste complète des cookies et traceurs utilisés sur le site Salute! et gestion du consentement.",
  path: "/cookies",
});

/**
 * Page Cookies — liste exhaustive de tous les traceurs utilisés.
 * Doit être mise à jour à chaque ajout/retrait d'un script tiers.
 */
export default function CookiesPage() {
  return (
    <article className="mx-auto max-w-prose px-4 py-12">
      <h1 className="font-display text-4xl font-semibold">Politique cookies</h1>
      <p className="mt-4 text-sm opacity-70">
        Dernière mise à jour : {siteConfig.privacy.policyLastUpdated}
      </p>

      <section className="mt-8">
        <h2 className="font-display text-2xl font-semibold">Qu'est-ce qu'un cookie ?</h2>
        <p className="mt-3">
          Un cookie est un petit fichier déposé sur votre appareil lorsque vous visitez un site web.
          Il permet de mémoriser vos préférences, mesurer l'audience, ou afficher des contenus
          enrichis (carte, vidéos). Certains cookies sont indispensables au fonctionnement du site,
          d'autres sont optionnels et nécessitent votre consentement.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Gérer mon consentement</h2>
        <p className="mt-3">
          Vous pouvez à tout moment modifier vos choix via le lien ci-dessous. Le retrait de votre
          consentement est aussi simple que son obtention.
        </p>
        <p className="mt-4">
          <ManageCookiesLink />
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Liste des cookies utilisés</h2>

        <h3 className="mt-6 font-display text-xl font-semibold">Strictement nécessaires</h3>
        <p className="mt-2 text-sm">Toujours actifs — indispensables au fonctionnement du site.</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-salute-stone/20 text-left">
                <th className="py-2 pr-3">Nom</th>
                <th className="py-2 pr-3">Finalité</th>
                <th className="py-2 pr-3">Durée</th>
                <th className="py-2">Émetteur</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-salute-stone/10">
                <td className="py-2 pr-3 font-mono text-xs">salute-consent-v1</td>
                <td className="py-2 pr-3">Mémorise votre choix de cookies</td>
                <td className="py-2 pr-3">6 mois</td>
                <td className="py-2">Salute!</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="mt-8 font-display text-xl font-semibold">Mesure d'audience</h3>
        <p className="mt-2 text-sm">
          [À COMPLÉTER selon l'outil choisi. Si Matomo/Plausible exempté → indiquer "actif sans
          consentement requis, données anonymisées". Si GA4 → "soumis à consentement, refusé par
          défaut".]
        </p>

        <h3 className="mt-8 font-display text-xl font-semibold">Contenus enrichis tiers</h3>
        <p className="mt-2 text-sm">
          Carte Google Maps (page Contact), embeds Instagram, vidéos YouTube — ces contenus ne se
          chargent qu'après votre consentement explicite.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Pour aller plus loin</h2>
        <p className="mt-3">
          Pour en savoir plus sur les cookies et exercer vos droits :
        </p>
        <ul className="mt-3 list-disc pl-6 space-y-1">
          <li>
            <a href="https://www.cnil.fr/fr/cookies-et-autres-traceurs" rel="noopener" target="_blank">
              CNIL — Cookies et autres traceurs
            </a>
          </li>
          <li>
            <a href="/politique-de-confidentialite">Notre politique de confidentialité</a>
          </li>
        </ul>
      </section>
    </article>
  );
}
