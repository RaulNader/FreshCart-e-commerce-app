import "server-only";

import { apiFetch } from "@/lib/api";
import type { ListResponse } from "@/types/api.type";
import type { Brand, Category } from "@/types/product.type";
import { getAllProducts } from "./products.service";

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

function uniqueById<T extends { _id: string; name: string }>(items: T[]) {
  const byId = new Map(items.map((item) => [item._id, item]));
  return [...byId.values()].sort((a, b) => a.name.localeCompare(b.name));
}

// Most brands and categories in the Route API have no products at all.
// Each product embeds its brand and category, so building the lists from
// the products shows only the ones a shopper can actually buy from.

/** Categories that have at least one product, sorted by name. */
export async function getActiveCategories() {
  const products = await getAllProducts();
  return uniqueById(products.map((product) => product.category));
}

/** Brands that have at least one product, sorted by name. */
export async function getActiveBrands() {
  const products = await getAllProducts();
  return uniqueById(
    products.flatMap((product) => (product.brand ? [product.brand] : [])),
  );
}
