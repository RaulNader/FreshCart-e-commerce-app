import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import {
  AUTH_SECRET,
  SECURE_SESSION_COOKIE,
  SESSION_COOKIE,
} from "@/lib/auth-cookie";

const AUTH_PAGES = ["/login", "/register"];
// Product pages stay public so shoppers and search engines can browse them;
// only the actions on them (cart, wishlist) need a login.
const PROTECTED_PREFIXES = ["/cart", "/wishlist", "/allorders", "/checkout"];

export async function proxy(request: NextRequest) {
  const cookieName = request.cookies.get(SECURE_SESSION_COOKIE)
    ? SECURE_SESSION_COOKIE
    : SESSION_COOKIE;

  const token = await getToken({
    req: request,
    secret: AUTH_SECRET,
    cookieName,
  });
  const { pathname } = request.nextUrl;
  const isAuthPage = AUTH_PAGES.includes(pathname);
  const isProtectedPage = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && isProtectedPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cart",
    "/wishlist",
    "/allorders",
    "/checkout/:path*",
    "/login",
    "/register",
  ],
};
