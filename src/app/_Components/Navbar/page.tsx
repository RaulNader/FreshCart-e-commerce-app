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
  Menu,
  ReceiptText,
  ShoppingCart,
  Tags,
  X,
} from "lucide-react";
import logo from "../../../assets/images/freshcart-logo.svg";
import { CartContext } from "@/context/CartContext";
import { useContext, useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const { numOfItems } = useContext(CartContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function logOut() {
    signOut({
      callbackUrl: "/login",
    });
  }

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  return (
    <nav className="sticky inset-s-0 top-0 inset-e-0 z-50 bg-gray-700 text-white font-medium shadow-sm">
      <div className="container w-full max-w-6xl mx-auto px-3 sm:px-5 py-3">
        <div className="flex items-center justify-between lg:hidden">
          <Link href="/" onClick={closeMobileMenu}>
            <Image
              src={logo}
              alt="Fresh Cart Logo"
              loading="eager"
              className="h-8 w-auto bg-white"
            />
          </Link>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-white/30"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <div className="hidden lg:flex lg:items-center lg:justify-between lg:gap-3">
          <ul className="flex gap-x-3 xl:gap-x-4 2xl:gap-x-6 items-center text-sm">
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
                    <span className="hover:bg-red-700 bg-red-500 text-white text-center h-[25px] w-[30px] rounded-xl leading-[25px]">
                      {numOfItems}
                    </span>
                  )}
                </Link>
              </li>
            )}
            {session && (
              <li>
                <Link href="/wishlist" className="inline-flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  Wishlist
                </Link>
              </li>
            )}
            {session && (
              <li>
                <Link href="/allorders" className="inline-flex items-center gap-1">
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
              <Link href="/categories" className="inline-flex items-center gap-1">
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

          <ul className="flex gap-x-3 xl:gap-x-4 items-center text-sm whitespace-nowrap">
            {!session ? (
              <>
                <li className="hidden xl:block">
                  <Link href="https://www.instagram.com">
                    <i className="fa-brands fa-instagram text-pink-500"></i>
                  </Link>
                </li>
                <li className="hidden xl:block">
                  <Link href="https://www.facebook.com">
                    <i className="fa-brands fa-facebook text-blue-800"></i>
                  </Link>
                </li>
                <li className="hidden xl:block">
                  <Link href="https://www.tiktok.com">
                    <i className="fa-brands fa-tiktok text-gray-800"></i>
                  </Link>
                </li>
                <li className="hidden xl:block">
                  <Link href="https://www.twitter.com">
                    <i className="fa-brands fa-twitter text-blue-400"></i>
                  </Link>
                </li>
                <li className="hidden xl:block">
                  <Link href="https://www.linkedin.com">
                    <i className="fa-brands fa-linkedin text-blue-500"></i>
                  </Link>
                </li>
                <li className="hidden xl:block">
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
                <li className="font-bold text-[#00d9ff] capitalize text-center">
                  hello, {session?.user.name}
                </li>
              </>
            )}
          </ul>
        </div>

        <div
          className={`${isMobileMenuOpen ? "block" : "hidden"} lg:hidden mt-3 border-t border-white/20 pt-3 space-y-3`}
        >
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <Link href="/" className="inline-flex items-center gap-2" onClick={closeMobileMenu}>
                <Home className="h-4 w-4" />
                Home
              </Link>
            </li>
            {session && (
              <li>
                <Link href="/cart" className="inline-flex items-center gap-2" onClick={closeMobileMenu}>
                  <ShoppingCart className="h-4 w-4" />
                  Cart
                  {numOfItems > 0 && (
                    <span className="bg-red-500 text-white text-center h-[22px] min-w-[22px] px-1 rounded-full leading-[22px] text-xs">
                      {numOfItems}
                    </span>
                  )}
                </Link>
              </li>
            )}
            {session && (
              <li>
                <Link href="/wishlist" className="inline-flex items-center gap-2" onClick={closeMobileMenu}>
                  <Heart className="h-4 w-4" />
                  Wishlist
                </Link>
              </li>
            )}
            {session && (
              <li>
                <Link href="/allorders" className="inline-flex items-center gap-2" onClick={closeMobileMenu}>
                  <ReceiptText className="h-4 w-4" />
                  All Orders
                </Link>
              </li>
            )}
            <li>
              <Link href="/products" className="inline-flex items-center gap-2" onClick={closeMobileMenu}>
                <Boxes className="h-4 w-4" />
                Products
              </Link>
            </li>
            <li>
              <Link href="/categories" className="inline-flex items-center gap-2" onClick={closeMobileMenu}>
                <Tags className="h-4 w-4" />
                Categories
              </Link>
            </li>
            <li>
              <Link href="/brands" className="inline-flex items-center gap-2" onClick={closeMobileMenu}>
                <Building2 className="h-4 w-4" />
                Brands
              </Link>
            </li>
          </ul>

          <ul className="flex flex-col gap-2 text-sm border-t border-white/20 pt-3">
            {!session ? (
              <>
                <li>
                  <Link href="/login" onClick={closeMobileMenu}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/register" onClick={closeMobileMenu}>
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      closeMobileMenu();
                      logOut();
                    }}
                    className="inline-flex items-center gap-2 hover:underline hover:text-red-300"
                  >
                    <LogOut className="h-4 w-4" />
                    SignOut
                  </button>
                </li>
                <li className="font-bold text-[#00d9ff] capitalize">
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
