"use client";

import { getUserCart } from "@/CartActions/getUserCart";
import { removeCartItem } from "@/CartActions/removeCartItem";
import { updateCartItems } from "@/CartActions/updateCartItems";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { removeAllProducts } from "@/CartActions/removeAllProdcuts";
import { CartContext } from "@/context/CartContext";
import type { Cart, ProductCartType } from "@/types/cart.type";
import Link from "next/link";

//! Main Cart component
export default function Cart() {
  const [products, setProducts] = useState<ProductCartType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [disabledBtn, setDisabledbtn] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [currentAction, setCurrentAction] = useState<
    "update" | "remove" | null
  >(null);
  const [isClearingAll, setIsClearingAll] = useState(false);
  const { setNumOfItems } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartId, setCartId] = useState("");

  // Showing numbers of products in Cart
  function getItemsCountFromProducts(products: ProductCartType[]) {
    return products.reduce((total, product) => total + product.count, 0);
  }

  // Remove all products from cart
  async function removeAllItems() {
    setDisabledbtn(true);
    setIsClearingAll(true);
    setCurrentId(null);
    setCurrentAction(null);
    const res = await removeAllProducts();
    const isSuccess = res?.status === "success" || res?.message === "success";

    try {
      if (isSuccess) {
        toast.success("All Products are cleared", {
          duration: 3000,
          position: "top-center",
          richColors: true,
        });
        setNumOfItems(0);
        setProducts([]);
      } else {
        toast.error(res?.message ?? "Products cannot be cleared", {
          duration: 3000,
          position: "top-center",
          richColors: true,
        });
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Products cannot be cleared",
        {
          duration: 3000,
          position: "top-center",
          richColors: true,
        },
      );
    } finally {
      setIsClearingAll(false);
      setDisabledbtn(false);
    }
  }

  // Update items in the cart
  async function updateInCart(id: string, count: number) {
    setDisabledbtn(true);
    setCurrentId(id);
    setCurrentAction("update");

    try {
      const res = await updateCartItems(id, count);

      if (res.status === "success") {
        toast.success("Product quantity is updated", {
          duration: 3000,
          position: "top-center",
          richColors: true,
        });
        const nextProducts = res.data?.products ?? [];
        setProducts(nextProducts);
        setTotalPrice(res.data?.totalCartPrice ?? 0);
        setNumOfItems(getItemsCountFromProducts(nextProducts));
      } else {
        toast.error(res.message ?? "Product quantity cannot be updated", {
          duration: 3000,
          position: "top-center",
          richColors: true,
        });
      }
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Product quantity cannot be updated",
        {
          duration: 3000,
          position: "top-center",
          richColors: true,
        },
      );
    } finally {
      setDisabledbtn(false);
      setCurrentAction(null);
      setCurrentId(null);
    }
  }

  // Remove per item in the cart
  async function removeItemFromCart(id: string) {
    setDisabledbtn(true);
    setCurrentId(id);
    setCurrentAction("remove");

    try {
      const res = await removeCartItem(id);

      if (res.status === "success") {
        toast.success("Product removed from your cart", {
          duration: 3000,
          position: "top-center",
          richColors: true,
        });
        const nextProducts = res.data?.products ?? [];
        setProducts(nextProducts);
        setTotalPrice(res.data?.totalCartPrice ?? 0);
        setNumOfItems(getItemsCountFromProducts(nextProducts));
      } else {
        toast.error(res.message ?? "Product cannot be removed right now", {
          duration: 3000,
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
          duration: 3000,
          position: "top-center",
          richColors: true,
        },
      );
    } finally {
      setDisabledbtn(false);
      setCurrentAction(null);
      setCurrentId(null);
    }
  }

  // Showing cart products
  useEffect(() => {
    async function userCartProducts() {
      const res = (await getUserCart()) as Cart;
      setIsLoading(true);
      setError("");
      setCartId(res.cartId);

      try {
        //? api from UserCart
        // console.log(res);
        if (res.status === "success") {
          const nextProducts = res.data?.products ?? [];
          setProducts(nextProducts);
          setTotalPrice(res.data.totalCartPrice);
          setNumOfItems(getItemsCountFromProducts(nextProducts));
          return;
        }
        setError("Failed to load cart.");
      } catch (err) {
        setNumOfItems(0);
        setProducts([]);
        setError(err instanceof Error ? err.message : "Failed to load cart.");
      } finally {
        setIsLoading(false);
      }
    }

    void userCartProducts();
  }, [setNumOfItems]);

  // Quantity controls
  function renderQuantityControls({
    productId,
    count,
    isUpdatingCurrentProduct,
    idPrefix,
  }: {
    productId: string;
    count: number;
    isUpdatingCurrentProduct: boolean;
    idPrefix: string;
  }) {
    const counterInputId = `${idPrefix}-counter-input-${productId}`;
    const decrementButtonId = `${idPrefix}-decrement-button-${productId}`;
    const incrementButtonId = `${idPrefix}-increment-button-${productId}`;

    return (
      <form className="w-fit">
        <label htmlFor={counterInputId} className="sr-only">
          Choose quantity:
        </label>
        <div className="relative flex items-center">
          <button
            onClick={() => updateInCart(productId, count - 1)}
            disabled={disabledBtn}
            type="button"
            id={decrementButtonId}
            data-input-counter-decrement={counterInputId}
            className="hover:bg-emerald-100 flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6"
          >
            <svg
              className="w-3 h-3 text-heading"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14"
              />
            </svg>
          </button>

          {isUpdatingCurrentProduct ? (
            <Loader2 className="mx-2 animate-spin" />
          ) : (
            <span className="mx-2 rounded-xl p-1.5 bg-mauve-200">{count}</span>
          )}

          <button
            onClick={() => updateInCart(productId, count + 1)}
            disabled={disabledBtn}
            type="button"
            id={incrementButtonId}
            data-input-counter-increment={counterInputId}
            className="hover:bg-emerald-100 flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6"
          >
            <svg
              className="w-3 h-3 text-heading"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14m-7 7V5"
              />
            </svg>
          </button>
        </div>
      </form>
    );
  }

  function getProductActionState(productId: string) {
    const isCurrentProduct = currentId === productId;
    const isUpdatingCurrentProduct =
      isCurrentProduct && currentAction === "update" && disabledBtn;
    const isRemovingCurrentProduct =
      isCurrentProduct && currentAction === "remove" && disabledBtn;

    return { isUpdatingCurrentProduct, isRemovingCurrentProduct };
  }

  const hasProducts = !isLoading && !error && products.length > 0;

  return (
    <>
      <div className="w-full max-w-6xl mx-auto px-3 sm:px-5 mt-6 mb-10">
        <div
          className={hasProducts ? "lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-4 lg:items-start" : ""}
        >
          <div className="bg-white rounded-xl border border-default shadow-xs overflow-hidden">
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm lg:text-base text-left rtl:text-right text-body">
                <thead className="bg-neutral-secondary-medium border-b border-default-medium">
                  <tr className="text-gray-700">
                    <th scope="col" className="px-4 lg:px-6 py-3 font-medium">
                      Image
                    </th>
                    <th scope="col" className="px-4 lg:px-6 py-3 font-medium">
                      Product
                    </th>
                    <th scope="col" className="px-4 lg:px-6 py-3 font-medium">
                      Quantity
                    </th>
                    <th scope="col" className="px-4 lg:px-6 py-3 font-medium">
                      Price
                    </th>
                    <th scope="col" className="px-4 lg:px-6 py-3 font-medium">
                      Amount
                    </th>
                    <th scope="col" className="px-4 lg:px-6 py-3 font-medium">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading &&
                    Array.from({ length: 4 }).map((_, index) => (
                      <tr
                        key={`cart-skeleton-desktop-${index}`}
                        className="border-b border-default"
                      >
                        <td className="p-4">
                          <Skeleton className="h-16 w-16 rounded-md" />
                        </td>
                        <td className="px-4 lg:px-6 py-4">
                          <Skeleton className="h-4 w-40" />
                        </td>
                        <td className="px-4 lg:px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Skeleton className="h-6 w-6 rounded-full" />
                            <Skeleton className="h-4 w-6" />
                            <Skeleton className="h-6 w-6 rounded-full" />
                          </div>
                        </td>
                        <td className="px-4 lg:px-6 py-4">
                          <Skeleton className="h-4 w-16" />
                        </td>
                        <td className="px-4 lg:px-6 py-4">
                          <Skeleton className="h-4 w-20" />
                        </td>
                        <td className="px-4 lg:px-6 py-4">
                          <Skeleton className="h-8 w-16 rounded-xl" />
                        </td>
                      </tr>
                    ))}

                  {!isLoading &&
                    products.map((cartProduct) => {
                      const { product, count, price } = cartProduct;
                      const productId = product._id;
                      const {
                        isUpdatingCurrentProduct,
                        isRemovingCurrentProduct,
                      } = getProductActionState(productId);

                      return (
                        <tr
                          key={`desktop-${productId}`}
                          className="border-b border-default hover:bg-neutral-secondary-medium"
                        >
                          <td className="p-4">
                            <Image
                              className="w-16 md:w-20 max-w-full max-h-full"
                              src={product.imageCover}
                              alt="product-img"
                              priority
                              width={200}
                              height={200}
                            />
                          </td>
                          <td className="px-4 lg:px-6 py-4 font-semibold text-heading">
                            {product.title}
                          </td>
                          <td className="px-4 lg:px-6 py-4">
                            {renderQuantityControls({
                              productId,
                              count,
                              isUpdatingCurrentProduct,
                              idPrefix: "desktop",
                            })}
                          </td>
                          <td className="px-4 lg:px-6 py-4 font-semibold text-blue-500">
                            {price} EGP
                          </td>
                          <td className="px-4 lg:px-6 py-4 font-semibold text-[#EFBF04]">
                            {count > 1 ? `${count * price} EGP` : "-----"}
                          </td>
                          <td className="px-4 lg:px-6 py-4">
                            <button
                              onClick={() => removeItemFromCart(productId)}
                              disabled={disabledBtn}
                              className="inline-flex items-center gap-1 font-medium rounded-xl text-red-500 hover:bg-mauve-200 p-1.5 hover:underline disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:no-underline disabled:hover:bg-transparent"
                            >
                              {isRemovingCurrentProduct ? (
                                <Loader2 className="animate-spin" />
                              ) : (
                                <>
                                  <Trash2 className="h-4 w-4" />
                                  Remove
                                </>
                              )}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            {/* Skeleton-Section */}
            <div className="md:hidden p-3 space-y-3">
              {isLoading &&
                Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={`cart-skeleton-mobile-${index}`}
                    className="border border-default rounded-lg p-3 bg-white"
                  >
                    <div className="flex gap-3">
                      <Skeleton className="h-16 w-16 rounded-md" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <Skeleton className="h-4 w-6" />
                        <Skeleton className="h-6 w-6 rounded-full" />
                      </div>
                      <Skeleton className="h-8 w-16 rounded-xl" />
                    </div>
                  </div>
                ))}

              {!isLoading &&
                products.map((cartProduct) => {
                  const { product, count, price } = cartProduct;
                  const productId = product._id;
                  const { isUpdatingCurrentProduct, isRemovingCurrentProduct } =
                    getProductActionState(productId);

                  return (
                    <div
                      key={`mobile-${productId}`}
                      className="border border-default rounded-lg p-3 bg-white"
                    >
                      <div className="flex items-start gap-3">
                        <Image
                          className="w-16 h-16 object-cover rounded-md"
                          src={product.imageCover}
                          alt="product-img"
                          priority
                          width={200}
                          height={200}
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-heading line-clamp-2">
                            {product.title}
                          </p>
                          <p className="text-blue-500 font-semibold">
                            {price} EGP
                          </p>
                          <p className="text-[#EFBF04] font-medium text-sm">
                            Amount:{" "}
                            {count > 1 ? `${count * price} EGP` : "-----"}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        {renderQuantityControls({
                          productId,
                          count,
                          isUpdatingCurrentProduct,
                          idPrefix: "mobile",
                        })}
                        <button
                          onClick={() => removeItemFromCart(productId)}
                          disabled={disabledBtn}
                          className="inline-flex items-center gap-1 text-sm font-medium rounded-xl text-red-500 hover:bg-mauve-200 p-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isRemovingCurrentProduct ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            <>
                              <Trash2 className="h-4 w-4" />
                              Remove
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>

            {!isLoading && error && (
              <p className="px-4 py-4 text-red-500 font-medium">{error}</p>
            )}

            {!isLoading && !error && products.length === 0 && (
              <p className="px-4 py-6 text-body text-lg sm:text-xl text-red-400 text-center font-bold">
                Your cart is empty, add some products
              </p>
            )}
          </div>

          {hasProducts && (
            <div className="bg-white rounded-xl border border-default shadow-xs p-4 flex flex-col gap-4 lg:sticky lg:top-24">
              <h1 className="text-2xl font-bold text-heading">Summary</h1>
              <div className="rounded-lg border border-default p-4">
                <p className="text-sm text-muted-foreground">Total Price</p>
                <p className="mt-1 text-2xl font-bold text-heading">
                  {totalPrice} EGP
                </p>
              </div>

              <div className="mt-auto space-y-2">
                <Button asChild className="w-full">
                  <Link href={`/checkout/${cartId}`}>Check Out</Link>
                </Button>
                <Button
                  onClick={removeAllItems}
                  disabled={disabledBtn || isClearingAll}
                  className="w-full text-red-400 bg-transparent hover:bg-mauve-200"
                  type="button"
                >
                  {isClearingAll ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Clearing...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      Clear All Products
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
