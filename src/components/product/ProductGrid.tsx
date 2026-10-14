import type { Product } from "@/types/product.type";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <ul className="flex flex-wrap">
      {products.map((product) => (
        <li key={product.id} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
