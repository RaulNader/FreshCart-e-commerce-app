import Pagination from "@/components/product/Pagination";
import ProductFilters from "@/components/product/ProductFilters";
import ProductGrid from "@/components/product/ProductGrid";
import { EmptyState } from "@/components/ui/empty-state";
import { SearchX } from "lucide-react";
import { parseProductQuery } from "@/lib/product-query";
import { getBrands, getCategories } from "@/services/catalog.service";
import { searchProducts } from "@/services/products.service";

export const metadata = {
  title: "Products",
  description: "FreshCart - Products",
};

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = parseProductQuery(await searchParams);

  const [result, categories, brands] = await Promise.all([
    searchProducts(query),
    getCategories(),
    getBrands(),
  ]);

  return (
    <div className="container w-full max-w-6xl px-3 sm:px-5 items-center mx-auto py-8">
      {/* key resets the uncontrolled inputs when the URL changes */}
      <ProductFilters
        key={JSON.stringify(query)}
        query={query}
        categories={categories}
        brands={brands}
      />

      <p className="text-sm text-muted-foreground mb-2 px-2">
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

      <Pagination
        query={query}
        page={result.page}
        totalPages={result.totalPages}
      />
    </div>
  );
}
