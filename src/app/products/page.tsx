import SingleProducts from "../_Components/SingleProducts/SingleProducts";
import { getAllProducts } from "@/api/allProducts.api";

export const metadata = {
  title: "Products",
  description: "FreshCart - Products",
};

export default async function Products() {
  const data = await getAllProducts();
  return (
    <>
      <div className="container w-full max-w-6xl px-3 sm:px-5 items-center mx-auto py-8">
        <div className="flex flex-wrap ">
          {data.map((product) => {
            return <SingleProducts key={product.id} product={product} />;
          })}
        </div>
      </div>
    </>
  );
}
