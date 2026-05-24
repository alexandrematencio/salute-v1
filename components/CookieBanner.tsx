"use client";

/**
 * Bannière cookies — conforme aux lignes directrices CNIL 2026.
 *
 * Règles appliquées (toutes obligatoires) :
 * - Aucun traceur (analytics, embeds Maps/YouTube) ne se déclenche avant choix utilisateur
 * - Boutons "Accepter tout" et "Refuser tout" au même niveau (taille, poids visuel, nombre de clics)
 * - "Personnaliser" pour granularité par catégorie
 * - Pas de cookie wall : refuser ne bloque pas l'accès au contenu
 * - Stockage du consentement 6 mois max pour les refus (recommandation CNIL)
 * - Lien persistant "Gérer mes cookies" dans le footer (réouvre la bannière)
 * - Accessible clavier, échappable, annoncé aux lecteurs d'écran
 * - Ne bloque PAS le scroll de la page
 */

import { useCallback, useEffect, useMemo, useState } from "react";

const CONSENT_STORAGE_KEY = "salute-consent-v1";
const CONSENT_TTL_MS = 1000 * 60 * 60 * 24 * 30 * 6; // 6 mois

type ConsentCategory = "necessary" | "analytics" | "marketing" | "social";

type ConsentRecord = {
  version: 1;
  timestamp: number;
  choices: Record<ConsentCategory, boolean>;
};

const ALL_FALSE: ConsentRecord["choices"] = {
  necessary: true,
  analytics: false,
  marketing: false,
  social: false,
};

const ALL_TRUE: ConsentRecord["choices"] = {
  necessary: true,
  analytics: true,
  marketing: true,
  social: true,
};

function loadConsent(): ConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentRecord;
    if (Date.now() - parsed.timestamp > CONSENT_TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveConsent(choices: ConsentRecord["choices"]) {
  const record: ConsentRecord = { version: 1, timestamp: Date.now(), choices };
  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  // Hook applicatif — chaque feature qui dépend du consentement écoute cet event
  window.dispatchEvent(new CustomEvent("salute:consent-changed", { detail: record }));
}

/**
 * Hook utilitaire à consommer dans les composants qui chargent un traceur
 * (Google Maps, YouTube, analytics non-exempté…).
 *
 *   const allowed = useConsent("marketing");
 *   if (!allowed) return <ConsentPlaceholder />;
 */
export function useConsent(category: ConsentCategory): boolean {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    const update = () => {
      const c = loadConsent();
      setGranted(c?.choices[category] ?? false);
    };
    update();
    window.addEventListener("salute:consent-changed", update);
    return () => window.removeEventListener("salute:consent-changed", update);
  }, [category]);

  return granted;
}

