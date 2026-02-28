import type { Category } from "@/types/category.type";

export async function getAllCategories() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories", {
    method: "GET",
    headers: {},
    next: { revalidate: 60 },
  });

  const { data } = (await res.json()) as { data: Category[] };
  return data;
}
