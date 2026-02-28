"use server";
import { getMyToken } from "@/utilities/getMyToken";

export async function addToCart(id: string) {
  const token = await getMyToken();

  if (!token) throw new Error("You must login first");

  const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "POST",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId: id,
    }),
  });

  const payload = await response.json();
  return payload;
}
