"use client";

import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "@/actions/wishlist.actions";
import { useSession } from "next-auth/react";
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface WishlistContextType {
  isSaved: (productId: string) => boolean;
  /** Adds or removes the product. Resolves to true when the API call succeeded. */
  toggle: (productId: string) => Promise<boolean>;
  remove: (productId: string) => Promise<boolean>;
}

const WishlistContext = createContext<WishlistContextType>({
  isSaved: () => false,
  toggle: async () => false,
  remove: async () => false,
});

export function WishlistContextProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const { status } = useSession();

  useEffect(() => {
    if (status !== "authenticated") return;

    void getWishlist().then((res) => {
      if (!res.ok) return;
      setSavedIds(new Set(res.data.data.map((product) => product._id)));
    });
  }, [status]);

  // Logged-out users never see saved hearts, even if old ids are still in state.
  const ids = status === "authenticated" ? savedIds : new Set<string>();

  function isSaved(productId: string) {
    return ids.has(productId);
  }

  async function update(productId: string, remove: boolean) {
    try {
      const res = remove
        ? await removeFromWishlist(productId)
        : await addToWishlist(productId);

      if (!res.ok) {
        toast.error(res.message);
        return false;
      }

      // Both endpoints answer with the full list of saved ids.
      setSavedIds(new Set(res.data.data));
      toast.success(
        res.data.message ??
          (remove ? "Product removed from wishlist" : "Product added to wishlist"),
      );
      return true;
    } catch {
      toast.error("Wishlist cannot be updated right now");
      return false;
    }
  }

  const toggle = (productId: string) => update(productId, ids.has(productId));
  const remove = (productId: string) => update(productId, true);

  return (
    <WishlistContext.Provider value={{ isSaved, toggle, remove }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
