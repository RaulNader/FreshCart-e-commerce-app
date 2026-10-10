"use server";

import { runAction } from "@/lib/action-result";
import { apiFetch } from "@/lib/api";
import { checkoutSchema, type CheckoutValues } from "@/schemas/checkout.schema";
import type {
  CheckoutSessionResponse,
  PaymentMethod,
} from "@/types/order.type";

/** Resolves to the Stripe url for credit payments, or null for cash orders. */
export async function placeOrder(
  cartId: string,
  shippingAddress: CheckoutValues,
  paymentMethod: PaymentMethod,
) {
  return runAction(async () => {
    const parsed = checkoutSchema.safeParse(shippingAddress);
    if (!parsed.success) {
      throw new Error(parsed.error.issues[0]?.message ?? "Invalid address");
    }

    const body = { shippingAddress: parsed.data };
    const encodedCartId = encodeURIComponent(cartId);

    if (paymentMethod === "cash") {
      await apiFetch(`/orders/${encodedCartId}`, {
        auth: true,
        method: "POST",
        body,
      });
      return null;
    }

    const returnUrl = encodeURIComponent(
      process.env.NEXTAUTH_URL ?? "http://localhost:3000",
    );
    const { session } = await apiFetch<CheckoutSessionResponse>(
      `/orders/checkout-session/${encodedCartId}?url=${returnUrl}`,
      { auth: true, method: "POST", body },
    );
    return session.url;
  });
}
