import "server-only";

import { apiFetch } from "@/lib/api";
import type { ListResponse } from "@/types/api.type";
import type { Brand, Category } from "@/types/product.type";

const REVALIDATE_SECONDS = 60;

export async function getCategories() {
  const { data } = await apiFetch<ListResponse<Category>>("/categories", {
    next: { revalidate: REVALIDATE_SECONDS },
  });
  return data;
}

export async function getBrands() {
  const { data } = await apiFetch<ListResponse<Brand>>("/brands", {
    next: { revalidate: REVALIDATE_SECONDS },
  });
  return data;
}
