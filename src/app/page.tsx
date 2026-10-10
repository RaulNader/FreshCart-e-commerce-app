import CategoriesSlider from "@/components/home/CategoriesSlider";
import MainSlider from "@/components/home/MainSlider";
import ProductGrid from "@/components/product/ProductGrid";
import { getProducts } from "@/services/products.service";

export const metadata = {
  title: "Home",
  description: "FreshCart - Home",
};

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <MainSlider />
      <CategoriesSlider />
      <div className="container mx-auto w-full max-w-6xl px-3 sm:px-5 mt-6">
        <ProductGrid products={products} />
      </div>
    </>
  );
}
