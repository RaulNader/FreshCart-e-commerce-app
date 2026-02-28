import { z } from "zod";
const egyptPhoneRegex = /^(?:\+20|0)?1[0125]\d{8}$/;

export const checkOutSchema = z.object({
  details: z.string().nonempty("This field can't be empty"),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      egyptPhoneRegex,
      "Invalid Egyptian mobile number (must start with 010, 011, 012, or 015)",
    ),

  city: z.string().nonempty("This field can't be empty"),
});

type checkoutSchemaType = z.infer<typeof checkOutSchema>;
export default checkoutSchemaType;
