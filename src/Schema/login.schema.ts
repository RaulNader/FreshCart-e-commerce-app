import { z } from "zod";
const gmailRegex = /^[^\s@]+@gmail\.com$/i;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format")
    .regex(gmailRegex, "Only Gmail addresses are allowed"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      passwordRegex,
      "Password must include uppercase, lowercase, number, and special character",
    ),
});

type LoginSchemaType = z.infer<typeof loginSchema>;
export default LoginSchemaType;
