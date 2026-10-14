import { PRIVATE_PAGE_ROBOTS } from "@/lib/site";
import type { Metadata } from "next";

// The checkout page is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Checkout",
  robots: PRIVATE_PAGE_ROBOTS,
};

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
