import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;
  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isCartPage = pathname === "/cart";
  const isOrdersPage = pathname === "/allorders";
  const isProductDetailsPage =
    pathname.startsWith("/products/") && pathname !== "/products";

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && (isCartPage || isOrdersPage)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!token && isProductDetailsPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/cart", "/allorders", "/login", "/register", "/products/:path*"],
};
