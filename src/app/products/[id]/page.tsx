import { getProductDetails } from "@/api/productDetails.api";
import AddBtn from "@/app/_Components/AddBtn/AddBtn";
import SingleProducts from "@/app/_Components/SingleProducts/SingleProducts";
import WishlistBtn from "@/app/_Components/WishlistBtn/WishlistBtn";
import { getRelatedProducts } from "@/ProductCategoriesAction/relatedProducts";
import { Product } from "@/types/prodcut.type";
import Image from "next/image";

export const metadata = {
  title: "Product Details",
  description: "FreshCart - Product Details",
};

export default async function ProdcutDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await getProductDetails(id);

  if (!data) return null;

  // categories related to products
  const res = await getRelatedProducts(data.category._id);

  return (
    <>
      <div className="container w-full max-w-6xl px-3 sm:px-5 mx-auto my-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="w-full max-w-xs bg-white rounded-xl border border-default p-3 shadow-sm">
            <Image
              src={data.imageCover}
              className="w-full h-auto rounded-lg object-cover"
              alt="product-img"
              width={500}
              height={500}
              loading="eager"
            />
          </div>

          <div className="w-full max-w-2xl bg-white rounded-xl border border-default p-4 md:p-5 shadow-sm">
            <h1 className="text-2xl sm:text-3xl font-stretch-100%">
              {data.title}
            </h1>
            <p className="text-gray-400">{data.description}</p>
            <h2 className="text-xl text-emerald-400 my-2">
              {data.category.name}
            </h2>
            <h3 className="text-blue-500">Avaliable: {data.quantity} </h3>

            <div className="w-full flex justify-between my-2">
              <span className="font-bold">Price: {data.price} EGP </span>
              <span>
                {data.ratingsAverage}
                <i className="fas fa-star text-yellow-400 px-0.5"></i>
              </span>
            </div>
            <div className="flex gap-2">
              <AddBtn id={data.id} className="flex-1 min-w-0" />
              <WishlistBtn id={data.id} className="flex-1 min-w-0" />
            </div>
          </div>
        </div>
      </div>
      <>
        <div className="container mx-auto w-full max-w-6xl px-3 sm:px-5 mt-6">
          <h1 className="font-bold text-center mt-2.5 text-2xl">
            Related Products
          </h1>

          <div className="flex flex-wrap">
            {res.data.map((product: Product) => {
              return <SingleProducts product={product} key={product.id} />;
            })}
          </div>
        </div>
      </>
    </>
  );
}
