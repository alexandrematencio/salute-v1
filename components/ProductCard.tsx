import Image from "next/image";
import type { Product } from "@/lib/products";

/**
 * Carte produit utilisée sur la home et la page /epicerie.
 * - next/image avec width/height pour éviter CLS
 * - aspect ratio fixe via CSS pour mobile-first
 */
export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-salute-stone/15 bg-white transition hover:border-salute-terracotta dark:bg-salute-ink/40">
      <div className="relative aspect-[4/3] overflow-hidden bg-salute-stone/10">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
          priority={priority}
        />
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold">{product.name}</h3>
        <p className="mt-2 text-sm leading-relaxed opacity-80">{product.description}</p>
      </div>
    </article>
  );
}
