"use client";

import {
  clearCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from "@/actions/cart.actions";
import { CartItemCard, CartItemRow } from "@/components/cart/CartItemView";
import { CartCardsSkeleton, CartRowsSkeleton } from "@/components/cart/CartSkeleton";
import CartSummary from "@/components/cart/CartSummary";
import { EmptyState } from "@/components/ui/empty-state";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { countCartItems } from "@/lib/cart";
import type { CartItem, CartResponse } from "@/types/cart.type";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

type PendingAction = { productId: string; type: "update" | "remove" } | null;

const TABLE_HEADINGS = ["Image", "Product", "Quantity", "Price", "Amount", "Action"];

export default function Cart() {
  const { setNumOfItems } = useCart();
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartId, setCartId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [pending, setPending] = useState<PendingAction>(null);
  const [isClearing, setIsClearing] = useState(false);

  const isBusy = pending !== null || isClearing;

  const applyCart = useCallback(
    (cart: CartResponse | null) => {
      const nextItems = cart?.data.products ?? [];
      setItems(nextItems);
      setTotalPrice(cart?.data.totalCartPrice ?? 0);
      setCartId(cart?.cartId ?? "");
      setNumOfItems(countCartItems(nextItems));
    },
    [setNumOfItems],
  );

  useEffect(() => {
    async function loadCart() {
      try {
        const res = await getCart();
        if (res.ok) applyCart(res.data);
        else setError(res.message);
      } catch {
        setError("Failed to load cart.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadCart();
  }, [applyCart]);

  async function runItemAction(
    productId: string,
    type: "update" | "remove",
    action: () => ReturnType<typeof updateCartItem>,
    successMessage: string,
  ) {
    setPending({ productId, type });

    try {
      const res = await action();
      if (!res.ok) {
        toast.error(res.message);
        return;
      }
      toast.success(successMessage);
      applyCart(res.data);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setPending(null);
    }
  }

  function handleUpdate(productId: string, count: number) {
    void runItemAction(
      productId,
      "update",
      () => updateCartItem(productId, count),
      "Product quantity is updated",
    );
  }

  function handleRemove(productId: string) {
    void runItemAction(
      productId,
      "remove",
      () => removeCartItem(productId),
      "Product removed from your cart",
    );
  }

  async function handleClear() {
    setIsClearing(true);

    try {
      const res = await clearCart();
      if (!res.ok) {
        toast.error(res.message);
        return;
      }
      toast.success("All Products are cleared");
      applyCart(null);
    } catch {
      toast.error("Products cannot be cleared");
    } finally {
      setIsClearing(false);
    }
  }

  function itemProps(item: CartItem) {
    const isCurrent = pending?.productId === item.product._id;
    return {
      item,
      disabled: isBusy,
      isUpdating: isCurrent && pending?.type === "update",
      isRemoving: isCurrent && pending?.type === "remove",
      onUpdate: handleUpdate,
      onRemove: handleRemove,
    };
  }

  const hasItems = !isLoading && !error && items.length > 0;

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-5 mt-6 mb-10">
      <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
      <div
        className={
          hasItems
            ? "lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-4 lg:items-start"
            : ""
        }
      >
        <div className="bg-white rounded-xl border border-default shadow-xs overflow-hidden">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm lg:text-base text-left rtl:text-right text-body">
              <thead className="bg-neutral-secondary-medium border-b border-default-medium">
                <tr className="text-gray-700">
                  {TABLE_HEADINGS.map((heading) => (
                    <th
                      key={heading}
                      scope="col"
                      className="px-4 lg:px-6 py-3 font-medium"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <CartRowsSkeleton />
                ) : (
                  items.map((item) => (
                    <CartItemRow key={item.product._id} {...itemProps(item)} />
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="md:hidden p-3 space-y-3">
            {isLoading ? (
              <CartCardsSkeleton />
            ) : (
              items.map((item) => (
                <CartItemCard key={item.product._id} {...itemProps(item)} />
              ))
            )}
          </div>

          {!isLoading && error && (
            <p className="px-4 py-4 text-red-500 font-medium">{error}</p>
          )}

          {!isLoading && !error && items.length === 0 && (
            <EmptyState
              icon={ShoppingCart}
              title="Your cart is empty"
              description="Browse our products and add something you like."
              action={{ href: "/products", label: "Shop now" }}
            />
          )}
        </div>

        {hasItems && (
          <CartSummary
            cartId={cartId}
            totalPrice={totalPrice}
            disabled={isBusy}
            isClearing={isClearing}
            onClear={handleClear}
          />
        )}
      </div>
    </div>
  );
}
