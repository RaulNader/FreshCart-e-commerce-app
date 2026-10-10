import { z } from "zod";
import { egyptPhoneSchema, emailSchema, passwordSchema } from "./shared";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(5, "Name must be at least 5 characters")
      .max(10, "Name is too long")
      .refine((val) => !/[0-9]/.test(val), "Name should not contain numbers"),
    email: emailSchema,
    phone: egyptPhoneSchema,
    password: passwordSchema,
    rePassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.rePassword, {
    error: "Passwords and repassword not matched",
    path: ["rePassword"],
  });

export type RegisterValues = z.infer<typeof registerSchema>;
