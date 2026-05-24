/**
 * Préfixe un chemin d'asset statique (image, fichier dans /public) avec le
 * basePath du site.
 *
 * Pourquoi ce helper : avec `output: "export"` + `images.unoptimized: true`,
 * Next.js applique bien le `basePath` aux chunks _next/* mais PAS au `src`
 * passé au composant `<Image>`. Conséquence : sur GitHub Pages servi sous
 * /salute-v1, une `src="/images/foo.jpg"` est résolue par le navigateur en
 * `/images/foo.jpg` (racine du domaine), qui n'existe pas → 404.
 *
 * Utilisation :
 *   <Image src={asset("/images/foo.jpg")} alt="..." />
 *
 * À retirer le jour où on déploiera sous un domaine propre sans basePath
 * (en mettant `ASSET_PREFIX = ""` ci-dessous, ou en supprimant ce helper).
 */

export const ASSET_PREFIX =
  process.env.NODE_ENV === "production" ? "/salute-v1" : "";

export function asset(path: string): string {
  if (!path) return path;
  if (/^https?:\/\//.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${ASSET_PREFIX}${normalized}`;
}
