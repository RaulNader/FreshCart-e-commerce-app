"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
  Boxes,
  Building2,
  Heart,
  Home,
  LogOut,
  ReceiptText,
  ShoppingCart,
  Tags,
} from "lucide-react";
import logo from "../../../assets/images/freshcart-logo.svg";
import { CartContext } from "@/context/CartContext";
import { useContext } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const { numOfItems } = useContext(CartContext);

  function logOut() {
    signOut({
      callbackUrl: "/login",
    });
  }

  return (
    <nav className="sticky inset-s-0 top-0 inset-e-0 z-50 bg-gray-700 text-white font-medium shadow-sm">
      <div className=" container w-full lg:w-[80%] mx-auto flex flex-col lg:flex-row p-4  justify-between items-center">
        <div className="left">
          <ul className="flex gap-x-4 lg:gap-x-6 items-center">
            <li>
              <Link href="/">
                <Image
                  src={logo}
                  alt="Fresh Cart Logo"
                  loading="eager"
                  className="h-8 w-auto bg-white"
                />
              </Link>
            </li>

            <li>
              <Link href="/" className="inline-flex items-center gap-1">
                <Home className="h-4 w-4" />
                Home
              </Link>
            </li>
            {session && (
              <li>
                <Link href="/cart" className="inline-flex items-center gap-1">
                  <ShoppingCart className="h-4 w-4" />
                  Cart:
                  {numOfItems > 0 && (
                    <span className="hover:bg-red-700 bg-red-500  text-white text-center h-[25] w-[30] rounded-xl">
                      {numOfItems}
                    </span>
                  )}
                </Link>
              </li>
            )}
            {session && (
              <li>
                <Link
                  href="/wishlist"
                  className="inline-flex items-center gap-1"
                >
                  <Heart className="h-4 w-4" />
                  Wishlist
                </Link>
              </li>
            )}
            {session && (
              <li>
                <Link
                  href="/allorders"
                  className="inline-flex items-center gap-1"
                >
                  <ReceiptText className="h-4 w-4" />
                  All Orders
                </Link>
              </li>
            )}
            <li>
              <Link href="/products" className="inline-flex items-center gap-1">
                <Boxes className="h-4 w-4" />
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/categories"
                className="inline-flex items-center gap-1"
              >
                <Tags className="h-4 w-4" />
                Categories
              </Link>
            </li>
            <li>
              <Link href="/brands" className="inline-flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                Brands
              </Link>
            </li>
          </ul>
        </div>

        <div className="right">
          <ul className="flex gap-x-4 items-center">
            {!session ? (
              <>
                <li>
                  <Link href="https://www.instagram.com">
                    <i className="fa-brands fa-instagram text-pink-500"></i>
                  </Link>
                </li>
                <li>
                  <Link href="https://www.facebook.com">
                    <i className="fa-brands fa-facebook text-blue-800"></i>
                  </Link>
                </li>
                <li>
                  <Link href="https://www.tiktok.com">
                    <i className="fa-brands fa-tiktok text-gray-800"></i>
                  </Link>
                </li>
                <li>
                  <Link href="https://www.twitter.com">
                    <i className="fa-brands fa-twitter text-blue-400"></i>
                  </Link>
                </li>
                <li>
                  <Link href="https://www.linkedin.com">
                    <i className="fa-brands fa-linkedin text-blue-500"></i>
                  </Link>
                </li>
                <li>
                  <Link href="https://www.youtube.com">
                    <i className="fa-brands fa-youtube text-red-600"></i>
                  </Link>
                </li>
                <li>
                  <Link href="/login">Login</Link>
                </li>
                <li>
                  <Link href="/register">Register</Link>
                </li>
              </>
            ) : (
              <>
                <li
                  className="cursor-pointer hover:underline hover:text-red-300 inline-flex items-center gap-1"
                  onClick={logOut}
                >
                  <LogOut className="h-4 w-4" />
                  SignOut
                </li>
                <li className="font-bold  text-[#00d9ff] capitalize">
                  hello, {session?.user.name}
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
