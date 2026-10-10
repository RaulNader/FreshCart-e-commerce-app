import "server-only";

import { ApiError, apiFetch } from "@/lib/api";
import type { ItemResponse, ListResponse } from "@/types/api.type";
import type { Product } from "@/types/product.type";

const REVALIDATE_SECONDS = 60;

export async function getProducts() {
  const { data } = await apiFetch<ListResponse<Product>>("/products", {
    next: { revalidate: REVALIDATE_SECONDS },
  });
  return data;
}

/** Resolves to null when the id does not match a product. */
export async function getProduct(id: string) {
  try {
    const { data } = await apiFetch<ItemResponse<Product | null>>(
      `/products/${encodeURIComponent(id)}`,
      { next: { revalidate: REVALIDATE_SECONDS } },
    );
    return data;
  } catch (error) {
    if (error instanceof ApiError && [400, 404].includes(error.status)) {
      return null;
    }
    throw error;
  }
}

export async function getRelatedProducts(categoryId: string) {
  const { data } = await apiFetch<ListResponse<Product>>(
    `/products?category[in]=${encodeURIComponent(categoryId)}`,
    { next: { revalidate: REVALIDATE_SECONDS } },
  );
  return data;
}
