"use server";

import { runAction } from "@/lib/action-result";
import { apiFetch } from "@/lib/api";
import { registerSchema, type RegisterValues } from "@/schemas/register.schema";

export async function registerUser(values: RegisterValues) {
  return runAction(async () => {
    const parsed = registerSchema.safeParse(values);
    if (!parsed.success) {
      throw new Error(parsed.error.issues[0]?.message ?? "Invalid data");
    }

    await apiFetch("/auth/signup", { method: "POST", body: parsed.data });
  });
}
