"use server";
import { getMyToken } from "@/utilities/getMyToken";

export async function addToCart(id: string) {
  const token = await getMyToken();

  if (!token) {
    return {
      status: "error",
      message: "You should login first",
    };
  }

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

  if (!response.ok) {
    return {
      status: "error",
      message: payload?.message ?? "Failed to add product to cart",
    };
  }

  return payload;
}
