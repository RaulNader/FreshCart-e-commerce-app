"use client";

import { getCart } from "@/actions/cart.actions";
import { countCartItems } from "@/lib/cart";
import { useSession } from "next-auth/react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useEffect, useState } from "react";

interface CartContextType {
  numOfItems: number;
  setNumOfItems: Dispatch<SetStateAction<number>>;
}

const CartContext = createContext<CartContextType>({
  numOfItems: 0,
  setNumOfItems: () => {},
});

export function CartContextProvider({ children }: { children: ReactNode }) {
  const [numOfItems, setNumOfItems] = useState(0);
  const { status } = useSession();

  useEffect(() => {
    if (status !== "authenticated") return;

    void getCart().then((res) => {
      if (!res.ok) return;
      setNumOfItems(res.data ? countCartItems(res.data.data.products) : 0);
    });
  }, [status]);

  const contextNumOfItems = status === "authenticated" ? numOfItems : 0;

  return (
    <CartContext.Provider
      value={{ numOfItems: contextNumOfItems, setNumOfItems }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
