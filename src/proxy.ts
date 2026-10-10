import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const AUTH_PAGES = ["/login", "/register"];
const PROTECTED_PREFIXES = [
  "/cart",
  "/wishlist",
  "/allorders",
  "/checkout",
  "/products/",
];

export async function proxy(request: NextRequest) {
  const secureCookieName = "__Secure-next-auth.session-token";
  const regularCookieName = "next-auth.session-token";
  const cookieName = request.cookies.get(secureCookieName)
    ? secureCookieName
    : regularCookieName;

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
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
    "/products/:path*",
  ],
};
