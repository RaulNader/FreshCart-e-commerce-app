import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/prodcut.type";
import AddBtn from "../AddBtn/AddBtn";
import WishlistBtn from "../WishlistBtn/WishlistBtn";

export default async function SingleProducts({
  product,
}: {
  product: Product;
}) {
  return (
    <>
      <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
        <div className="p-2 ">
          <Card className="py-1 bg-blend-saturation shadow-xl border-2 hover h-full flex flex-col">
            <CardHeader>
              <CardTitle>
                <Link href={`/products/${product.id}`}>
                  <Image
                    src={product.imageCover}
                    alt="product-img"
                    width={500}
                    height={500}
                    className="w-full h-auto"
                  />
                </Link>
              </CardTitle>
              <CardDescription className="text-emerald-600 font-bold mb-[-15]  ">
                {product.category.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <Link href={`/products/${product.id}`}>
                <p className="font-semibold  text-xl hover:underline!  text-neutral-600 line-clamp-1 hover:text-blue-600">
                  {product.title}
                </p>
              </Link>
            </CardContent>
            <CardFooter>
              <div className="w-full flex mt-[-15] justify-between text-sm">
                <span>Price: {product.price} EGP</span>
                <span>
                  {product.ratingsAverage}
                  <i className="fas fa-star text-yellow-400 px-0.5"></i>
                </span>
              </div>
            </CardFooter>
            <div className="mt-[-12] grid grid-cols-2 gap-2 px-1 pb-1">
              <AddBtn
                id={product.id}
                className="w-full min-w-0 justify-center px-2 text-sm"
              />
              <WishlistBtn
                id={product.id}
                className="w-full min-w-0 justify-center px-2 text-sm"
              />
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
