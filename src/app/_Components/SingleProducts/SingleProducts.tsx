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
      <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5 ">
        <div className="p-3 ">
          <Card className="p-1.5 bg-blend-saturation shadow-xl border-2 hover">
            <CardHeader>
              <CardTitle>
                <Link href={`/products/${product.id}`}>
                  <Image
                    src={product.imageCover}
                    alt="product-img"
                    width={500}
                    height={500}
                    className="w-auto h-auto"
                  />
                </Link>
              </CardTitle>
              <CardDescription className="text-emerald-600 font-bold">
                {product.category.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/products/${product.id}`}>
                <p className="font-semibold text-xl hover:underline!  text-neutral-600 line-clamp-1 hover:text-blue-600">
                  {product.title}
                </p>
              </Link>
            </CardContent>
            <CardFooter>
              <div className=" w-full  flex justify-between">
                <span>Price: {product.price} EGP</span>
                <span>
                  {product.ratingsAverage}
                  <i className="fas fa-star text-yellow-400 px-0.5"></i>
                </span>
              </div>
            </CardFooter>
            <div className="flex items-center gap-2">
              <AddBtn id={product.id} className="flex-1" />
              <WishlistBtn id={product.id} className="flex-1" />
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
