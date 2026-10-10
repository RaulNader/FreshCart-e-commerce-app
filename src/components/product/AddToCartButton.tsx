"use client";
import { addToCart } from "@/actions/cart.actions";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { countCartItems } from "@/lib/cart";
import { cn } from "@/lib/utils";
import { Loader2, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AddToCartButton({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { setNumOfItems } = useCart();

  async function handleClick() {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const res = await addToCart(id);

      if (!res.ok) {
        toast.error(res.message);
        return;
      }

      toast.success(res.data.message ?? "Product added to cart");
      setNumOfItems(countCartItems(res.data.data.products));
    } catch {
      toast.error("Failed to add product to cart");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      onClick={handleClick}
      className={cn("text-emerald-300 bg-gray-600 w-full min-w-0", className)}
      disabled={isLoading}
      type="button"
      aria-busy={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" />
          Adding...
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </>
      )}
    </Button>
  );
}
