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
import type { Product } from "@/types/product.type";
import AddToCartButton from "./AddToCartButton";
import WishlistButton from "./WishlistButton";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="p-2 h-full">
      <Card className="py-1 bg-blend-saturation shadow-xl border-2 hover h-full flex flex-col">
        <CardHeader>
          <CardTitle>
            <Link href={`/products/${product.id}`}>
              <Image
                src={product.imageCover}
                alt={product.title}
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
          <h3 className="font-semibold text-xl text-neutral-600 line-clamp-1">
            <Link
              href={`/products/${product.id}`}
              className="hover:underline hover:text-blue-600"
            >
              {product.title}
            </Link>
          </h3>
        </CardContent>
        <CardFooter>
          <div className="w-full flex mt-[-15] justify-between text-sm">
            <p>Price: {product.price} EGP</p>
            <p>
              <span className="sr-only">Rated </span>
              {product.ratingsAverage}
              <span className="sr-only"> out of 5</span>
              <i
                className="fas fa-star text-yellow-400 px-0.5"
                aria-hidden="true"
              ></i>
            </p>
          </div>
        </CardFooter>
        <div className="mt-[-12] grid grid-cols-2 gap-2 px-1 pb-1">
          <AddToCartButton
            id={product.id}
            className="w-full min-w-0 justify-center px-2 text-sm"
          />
          <WishlistButton
            id={product.id}
            className="w-full min-w-0 justify-center px-2 text-sm"
          />
        </div>
      </Card>
    </article>
  );
}
