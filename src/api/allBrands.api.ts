import type { Brand } from "@/types/prodcut.type";

export async function getAllBrands() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands", {
    method: "GET",
    headers: {},
    next: { revalidate: 60 },
  });

  const { data } = (await res.json()) as { data: Brand[] };
  return data;
}
