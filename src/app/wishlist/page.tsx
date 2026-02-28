"use client";

import { addToCart } from "@/CartActions/addToCart";
import { getUserCart } from "@/CartActions/getUserCart";
import { getUserWishlist } from "@/WishlistActions/getUserWishlist";
import { removeFromWishlist } from "@/WishlistActions/removeFromWishlist";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { Product } from "@/types/prodcut.type";
import type { ProductCartType } from "@/types/cart.type";
import { CartContext } from "@/context/CartContext";
import { Heart, Loader2, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

type GetUserWishlistResponse = {
  status: string;
  message?: string;
  count?: number;
  data?: Product[];
};

function getProductId(product: Product) {
  return product.id ?? product._id;
}

function isProductAlreadyInCart(cartProducts: ProductCartType[], productId: string) {
  return cartProducts.some(
    (item) =>
      item.product?._id === productId || item.product?.id === productId,
  );
}

export default function Wishlist() {
  const { setNumOfItems } = useContext(CartContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isMutating, setIsMutating] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [currentAction, setCurrentAction] = useState<"add" | "remove" | null>(
    null,
  );

  async function loadWishlist() {
    setIsLoading(true);
    setError("");

    try {
      const res = (await getUserWishlist()) as GetUserWishlistResponse;

      if (res.status === "success") {
        setProducts(res.data ?? []);
        return;
      }

      setProducts([]);
      setError(res.message ?? "Failed to load wishlist.");
    } catch (err) {
      setProducts([]);
      setError(err instanceof Error ? err.message : "Failed to load wishlist.");
    } finally {
      setIsLoading(false);
    }
  }

  async function removeWishlistItem(id: string) {
    setIsMutating(true);
    setCurrentId(id);
    setCurrentAction("remove");

    try {
      const res = await removeFromWishlist(id);

      if (res.status === "success") {
        toast.success(res.message ?? "Product removed from wishlist", {
          duration: 2500,
          position: "top-center",
          richColors: true,
        });
        setProducts((prev) =>
          prev.filter((product) => getProductId(product) !== id),
        );
      } else {
        toast.error(res.message ?? "Product cannot be removed right now", {
          duration: 2500,
          position: "top-center",
          richColors: true,
        });
      }
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Product cannot be removed right now",
        {
          duration: 2500,
          position: "top-center",
          richColors: true,
        },
      );
    } finally {
      setIsMutating(false);
      setCurrentId(null);
      setCurrentAction(null);
    }
  }

  async function addWishlistItemToCart(id: string) {
    setIsMutating(true);
    setCurrentId(id);
    setCurrentAction("add");

    try {
      const cartRes = await getUserCart();

      if (cartRes?.status === "success") {
        const cartProducts = cartRes.data?.products ?? [];

        if (isProductAlreadyInCart(cartProducts, id)) {
          toast.info("Product already added to cart", {
            duration: 2500,
            position: "top-center",
            richColors: true,
          });
          return;
        }
      }

      const res = await addToCart(id);

      if (res.status === "success") {
        toast.success(res.message ?? "Product added to cart", {
          duration: 2500,
          position: "top-center",
          richColors: true,
        });

        if (typeof res.numOfCartItems === "number") {
          setNumOfItems(res.numOfCartItems);
        } else {
          setNumOfItems((currentCount: number) => currentCount + 1);
        }
      } else {
        toast.error(
          res.message ?? "Product cannot be added to cart right now",
          {
            duration: 2500,
            position: "top-center",
            richColors: true,
          },
        );
      }
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Product cannot be added to cart right now",
        {
          duration: 2500,
          position: "top-center",
          richColors: true,
        },
      );
    } finally {
      setIsMutating(false);
      setCurrentId(null);
      setCurrentAction(null);
    }
  }

  useEffect(() => {
    void loadWishlist();
  }, []);

  return (
    <div className="w-3/4 mx-auto bg-white mt-9 p-4 rounded-xl border border-default">
      <h1 className="text-2xl text-heading font-semibold mb-4 flex items-center gap-2">
        <Heart className="h-6 w-6 text-rose-500" />
        My Wishlist
      </h1>

      {isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={`wishlist-skeleton-${index}`}
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
      )}

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
            const isCurrent = currentId === productId;

            return (
              <div
                key={productId}
                className="flex items-center justify-between p-3 border border-default rounded-lg"
              >
                <div className="flex items-center gap-3">
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

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <Button
                    type="button"
                    onClick={() => addWishlistItemToCart(productId)}
                    disabled={isMutating}
                    className="bg-emerald-600 text-white hover:bg-emerald-700"
                  >
                    {isMutating && isCurrent && currentAction === "add" ? (
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
                    onClick={() => removeWishlistItem(productId)}
                    disabled={isMutating}
                    className="bg-transparent text-red-500 hover:bg-mauve-200"
                  >
                    {isMutating && isCurrent && currentAction === "remove" ? (
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
  );
}
