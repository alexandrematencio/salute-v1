import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

/**
 * Sitemap statique de démarrage. Dès que les collections TinaCMS sont peuplées,
 * remplacer le tableau `staticRoutes` par un import du client Tina pour
 * inclure toutes les pages, articles et événements publiés.
 */
const staticRoutes: { path: string; changeFrequency: "daily" | "weekly" | "monthly" | "yearly"; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/carte", changeFrequency: "weekly", priority: 0.9 },
  { path: "/traiteur", changeFrequency: "monthly", priority: 0.9 },
  { path: "/epicerie", changeFrequency: "weekly", priority: 0.8 },
  { path: "/a-propos", changeFrequency: "yearly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.6 },
  { path: "/mentions-legales", changeFrequency: "yearly", priority: 0.2 },
  { path: "/politique-de-confidentialite", changeFrequency: "yearly", priority: 0.2 },
  { path: "/cookies", changeFrequency: "yearly", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return staticRoutes.map((r) => ({
    url: `${siteConfig.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
