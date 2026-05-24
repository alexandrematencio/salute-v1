import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page introuvable | Salute!",
  description: "Cette page n'existe pas ou a été déplacée.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-24 text-center">
      <p className="font-display text-7xl font-semibold text-salute-terracotta">404</p>
      <h1 className="mt-4 font-display text-3xl font-semibold">Page introuvable</h1>
      <p className="mt-4 max-w-prose text-base">
        La page que vous cherchez a peut-être été déplacée, ou n'existe plus. Vous pouvez revenir à
        l'accueil ou découvrir notre carte.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link
          href="/"
          className="touch-target inline-flex items-center rounded-md bg-salute-green px-4 py-2 text-sm font-medium text-salute-cream hover:opacity-90"
        >
          Retour à l'accueil
        </Link>
        <Link
          href="/carte"
          className="touch-target inline-flex items-center rounded-md border border-salute-ink px-4 py-2 text-sm font-medium hover:bg-salute-ink hover:text-salute-cream"
        >
          Voir la carte
        </Link>
      </div>
    </article>
  );
}
