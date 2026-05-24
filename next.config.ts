import type { NextConfig } from "next";

/**
 * Mode déploiement : static export pour GitHub Pages.
 *
 * Conséquences à connaître :
 * - `output: "export"` génère un dossier `/out` avec du HTML/JS/CSS statique
 * - Pas d'optimisation `next/image` à la volée → `images.unoptimized: true`
 * - Pas de middleware exécuté (le fichier middleware.ts ne fonctionnerait pas)
 * - Pas de `headers()` ni `redirects()` (s'applique uniquement avec un runtime
 *   serveur — pour production sur Vercel, basculer ces blocs si on migre)
 * - `basePath` requis car GitHub Pages sert sous /salute-v1
 *
 * Pour repasser en mode serveur (Vercel) plus tard : retirer `output`,
 * `basePath`, `assetPrefix`, `trailingSlash`, réactiver `headers()` et
 * `redirects()`, remettre `images.unoptimized: false`.
 */

const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/salute-v1" : "";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["clsx"],
  },
};

export default nextConfig;
