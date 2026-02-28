"use client";

import { addToWishlist } from "@/WishlistActions/addToWishlist";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Heart, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function WishlistBtn({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  async function addProductToWishlist(id: string) {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const res = await addToWishlist(id);

      if (res.status === "success") {
        toast.success(res.message ?? "Product added to wishlist", {
          duration: 2000,
          richColors: true,
          position: "top-center",
        });
        return;
      }

      toast.error(res.message ?? "You can't add product to wishlist", {
        duration: 2000,
        richColors: true,
        position: "top-center",
      });
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to add product to wishlist",
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
      onClick={() => addProductToWishlist(id)}
      className={cn("text-rose-300 bg-gray-600 w-full", className)}
      disabled={isLoading}
      type="button"
      aria-busy={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" />
          Saving...
        </>
      ) : (
        <>
          <Heart className="h-4 w-4" />
          Wishlist
        </>
      )}
    </Button>
  );
}
