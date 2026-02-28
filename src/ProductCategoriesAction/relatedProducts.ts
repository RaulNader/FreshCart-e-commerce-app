"use server";

import type { Product } from "@/types/prodcut.type";

export async function getRelatedProducts(categoryId: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`,
  );

  const payload = (await res.json()) as { data: Product[] };
  return payload;
}
