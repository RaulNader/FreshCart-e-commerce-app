import { z } from "zod";

export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Invalid email format")
  .regex(/^[^\s@]+@gmail\.com$/i, "Only Gmail addresses are allowed");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    "Password must include uppercase, lowercase, number, and special character",
  );

export const egyptPhoneSchema = z
  .string()
  .min(1, "Phone number is required")
  .regex(
    /^(?:\+20|0)?1[0125]\d{8}$/,
    "Invalid Egyptian mobile number (must start with 010, 011, 012, or 015)",
  );

export const requiredText = z.string().nonempty("This field can't be empty");
