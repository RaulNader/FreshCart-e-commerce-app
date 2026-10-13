import CategoriesSlider from "@/components/home/CategoriesSlider";
import MainSlider from "@/components/home/MainSlider";
import ProductGrid from "@/components/product/ProductGrid";
import ProductGridSkeleton from "@/components/product/ProductGridSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { getProducts } from "@/services/products.service";
import { Suspense } from "react";

export const metadata = {
  title: "Home",
  description: "FreshCart - Home",
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
      <MainSlider />
      <Suspense fallback={<CategoriesSliderSkeleton />}>
        <CategoriesSlider />
      </Suspense>
      <div className="container mx-auto w-full max-w-6xl px-3 sm:px-5 mt-6">
        <Suspense fallback={<ProductGridSkeleton />}>
          <HomeProducts />
        </Suspense>
      </div>
    </>
  );
}
