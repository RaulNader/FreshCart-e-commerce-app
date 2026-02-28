"use server";

import checkoutSchemaType from "@/Schema/checkOut.schema";
import { getMyToken } from "@/utilities/getMyToken";

export type PaymentMethod = "credit" | "cash";

export async function checkPayment(
  cartId: string,
  formValues: checkoutSchemaType,
  paymentMethod: PaymentMethod,
) {
  const token = await getMyToken();
  const urlAuth = process.env.NEXTAUTH_URL;

  if (!token) throw new Error("You must Logged in first");

  const endpoint =
    paymentMethod === "credit"
      ? `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${urlAuth}`
      : `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      shippingAddress: formValues,
    }),
  });
  const payload = await res.json();

  return payload;
}
