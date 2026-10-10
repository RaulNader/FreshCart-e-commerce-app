"use server";

import { runAction } from "@/lib/action-result";
import { ApiError, apiFetch } from "@/lib/api";
import type { CartResponse } from "@/types/cart.type";

/** Resolves to null when the user has never created a cart. */
export async function getCart() {
  return runAction(async () => {
    try {
      return await apiFetch<CartResponse>("/cart", {
        auth: true,
        cache: "no-store",
      });
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) return null;
      throw error;
    }
  });
}

export async function addToCart(productId: string) {
  return runAction(() =>
    apiFetch<CartResponse<string>>("/cart", {
      auth: true,
      method: "POST",
      body: { productId },
    }),
  );
}

export async function updateCartItem(productId: string, count: number) {
  return runAction(() =>
    apiFetch<CartResponse>(`/cart/${encodeURIComponent(productId)}`, {
      auth: true,
      method: "PUT",
      body: { count },
    }),
  );
}

export async function removeCartItem(productId: string) {
  return runAction(() =>
    apiFetch<CartResponse>(`/cart/${encodeURIComponent(productId)}`, {
      auth: true,
      method: "DELETE",
    }),
  );
}

export async function clearCart() {
  return runAction(() =>
    apiFetch<{ message: string }>("/cart", { auth: true, method: "DELETE" }),
  );
}
