import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/data/site";
import { loadProducts } from "@/lib/products";

// Se genera al compilar. No se declara "lastmod": no hay una fecha real de
// modificación por página, y una inventada haría que Google deje de confiar
// en ese campo.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/home"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/service"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/contact"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/store"), changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/privacidad"), changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/terminos"), changeFrequency: "yearly", priority: 0.2 },
  ];

  let products: MetadataRoute.Sitemap = [];
  try {
    products = loadProducts().map((product) => ({
      url: absoluteUrl(`/product/${product.id}`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Sitemap: no se pudo leer el catálogo", error);
  }

  return [...pages, ...products];
}
