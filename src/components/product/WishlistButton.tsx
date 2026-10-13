"use client";

import { Button } from "@/components/ui/button";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";
import { Heart, Loader2 } from "lucide-react";
import { useState } from "react";

export default function WishlistButton({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { isSaved, toggle } = useWishlist();
  const saved = isSaved(id);

  async function handleClick() {
    if (isLoading) return;
    setIsLoading(true);
    await toggle(id);
    setIsLoading(false);
  }

  return (
    <Button
      onClick={handleClick}
      className={cn("text-rose-300 bg-gray-600 w-full min-w-0", className)}
      disabled={isLoading}
      type="button"
      aria-busy={isLoading}
      aria-pressed={saved}
      title={saved ? "Remove from wishlist" : "Add to wishlist"}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" />
          Saving...
        </>
      ) : (
        <>
          <Heart className={cn("h-4 w-4", saved && "fill-current")} />
          {saved ? "Saved" : "Wishlist"}
        </>
      )}
    </Button>
  );
}
