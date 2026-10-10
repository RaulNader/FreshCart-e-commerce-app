import ProductGrid from "@/components/product/ProductGrid";
import { getProducts } from "@/services/products.service";

export const metadata = {
  title: "Products",
  description: "FreshCart - Products",
};

export default async function Products() {
  const products = await getProducts();

  return (
    <div className="container w-full max-w-6xl px-3 sm:px-5 items-center mx-auto py-8">
      <ProductGrid products={products} />
    </div>
  );
}
