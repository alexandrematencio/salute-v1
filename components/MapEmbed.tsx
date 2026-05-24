"use client";

import { useConsent } from "./CookieBanner";
import { siteConfig, formatAddressOneLine } from "@/lib/site-config";

/**
 * Embed Google Maps — chargé UNIQUEMENT après consentement utilisateur
 * (catégorie "social" / contenus enrichis tiers). Conforme CNIL.
 *
 * Tant que le consentement n'est pas donné, on affiche un placeholder cliquable
 * qui propose à l'utilisateur d'ouvrir le gestionnaire de cookies.
 */
export function MapEmbed() {
  const allowed = useConsent("social");

  if (!allowed) {
    return (
      <section className="rounded-2xl border border-dashed border-salute-stone/40 bg-salute-cream/60 p-6 text-center dark:bg-salute-ink/40">
        <h2 className="font-display text-lg font-semibold">Plan d'accès</h2>
        <p className="mt-2 text-sm leading-relaxed">
          La carte Google Maps n'est chargée qu'avec votre consentement (cookies « réseaux sociaux
          &amp; cartes »).
        </p>
        <p className="mt-3 text-sm">
          {formatAddressOneLine()}
        </p>
        <a
          href={siteConfig.socials.googleBusiness}
          rel="noopener"
          target="_blank"
          className="touch-target mt-4 inline-flex items-center rounded-md bg-salute-green px-4 py-2 text-sm font-medium text-salute-cream hover:opacity-90"
        >
          Voir sur Google Maps →
        </a>
      </section>
    );
  }

  const query = encodeURIComponent(formatAddressOneLine());
  return (
    <section className="overflow-hidden rounded-2xl border border-salute-stone/20">
      <h2 className="sr-only">Plan d'accès</h2>
      <iframe
        title={`Carte indiquant la boutique Salute! au ${siteConfig.nap.street}`}
        src={`https://www.google.com/maps?q=${query}&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-72 w-full"
      />
    </section>
  );
}
