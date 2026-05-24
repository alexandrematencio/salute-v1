import type { Metadata } from "next";
import { siteConfig, formatAddressOneLine } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Mentions légales",
  description: "Mentions légales du site Salute! — éditeur, hébergeur, informations légales de la société.",
  path: "/mentions-legales",
});

/**
 * Mentions légales — obligatoires en France au titre de l'article 6-III de la
 * loi LCEN (Loi pour la Confiance dans l'Économie Numérique).
 *
 * Doivent figurer :
 *   - identité de l'éditeur (raison sociale, forme juridique, capital, SIREN/SIRET,
 *     RCS, TVA intracom, siège social, directeur de la publication, contact)
 *   - identité de l'hébergeur (nom, adresse, téléphone)
 *
 * Les valeurs proviennent de `lib/site-config.ts`. À VALIDER avec le client
 * avant lancement — placeholders signalés "À CONFIRMER".
 */
export default function MentionsLegalesPage() {
  return (
    <article className="mx-auto max-w-prose px-4 py-12">
      <h1 className="font-display text-4xl font-semibold">Mentions légales</h1>
      <p className="mt-4 text-sm opacity-70">
        Dernière mise à jour : {siteConfig.privacy.policyLastUpdated}
      </p>

      <section className="mt-8">
        <h2 className="font-display text-2xl font-semibold">Éditeur du site</h2>
        <p className="mt-3">
          <strong>{siteConfig.legal.publicationDirector}</strong> est responsable de la publication
          du site <a href={siteConfig.url}>{siteConfig.url}</a>.
        </p>
        <dl className="mt-4 space-y-2">
          <div>
            <dt className="font-medium">Raison sociale</dt>
            <dd>{siteConfig.legalName}</dd>
          </div>
          <div>
            <dt className="font-medium">Forme juridique</dt>
            <dd>{siteConfig.legal.legalForm}</dd>
          </div>
          <div>
            <dt className="font-medium">Capital social</dt>
            <dd>{siteConfig.legal.capital}</dd>
          </div>
          <div>
            <dt className="font-medium">SIREN</dt>
            <dd>{siteConfig.legal.siren}</dd>
          </div>
          <div>
            <dt className="font-medium">SIRET</dt>
            <dd>{siteConfig.legal.siret}</dd>
          </div>
          <div>
            <dt className="font-medium">RCS</dt>
            <dd>{siteConfig.legal.rcs}</dd>
          </div>
          <div>
            <dt className="font-medium">Numéro TVA intracommunautaire</dt>
            <dd>{siteConfig.legal.vatNumber}</dd>
          </div>
          <div>
            <dt className="font-medium">Siège social</dt>
            <dd>{formatAddressOneLine()}</dd>
          </div>
          <div>
            <dt className="font-medium">Téléphone</dt>
            <dd>{siteConfig.nap.phone}</dd>
          </div>
          <div>
            <dt className="font-medium">Email</dt>
            <dd>{siteConfig.nap.email}</dd>
          </div>
          <div>
            <dt className="font-medium">Directeur de la publication</dt>
            <dd>{siteConfig.legal.publicationDirector}</dd>
          </div>
        </dl>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Hébergeur</h2>
        <p className="mt-3">
          Le site est hébergé par :<br />
          <strong>{siteConfig.hosting.name}</strong>
          <br />
          {siteConfig.hosting.address}
          <br />
          Téléphone : {siteConfig.hosting.phone}
          <br />
          <a href={siteConfig.hosting.website} rel="noopener" target="_blank">
            {siteConfig.hosting.website}
          </a>
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Propriété intellectuelle</h2>
        <p className="mt-3">
          L'ensemble du contenu de ce site (textes, images, vidéos, marques, logos) est protégé par le
          droit d'auteur et reste la propriété exclusive de {siteConfig.legalName} ou de ses ayants droit.
          Toute reproduction, représentation ou diffusion sans autorisation écrite préalable est
          interdite et constitue une contrefaçon (art. L.335-2 et suivants du Code de la propriété
          intellectuelle).
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Données personnelles</h2>
        <p className="mt-3">
          Les conditions de traitement de vos données personnelles sont décrites dans notre{" "}
          <a href="/politique-de-confidentialite">politique de confidentialité</a>.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Cookies</h2>
        <p className="mt-3">
          Voir notre <a href="/cookies">page dédiée aux cookies</a> pour la liste complète des
          traceurs utilisés et la gestion de votre consentement.
        </p>
      </section>
    </article>
  );
}
