"use client";

import { openConsentManager } from "./CookieBanner";

/**
 * Lien "Gérer mes cookies" persistant dans le footer.
 * Réouvre la bannière de consentement à la demande — obligation CNIL : retrait
 * du consentement aussi facile que son obtention.
 */
export function ManageCookiesLink() {
  return (
    <button
      type="button"
      onClick={openConsentManager}
      className="text-left hover:underline"
    >
      Gérer mes cookies
    </button>
  );
}
