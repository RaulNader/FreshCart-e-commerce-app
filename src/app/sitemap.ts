import { productsHref } from "@/lib/product-query";
import { absoluteUrl } from "@/lib/site";
import { getActiveBrands, getActiveCategories } from "@/services/catalog.service";
import { getAllProducts } from "@/services/products.service";
import type { MetadataRoute } from "next";

// Regenerates with the product data cache (every 60 seconds), so new
// products appear without a deploy.
// Served at /sitemap.xml: the list of public pages search engines should crawl.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories, brands] = await Promise.all([
    getAllProducts(),
    getActiveCategories(),
    getActiveBrands(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "daily", priority: 1 },
    { url: absoluteUrl("/products"), changeFrequency: "daily", priority: 0.9 },
    { url: absoluteUrl("/categories"), changeFrequency: "weekly", priority: 0.7 },
    { url: absoluteUrl("/brands"), changeFrequency: "weekly", priority: 0.7 },
  ];

  const listingPages: MetadataRoute.Sitemap = [
    ...categories.map((category) => productsHref({ category: category._id })),
    ...brands.map((brand) => productsHref({ brand: brand._id })),
  ].map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: absoluteUrl(`/products/${product.id}`),
    lastModified: product.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...listingPages, ...productPages];
}
