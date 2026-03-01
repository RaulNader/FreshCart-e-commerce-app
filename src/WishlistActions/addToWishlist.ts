"use server";

import { getMyToken } from "@/utilities/getMyToken";

export async function addToWishlist(id: string) {
  const token = await getMyToken();
  if (!token) {
    return {
      status: "error",
      message: "You should login first",
    };
  }

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    method: "POST",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId: id,
    }),
  });

  const payload = await res.json();

  if (!res.ok) {
    return {
      status: "error",
      message: payload?.message ?? "Failed to add product to wishlist",
    };
  }

  return payload;
}
