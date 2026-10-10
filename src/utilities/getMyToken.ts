import "server-only";

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMyToken() {
  const secret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;
  if (!secret) return null;

  const cookieStore = await cookies();
  const sessionToken =
    cookieStore.get("__Secure-next-auth.session-token")?.value ??
    cookieStore.get("next-auth.session-token")?.value;

  if (!sessionToken) return null;

  const token = await decode({
    token: sessionToken,
    secret,
  });

  return token?.token;
}
