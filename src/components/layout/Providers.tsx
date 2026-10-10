"use client";

import { CartContextProvider } from "@/context/CartContext";
import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <CartContextProvider>{children}</CartContextProvider>
    </SessionProvider>
  );
}
