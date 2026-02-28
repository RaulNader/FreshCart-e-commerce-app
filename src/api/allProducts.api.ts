import type { Product } from "@/types/prodcut.type";

export async function getAllProducts() {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products`, {
    method: "GET",
    headers: {},
    next: { revalidate: 60 }, //* ISR
  });
  const { data } = (await res.json()) as { data: Product[] };

  return data;
}
