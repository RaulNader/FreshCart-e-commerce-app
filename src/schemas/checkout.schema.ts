import { z } from "zod";
import { egyptPhoneSchema, requiredText } from "./shared";

export const checkoutSchema = z.object({
  details: requiredText,
  phone: egyptPhoneSchema,
  city: requiredText,
});

export type CheckoutValues = z.infer<typeof checkoutSchema>;
