import AddToCartButton from "@/components/product/AddToCartButton";
import ProductGrid from "@/components/product/ProductGrid";
import WishlistButton from "@/components/product/WishlistButton";
import {
  getProduct,
  getRelatedProducts,
} from "@/services/products.service";
import Image from "next/image";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Product Details",
  description: "FreshCart - Product Details",
};

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await getProduct(id);
  if (!product) notFound();

  const relatedProducts = await getRelatedProducts(product.category._id);

  return (
    <>
      <div className="container w-full max-w-6xl px-3 sm:px-5 mx-auto my-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="w-full max-w-xs bg-white rounded-xl border border-default p-3 shadow-sm">
            <Image
              src={product.imageCover}
              className="w-full h-auto rounded-lg object-cover"
              alt={product.title}
              width={500}
              height={500}
              loading="eager"
            />
          </div>

          <div className="w-full max-w-2xl bg-white rounded-xl border border-default p-4 md:p-5 shadow-sm">
            <h1 className="text-2xl sm:text-3xl font-stretch-100%">
              {product.title}
            </h1>
            <p className="text-gray-400">{product.description}</p>
            <h2 className="text-xl text-emerald-400 my-2">
              {product.category.name}
            </h2>
            <h3 className="text-blue-500">Avaliable: {product.quantity} </h3>

            <div className="w-full flex justify-between my-2">
              <span className="font-bold">Price: {product.price} EGP </span>
              <span>
                {product.ratingsAverage}
                <i className="fas fa-star text-yellow-400 px-0.5"></i>
              </span>
            </div>
            <div className="flex gap-2">
              <AddToCartButton id={product.id} className="flex-1 min-w-0" />
              <WishlistButton id={product.id} className="flex-1 min-w-0" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto w-full max-w-6xl px-3 sm:px-5 mt-6">
        <h1 className="font-bold text-center mt-2.5 text-2xl">
          Related Products
        </h1>
        <ProductGrid products={relatedProducts} />
      </div>
    </>
  );
}
