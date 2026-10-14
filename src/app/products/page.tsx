import Pagination from "@/components/product/Pagination";
import ProductFilters from "@/components/product/ProductFilters";
import ProductGrid from "@/components/product/ProductGrid";
import { EmptyState } from "@/components/ui/empty-state";
import { SearchX } from "lucide-react";
import {
  parseProductQuery,
  productsHref,
  type ProductQuery,
} from "@/lib/product-query";
import { getActiveBrands, getActiveCategories } from "@/services/catalog.service";
import { searchProducts } from "@/services/products.service";
import type { Metadata } from "next";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

/** "Electronics Products", "Adidas Products", or "All Products". */
async function listingTitle(query: ProductQuery) {
  if (query.keyword) return `Search results for "${query.keyword}"`;

  const [categories, brands] = await Promise.all([getActiveCategories(), getActiveBrands()]);
  const category = categories.find((c) => c._id === query.category)?.name;
  const brand = brands.find((b) => b._id === query.brand)?.name;
  const subject = [brand, category].filter(Boolean).join(" ");

  return subject ? `${subject} Products` : "All Products";
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const query = parseProductQuery(await searchParams);
  const title = listingTitle(query);
  const pageSuffix = query.page > 1 ? ` (Page ${query.page})` : "";

  return {
    title: `${await title}${pageSuffix}`,
    description:
      "Browse and filter FreshCart products by category, brand and price. Order online with card or cash on delivery.",
    // Category, brand and page each make a distinct listing worth indexing.
    // Sort order and price ranges only reshuffle those, so they point back.
    alternates: {
      canonical: productsHref({
        category: query.category,
        brand: query.brand,
        page: query.page,
      }),
    },
    // Free-text searches create endless near-duplicate pages: let crawlers
    // follow the product links but keep the result pages out of the index.
    ...(query.keyword && { robots: { index: false, follow: true } }),
  };
}

export default async function Products({ searchParams }: PageProps) {
  const query = parseProductQuery(await searchParams);

  const [result, categories, brands, title] = await Promise.all([
    searchProducts(query),
    getActiveCategories(),
    getActiveBrands(),
    listingTitle(query),
  ]);

  return (
    <div className="container w-full max-w-6xl px-3 sm:px-5 items-center mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 px-2">{title}</h1>

      {/* key resets the uncontrolled inputs when the URL changes */}
      <ProductFilters
        key={JSON.stringify(query)}
        query={query}
        categories={categories}
        brands={brands}
      />

      <section aria-label="Product results">
        <p className="text-sm text-muted-foreground mb-2 px-2" role="status">
          {result.total} {result.total === 1 ? "product" : "products"} found
        </p>

        {result.products.length > 0 ? (
          <ProductGrid products={result.products} />
        ) : (
          <EmptyState
            icon={SearchX}
            title="No products found"
            description="Try a different search word or remove some filters."
            action={{ href: "/products", label: "Clear filters" }}
          />
        )}
      </section>

      <Pagination
        query={query}
        page={result.page}
        totalPages={result.totalPages}
      />
    </div>
  );
}
