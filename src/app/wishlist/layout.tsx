import { PRIVATE_PAGE_ROBOTS } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Wishlist",
  robots: PRIVATE_PAGE_ROBOTS,
};

export default function WishlistLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
