import { PRIVATE_PAGE_ROBOTS } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create a FreshCart account to shop and track your orders.",
  robots: PRIVATE_PAGE_ROBOTS,
};

export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
