"use client"
import { getUserCart } from "@/CartActions/getUserCart";
import type { Cart } from "@/types/cart.type";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface CartContextType {
  numOfItems: number;
  setNumOfItems: Dispatch<SetStateAction<number>>;
}

const initialCartContext: CartContextType = {
  numOfItems: 0,
  setNumOfItems: () => {},
};

export const CartContext = createContext<CartContextType>(initialCartContext);

interface CartContextProviderProps {
  children: ReactNode;
}

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [numOfItems, setNumOfItems] = useState<number>(0);
  const { status } = useSession();

  useEffect(() => {
    if (status !== "authenticated") return;

    async function getLoggedUserCart() {
      try {
        const res = (await getUserCart()) as Cart;

        if (res.status === "success") {
          let itemsCount = 0;
          res.data.products.forEach((product) => {
            itemsCount += product.count;
          });
          setNumOfItems(itemsCount);
        }
      } catch {
        setNumOfItems(0);
      }
    }

    void getLoggedUserCart();
  }, [status]);

  const contextNumOfItems = status === "authenticated" ? numOfItems : 0;

  return (
    <CartContext.Provider value={{ numOfItems: contextNumOfItems, setNumOfItems }}>
      {children}
    </CartContext.Provider>
  );
}
