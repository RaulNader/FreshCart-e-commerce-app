"use server";

import { getMyToken } from "@/utilities/getMyToken";

export async function getUserWishlist() {
  const token = await getMyToken();
  if (!token) throw new Error("You should login first");

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    method: "GET",
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });

  const payload = await res.json();
  return payload;
}
