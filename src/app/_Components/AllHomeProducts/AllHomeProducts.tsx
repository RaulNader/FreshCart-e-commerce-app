import { getAllProducts } from "@/api/allProducts.api";
import SingleProducts from "../SingleProducts/SingleProducts";
import { Product } from "@/types/prodcut.type";

export default async function AllHomeProducts() {
  const data = await getAllProducts();

  return (
    <>
      <div className="container mx-auto w-[80%] mt-6">
        <div className="flex flex-wrap">
          {data.map((product: Product) => {
            return <SingleProducts product={product} key={product.id} />;
          })}
        </div>
      </div>
    </>
  );
}
