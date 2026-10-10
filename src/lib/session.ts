import "server-only";

import { jwtDecode } from "jwt-decode";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import {
  AUTH_SECRET,
  SECURE_SESSION_COOKIE,
  SESSION_COOKIE,
} from "./auth-cookie";

// The Route API token lives inside the NextAuth JWT cookie and never reaches the browser.
export async function getApiToken() {
  if (!AUTH_SECRET) return null;

  const cookieStore = await cookies();
  const sessionToken =
    cookieStore.get(SECURE_SESSION_COOKIE)?.value ??
    cookieStore.get(SESSION_COOKIE)?.value;

  if (!sessionToken) return null;

  const jwt = await decode({ token: sessionToken, secret: AUTH_SECRET });
  return jwt?.token ?? null;
}

export async function getUserId() {
  const token = await getApiToken();
  if (!token) return null;

  const { id, sub } = jwtDecode<{ id?: string; sub?: string }>(token);
  return id ?? sub ?? null;
}
