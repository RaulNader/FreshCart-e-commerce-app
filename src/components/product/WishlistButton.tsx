"use client";

import { addToWishlist } from "@/actions/wishlist.actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Heart, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function WishlistButton({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const res = await addToWishlist(id);

      if (!res.ok) {
        toast.error(res.message);
        return;
      }

      toast.success(res.data.message ?? "Product added to wishlist");
    } catch {
      toast.error("Failed to add product to wishlist");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      onClick={handleClick}
      className={cn("text-rose-300 bg-gray-600 w-full min-w-0", className)}
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
