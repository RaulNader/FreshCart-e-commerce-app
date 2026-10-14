import CategoriesSlider from "@/components/home/CategoriesSlider";
import MainSlider from "@/components/home/MainSlider";
import ProductGrid from "@/components/product/ProductGrid";
import ProductGridSkeleton from "@/components/product/ProductGridSkeleton";
import JsonLd from "@/components/seo/JsonLd";
import { Skeleton } from "@/components/ui/skeleton";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";
import { getProducts } from "@/services/products.service";
import type { Metadata } from "next";
import { Suspense } from "react";

// No title here: the home page uses the layout's default title.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Tells Google the site name and that /products?keyword=... is its search,
// which can show a search box under the site in results.
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: absoluteUrl("/products?keyword={search_term_string}"),
    },
    "query-input": "required name=search_term_string",
  },
};

async function HomeProducts() {
  const products = await getProducts();
  return <ProductGrid products={products} />;
}

function CategoriesSliderSkeleton() {
  return (
    <div className="container w-full max-w-6xl px-3 sm:px-5 mx-auto">
      <Skeleton className="h-8 w-64 mb-4" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-37.5 w-full" />
        ))}
      </div>
    </div>
  );
}

// The static slider shows immediately; the API-backed sections stream in
// behind their own skeletons instead of blocking the whole page.
export default function Home() {
  return (
    <>
      <JsonLd data={websiteJsonLd} />
      {/* Every page needs one h1; the design has no visible headline here. */}
      <h1 className="sr-only">
        {SITE_NAME}: shop groceries, electronics and fashion online in Egypt
      </h1>
      <MainSlider />
      <Suspense fallback={<CategoriesSliderSkeleton />}>
        <CategoriesSlider />
      </Suspense>
      <section
        aria-labelledby="featured-products"
        className="container mx-auto w-full max-w-6xl px-3 sm:px-5 mt-6"
      >
        <h2
          id="featured-products"
          className="text-2xl text-stone-600 font-bold pb-2 px-2"
        >
          Featured Products
        </h2>
        <Suspense fallback={<ProductGridSkeleton />}>
          <HomeProducts />
        </Suspense>
      </section>
    </>
  );
}
