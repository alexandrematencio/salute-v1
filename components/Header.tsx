"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig, telLink } from "@/lib/site-config";

/**
 * Navigation principale.
 * - Desktop : liste horizontale + bouton d'appel
 * - Mobile : bouton hamburger qui ouvre un panneau plein écran accessible
 *   (focus géré, échappable avec Escape, scroll bloqué quand ouvert)
 */
const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/carte", label: "Carte & Formules" },
  { href: "/traiteur", label: "Traiteur" },
  { href: "/epicerie", label: "Épicerie" },
  { href: "/a-propos", label: "Notre histoire" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  // Bloque le scroll de la page quand le menu mobile est ouvert
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Ferme avec la touche Échap
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-30 border-b border-salute-stone/20 bg-salute-cream/90 backdrop-blur-sm dark:bg-salute-ink/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:py-4">
        <Link
          href="/"
          className="font-display text-2xl font-semibold tracking-tight"
          aria-label="Salute! Accueil"
          onClick={() => setOpen(false)}
        >
          {siteConfig.name}
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Navigation principale" className="hidden md:block">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="touch-target inline-flex items-center text-sm font-medium hover:text-salute-terracotta"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* Bouton d'appel — icône SVG bien centrée */}
          <a
            href={telLink}
            className="touch-target inline-flex h-11 items-center justify-center gap-2 rounded-md bg-salute-terracotta px-3 text-sm font-medium text-salute-cream hover:opacity-90"
            aria-label={`Appeler Salute! au ${siteConfig.nap.phone}`}
          >
            <PhoneIcon />
            <span className="hidden sm:inline">{siteConfig.nap.phone}</span>
            <span className="sr-only sm:hidden">Appeler</span>
          </a>

          {/* Bouton hamburger — mobile uniquement */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="touch-target inline-flex h-11 w-11 items-center justify-center rounded-md border border-salute-ink/15 hover:bg-salute-ink/5 md:hidden dark:border-salute-cream/20 dark:hover:bg-salute-cream/10"
          >
            {open ? <CloseIcon /> : <BurgerIcon />}
          </button>
        </div>
      </div>

      {/* Panneau mobile */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-salute-stone/20 bg-salute-cream md:hidden dark:bg-salute-ink"
      >
        <nav aria-label="Navigation principale mobile" className="px-4 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="touch-target flex items-center rounded-md px-3 py-3 text-base font-medium hover:bg-salute-ink/5 hover:text-salute-terracotta dark:hover:bg-salute-cream/10"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 shrink-0"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function BurgerIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
