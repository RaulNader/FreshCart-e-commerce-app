import { PRIVATE_PAGE_ROBOTS } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart",
  robots: PRIVATE_PAGE_ROBOTS,
};

export default function CartLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
