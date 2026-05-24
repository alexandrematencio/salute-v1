import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware Next.js — applique :
 * - `noindex` strict sur les routes en mode draft Tina
 * - Normalisation www → apex (en complément de la config Vercel)
 *
 * Les en-têtes de sécurité sont définis dans `next.config.ts` (headers()).
 */
export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  if (req.nextUrl.pathname.startsWith("/draft")) {
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return res;
}

export const config = {
  matcher: [
    // Exclut les assets statiques et les routes internes Next.
    "/((?!_next/|api/|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest).*)",
  ],
};
