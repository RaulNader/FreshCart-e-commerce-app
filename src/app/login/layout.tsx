import { PRIVATE_PAGE_ROBOTS } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your FreshCart account.",
  robots: PRIVATE_PAGE_ROBOTS,
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
