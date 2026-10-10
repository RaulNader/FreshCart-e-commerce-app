"use client";

import { addToCart, getCart } from "@/actions/cart.actions";
import {
  getWishlist,
  removeFromWishlist,
} from "@/actions/wishlist.actions";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/context/CartContext";
import { countCartItems } from "@/lib/cart";
import type { Product } from "@/types/product.type";
import { Heart, Loader2, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type PendingAction = { productId: string; type: "add" | "remove" } | null;

function getProductId(product: Product) {
  return product.id ?? product._id;
}

function WishlistSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-3 border border-default rounded-lg"
        >
          <div className="flex items-center gap-3">
            <Skeleton className="h-16 w-16 rounded-md" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-44" />
              <Skeleton className="h-4 w-28" />
            </div>
          </div>
          <Skeleton className="h-9 w-24 rounded-md" />
        </div>
      ))}
    </div>
  );
}

export default function Wishlist() {
  const { setNumOfItems } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [pending, setPending] = useState<PendingAction>(null);

  useEffect(() => {
    async function loadWishlist() {
      try {
        const res = await getWishlist();
        if (res.ok) setProducts(res.data.data);
        else setError(res.message);
      } catch {
        setError("Failed to load wishlist.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadWishlist();
  }, []);

  async function handleRemove(productId: string) {
    setPending({ productId, type: "remove" });

    try {
      const res = await removeFromWishlist(productId);
      if (!res.ok) {
        toast.error(res.message);
        return;
      }
      toast.success(res.data.message ?? "Product removed from wishlist");
      setProducts((prev) =>
        prev.filter((product) => getProductId(product) !== productId),
      );
    } catch {
      toast.error("Product cannot be removed right now");
    } finally {
      setPending(null);
    }
  }

  async function handleAddToCart(productId: string) {
    setPending({ productId, type: "add" });

    try {
      const cartRes = await getCart();
      const isInCart =
        cartRes.ok &&
        cartRes.data?.data.products.some(
          (item) => item.product._id === productId,
        );

      if (isInCart) {
        toast.info("Product already added to cart");
        return;
      }

      const res = await addToCart(productId);
      if (!res.ok) {
        toast.error(res.message);
        return;
      }
      toast.success(res.data.message ?? "Product added to cart");
      setNumOfItems(countCartItems(res.data.data.products));
    } catch {
      toast.error("Product cannot be added to cart right now");
    } finally {
      setPending(null);
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-5 mt-9">
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-default">
        <h1 className="text-2xl text-heading font-semibold mb-4 flex items-center gap-2">
          <Heart className="h-6 w-6 text-rose-500" />
          My Wishlist
        </h1>

        {isLoading && <WishlistSkeleton />}

        {!isLoading && error && (
          <p className="text-red-500 font-medium">{error}</p>
        )}

        {!isLoading && !error && products.length === 0 && (
          <p className="text-body text-xl text-red-400 text-center font-bold py-6">
            Your wishlist is empty, add some products
          </p>
        )}

        {!isLoading && !error && products.length > 0 && (
          <div className="space-y-3">
            {products.map((product) => {
              const productId = getProductId(product);
              const isCurrent = pending?.productId === productId;

              return (
                <div
                  key={productId}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 border border-default rounded-lg"
                >
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Link href={`/products/${productId}`}>
                      <Image
                        src={product.imageCover}
                        alt={product.title}
                        width={96}
                        height={96}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </Link>

                    <div>
                      <Link href={`/products/${productId}`}>
                        <p className="font-semibold text-heading hover:underline line-clamp-1">
                          {product.title}
                        </p>
                      </Link>
                      <p className="text-blue-500 font-medium">
                        {product.price} EGP
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                    <Button
                      type="button"
                      onClick={() => handleAddToCart(productId)}
                      disabled={pending !== null}
                      className="bg-emerald-600 text-white hover:bg-emerald-700 w-full sm:w-auto"
                    >
                      {isCurrent && pending?.type === "add" ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <>
                          <ShoppingCart className="h-4 w-4" />
                          Add to Cart
                        </>
                      )}
                    </Button>

                    <Button
                      type="button"
                      onClick={() => handleRemove(productId)}
                      disabled={pending !== null}
                      className="bg-transparent text-red-500 hover:bg-mauve-200 w-full sm:w-auto"
                    >
                      {isCurrent && pending?.type === "remove" ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <>
                          <Trash2 className="h-4 w-4" />
                          Remove
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
