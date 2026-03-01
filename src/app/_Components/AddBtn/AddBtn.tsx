"use client";
import { addToCart } from "@/CartActions/addToCart";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { Loader2, ShoppingCart } from "lucide-react";
import { useContext, useState } from "react";
import { toast } from "sonner";

export default function AddBtn({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { numOfItems, setNumOfItems } = useContext(CartContext);

  async function addProductToCart(id: string) {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const res = await addToCart(id);

      if (res.status === "success") {
        toast.success(res.message, {
          duration: 2000,
          richColors: true,
          position: "top-center",
        });
        if (typeof res.numOfCartItems === "number") {
          setNumOfItems(res.numOfCartItems);
        } else {
          setNumOfItems(numOfItems + 1);
        }
        return;
      }

      toast.error(res.message ?? "You should login first", {
        duration: 2000,
        richColors: true,
        position: "top-center",
      });
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to add product to cart",
        {
          duration: 2000,
          richColors: true,
          position: "top-center",
        },
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      onClick={() => addProductToCart(id)}
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
