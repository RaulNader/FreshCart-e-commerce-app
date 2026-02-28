import { z } from "zod";
const egyptPhoneRegex = /^(?:\+20|0)?1[0125]\d{8}$/;
const gmailRegex = /^[^\s@]+@gmail\.com$/i;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(5, "Name must be at least 5 characters")
      .max(10, "Name is too long")
      .refine((val) => !/[0-9]/.test(val), "Name should not contain numbers"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email format")
      .regex(gmailRegex, "Only Gmail addresses are allowed"),

    phone: z
      .string()
      .min(1, "Phone number is required")
      .regex(
        egyptPhoneRegex,
        "Invalid Egyptian mobile number (must start with 010, 011, 012, or 015)",
      ),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        passwordRegex,
        "Password must include uppercase, lowercase, number, and special character",
      ),

    rePassword: z.string().min(1, "Please confirm your password"),
  })
  .refine(
    (data) => {
      return data.password === data.rePassword;
    },
    {
      error: "Passwords and repassword not matched",
      path: ["confirmPassword"],
    },
  );

type RegisterSchemaType = z.infer<typeof registerSchema>;
export default RegisterSchemaType;
