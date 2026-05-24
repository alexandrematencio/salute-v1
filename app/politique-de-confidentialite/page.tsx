import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité de Salute! — données collectées, finalités, durées de conservation, vos droits RGPD.",
  path: "/politique-de-confidentialite",
});

/**
 * Politique de confidentialité — conforme RGPD (Règlement UE 2016/679) et
 * Loi Informatique et Libertés modifiée.
 *
 * Contient (obligatoires) :
 *   - identité du responsable de traitement
 *   - finalités et bases légales de chaque traitement
 *   - catégories de données collectées
 *   - destinataires / sous-traitants
 *   - transferts hors UE et garanties associées
 *   - durées de conservation
 *   - droits des personnes + modalités d'exercice
 *   - droit de réclamation auprès de la CNIL
 */
export default function PolitiqueConfidentialitePage() {
  return (
    <article className="mx-auto max-w-prose px-4 py-12">
      <h1 className="font-display text-4xl font-semibold">Politique de confidentialité</h1>
      <p className="mt-4 text-sm opacity-70">
        Dernière mise à jour : {siteConfig.privacy.policyLastUpdated}
      </p>

      <section className="mt-8">
        <h2 className="font-display text-2xl font-semibold">1. Responsable du traitement</h2>
        <p className="mt-3">
          Le responsable du traitement des données collectées sur ce site est{" "}
          <strong>{siteConfig.legalName}</strong>, dont le siège social est situé{" "}
          {siteConfig.nap.street}, {siteConfig.nap.postalCode} {siteConfig.nap.city}, France.
        </p>
        <p className="mt-3">
          Pour toute question relative à vos données : <a href={`mailto:${siteConfig.privacy.contactEmail}`}>{siteConfig.privacy.contactEmail}</a>
          {" "}ou par courrier à {siteConfig.privacy.contactPostalAddress}.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">2. Données collectées et finalités</h2>

        <h3 className="mt-6 font-display text-xl font-semibold">2.1 Formulaire de contact</h3>
        <ul className="mt-3 list-disc pl-6 space-y-1">
          <li><strong>Données :</strong> nom, email, téléphone (facultatif), message.</li>
          <li><strong>Finalité :</strong> répondre à votre demande.</li>
          <li><strong>Base légale :</strong> exécution de mesures précontractuelles (art. 6.1.b RGPD).</li>
          <li><strong>Durée de conservation :</strong> 3 ans à compter du dernier contact.</li>
        </ul>

        <h3 className="mt-6 font-display text-xl font-semibold">2.2 Formulaire de devis traiteur</h3>
        <ul className="mt-3 list-disc pl-6 space-y-1">
          <li><strong>Données :</strong> nom, email, téléphone, type d'événement, date, nombre de convives, budget indicatif.</li>
          <li><strong>Finalité :</strong> établir un devis personnalisé.</li>
          <li><strong>Base légale :</strong> exécution de mesures précontractuelles.</li>
          <li><strong>Durée :</strong> 3 ans (dossier commercial), 10 ans (dossier comptable si commande confirmée).</li>
        </ul>

        <h3 className="mt-6 font-display text-xl font-semibold">2.3 Newsletter</h3>
        <ul className="mt-3 list-disc pl-6 space-y-1">
          <li><strong>Données :</strong> email.</li>
          <li><strong>Finalité :</strong> envoi d'actualités et offres de la boutique.</li>
          <li><strong>Base légale :</strong> consentement (art. 6.1.a RGPD) — double opt-in.</li>
          <li><strong>Durée :</strong> jusqu'à désinscription (lien présent dans chaque email).</li>
        </ul>

        <h3 className="mt-6 font-display text-xl font-semibold">2.4 Mesure d'audience</h3>
        <ul className="mt-3 list-disc pl-6 space-y-1">
          <li>
            <strong>Outil :</strong> [À CONFIRMER : Vercel Web Analytics / Matomo / Plausible — privilégier
            un outil exempté de consentement par la CNIL].
          </li>
          <li><strong>Données :</strong> pages vues, durée de visite, type d'appareil, données techniques (IP anonymisée, user-agent).</li>
          <li><strong>Finalité :</strong> amélioration du site.</li>
          <li><strong>Base légale :</strong> intérêt légitime, ou consentement si non exempté.</li>
          <li><strong>Durée :</strong> 13 mois maximum (recommandation CNIL).</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">3. Destinataires et sous-traitants</h2>
        <p className="mt-3">
          Vos données peuvent être transmises aux sous-traitants suivants, encadrés par des contrats
          conformes à l'article 28 du RGPD :
        </p>
        <ul className="mt-3 list-disc pl-6 space-y-1">
          {siteConfig.dataProcessors.map((p) => (
            <li key={p.name}>
              <strong>{p.name}</strong> — {p.purpose} ({p.country})
            </li>
          ))}
        </ul>
        <p className="mt-3">
          Les transferts hors Union européenne (notamment vers les États-Unis) sont encadrés par les
          Clauses Contractuelles Types (SCC) approuvées par la Commission européenne, garantissant un
          niveau de protection adéquat.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">4. Vos droits</h2>
        <p className="mt-3">
          Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants :
        </p>
        <ul className="mt-3 list-disc pl-6 space-y-1">
          <li>Droit d'accès à vos données (art. 15 RGPD)</li>
          <li>Droit de rectification (art. 16 RGPD)</li>
          <li>Droit à l'effacement (art. 17 RGPD)</li>
          <li>Droit à la limitation du traitement (art. 18 RGPD)</li>
          <li>Droit à la portabilité (art. 20 RGPD)</li>
          <li>Droit d'opposition (art. 21 RGPD)</li>
          <li>Droit de retirer votre consentement à tout moment</li>
          <li>Droit de définir des directives post-mortem sur vos données</li>
        </ul>
        <p className="mt-3">
          Pour exercer ces droits, contactez-nous à{" "}
          <a href={`mailto:${siteConfig.privacy.contactEmail}`}>{siteConfig.privacy.contactEmail}</a>.
          Nous répondrons dans un délai d'un mois maximum (art. 12 RGPD).
        </p>
        <p className="mt-3">
          Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation
          auprès de la <a href={siteConfig.privacy.cnilComplaintUrl} rel="noopener" target="_blank">CNIL</a>.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">5. Sécurité</h2>
        <p className="mt-3">
          Nous mettons en œuvre les mesures techniques et organisationnelles appropriées pour protéger
          vos données : chiffrement HTTPS sur l'ensemble du site, en-têtes de sécurité strictes (HSTS,
          CSP), hashage des adresses IP dans les journaux, accès restreint aux données par le personnel
          autorisé uniquement.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">6. Cookies</h2>
        <p className="mt-3">
          Voir la <a href="/cookies">page dédiée aux cookies</a> pour le détail des traceurs utilisés
          et la gestion de votre consentement.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">7. Modifications</h2>
        <p className="mt-3">
          La présente politique peut être mise à jour à tout moment. La date de dernière mise à jour
          figure en haut de cette page. En cas de modification substantielle, nous vous en informerons.
        </p>
      </section>
    </article>
  );
}
