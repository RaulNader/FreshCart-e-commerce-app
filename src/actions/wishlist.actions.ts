"use server";

import { runAction } from "@/lib/action-result";
import { apiFetch } from "@/lib/api";
import type {
  WishlistMutationResponse,
  WishlistResponse,
} from "@/types/wishlist.type";

export async function getWishlist() {
  return runAction(() =>
    apiFetch<WishlistResponse>("/wishlist", { auth: true, cache: "no-store" }),
  );
}

export async function addToWishlist(productId: string) {
  return runAction(() =>
    apiFetch<WishlistMutationResponse>("/wishlist", {
      auth: true,
      method: "POST",
      body: { productId },
    }),
  );
}

export async function removeFromWishlist(productId: string) {
  return runAction(() =>
    apiFetch<WishlistMutationResponse>(
      `/wishlist/${encodeURIComponent(productId)}`,
      { auth: true, method: "DELETE" },
    ),
  );
}