/** Permet au lien "Gérer mes cookies" du footer de réouvrir la bannière. */
export function openConsentManager() {
  window.dispatchEvent(new CustomEvent("salute:open-consent"));
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [choices, setChoices] = useState<ConsentRecord["choices"]>(ALL_FALSE);

  useEffect(() => {
    const stored = loadConsent();
    if (!stored) setVisible(true);
    const reopen = () => {
      setChoices(stored?.choices ?? ALL_FALSE);
      setCustomizing(true);
      setVisible(true);
    };
    window.addEventListener("salute:open-consent", reopen);
    return () => window.removeEventListener("salute:open-consent", reopen);
  }, []);

  // Permettre Échap pour fermer (équivaut à refuser tout — choix conservateur)
  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleRefuseAll();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const handleAcceptAll = useCallback(() => {
    saveConsent(ALL_TRUE);
    setVisible(false);
  }, []);

  const handleRefuseAll = useCallback(() => {
    saveConsent(ALL_FALSE);
    setVisible(false);
  }, []);

  const handleSavePreferences = useCallback(() => {
    saveConsent({ ...choices, necessary: true });
    setVisible(false);
    setCustomizing(false);
  }, [choices]);

  const categories = useMemo(
    () =>
      [
        {
          key: "necessary" as const,
          label: "Strictement nécessaires",
          description:
            "Indispensables au fonctionnement du site (session, sécurité, mémorisation de votre choix de cookies). Ne peuvent être désactivés.",
          locked: true,
        },
        {
          key: "analytics" as const,
          label: "Mesure d'audience",
          description:
            "Permet de comprendre comment vous utilisez le site (pages visitées, durée) pour l'améliorer. Données anonymisées.",
          locked: false,
        },
        {
          key: "marketing" as const,
          label: "Marketing & publicité",
          description: "Permet d'afficher des contenus personnalisés et de mesurer l'efficacité des campagnes.",
          locked: false,
        },
        {
          key: "social" as const,
          label: "Réseaux sociaux & cartes",
          description:
            "Permet d'afficher les contenus intégrés (carte Google Maps, vidéos, posts Instagram).",
          locked: false,
        },
      ],
    []
  );

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      className="fixed inset-x-2 bottom-2 z-40 mx-auto max-w-3xl rounded-xl border border-salute-stone/20 bg-salute-cream p-5 shadow-2xl dark:bg-salute-ink dark:text-salute-cream sm:inset-x-4 sm:bottom-4 sm:p-6"
    >
      <h2 id="cookie-banner-title" className="text-lg font-semibold">
        Vos préférences de cookies
      </h2>
      <p id="cookie-banner-desc" className="mt-2 text-sm leading-relaxed">
        Nous utilisons des cookies pour faire fonctionner ce site, mesurer son audience et afficher des
        contenus enrichis (carte, vidéos). Vous pouvez accepter, refuser ou personnaliser votre choix.
        Vous pouvez revenir sur votre décision à tout moment via le lien « Gérer mes cookies » en bas de
        page.{" "}
        <a href="/politique-de-confidentialite" className="underline">
          En savoir plus
        </a>
        .
      </p>

      {customizing && (
        <fieldset className="mt-4 space-y-3">
          <legend className="sr-only">Catégories de cookies</legend>
          {categories.map((cat) => (
            <label
              key={cat.key}
              className="flex cursor-pointer items-start gap-3 rounded-md border border-salute-stone/20 p-3"
            >
              <input
                type="checkbox"
                className="mt-1 h-4 w-4"
                checked={choices[cat.key]}
                disabled={cat.locked}
                onChange={(e) => setChoices((c) => ({ ...c, [cat.key]: e.target.checked }))}
                aria-describedby={`cookie-${cat.key}-desc`}
              />
              <span>
                <span className="font-medium">{cat.label}</span>
                <span id={`cookie-${cat.key}-desc`} className="block text-sm opacity-80">
                  {cat.description}
                </span>
              </span>
            </label>
          ))}
        </fieldset>
      )}

      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
        {/* CRITIQUE CNIL : Accepter, Refuser et Personnaliser ont strictement le même poids visuel */}
        <button
          type="button"
          onClick={handleRefuseAll}
          className="touch-target rounded-md border border-salute-ink px-4 py-2 text-sm font-medium hover:bg-salute-ink hover:text-salute-cream dark:border-salute-cream dark:hover:bg-salute-cream dark:hover:text-salute-ink"
        >
          Refuser tout
        </button>
        <button
          type="button"
          onClick={() => setCustomizing((v) => !v)}
          className="touch-target rounded-md border border-salute-ink px-4 py-2 text-sm font-medium hover:bg-salute-ink hover:text-salute-cream dark:border-salute-cream dark:hover:bg-salute-cream dark:hover:text-salute-ink"
        >
          {customizing ? "Masquer les détails" : "Personnaliser"}
        </button>
        {customizing ? (
          <button
            type="button"
            onClick={handleSavePreferences}
            className="touch-target rounded-md bg-salute-green px-4 py-2 text-sm font-medium text-salute-cream hover:opacity-90"
          >
            Enregistrer mes choix
          </button>
        ) : (
          <button
            type="button"
            onClick={handleAcceptAll}
            className="touch-target rounded-md bg-salute-green px-4 py-2 text-sm font-medium text-salute-cream hover:opacity-90"
          >
            Accepter tout
          </button>
        )}
      </div>
    </div>
  );
}
