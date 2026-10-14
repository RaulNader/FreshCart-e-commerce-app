"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { LogOut, Menu, X } from "lucide-react";
import logo from "@/assets/images/freshcart-logo.svg";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { NAV_LINKS, SOCIAL_LINKS } from "./links";

function CartBadge({ count, className }: { count: number; className: string }) {
  if (count <= 0) return null;
  return <span className={className}>{count}</span>;
}

export default function Navbar() {
  const { data: session } = useSession();
  const { numOfItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const visibleLinks = NAV_LINKS.filter((link) => !link.authOnly || session);

  function logOut() {
    signOut({
      callbackUrl: "/login",
    });
  }

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  const logoImage = (
    <Image
      src={logo}
      alt="Fresh Cart Logo"
      loading="eager"
      className="h-8 w-auto bg-white"
    />
  );

  return (
    <header className="sticky inset-s-0 top-0 inset-e-0 z-50 bg-gray-700 text-white font-medium shadow-sm">
      <div className="container w-full max-w-6xl mx-auto px-3 sm:px-5 py-3">
        <div className="flex items-center justify-between lg:hidden">
          <Link href="/" onClick={closeMobileMenu}>
            {logoImage}
          </Link>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-white/30"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <nav
          aria-label="Main"
          className="hidden lg:flex lg:items-center lg:justify-between lg:gap-3"
        >
          <ul className="flex gap-x-3 xl:gap-x-4 2xl:gap-x-6 items-center text-sm">
            <li>
              <Link href="/">{logoImage}</Link>
            </li>
            {visibleLinks.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link href={href} className="inline-flex items-center gap-1">
                  <Icon className="h-4 w-4" />
                  {href === "/cart" ? `${label}:` : label}
                  {href === "/cart" && (
                    <CartBadge
                      count={numOfItems}
                      className="hover:bg-red-700 bg-red-500 text-white text-center h-[25px] w-[30px] rounded-xl leading-[25px]"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="flex gap-x-3 xl:gap-x-4 items-center text-sm whitespace-nowrap">
            {!session ? (
              <>
                {SOCIAL_LINKS.map(({ href, icon }) => (
                  <li key={href} className="hidden xl:block">
                    <Link href={href}>
                      <i className={`fa-brands ${icon}`}></i>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/login">Login</Link>
                </li>
                <li>
                  <Link href="/register">Register</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button
                    type="button"
                    onClick={logOut}
                    className="cursor-pointer hover:underline hover:text-red-300 inline-flex items-center gap-1"
                  >
                    <LogOut className="h-4 w-4" />
                    SignOut
                  </button>
                </li>
                <li className="font-bold text-[#00d9ff] capitalize text-center">
                  hello, {session.user.name}
                </li>
              </>
            )}
          </ul>
        </nav>

        <nav
          id="mobile-menu"
          aria-label="Main"
          className={`${isMobileMenuOpen ? "block" : "hidden"} lg:hidden mt-3 border-t border-white/20 pt-3 space-y-3`}
        >
          <ul className="flex flex-col gap-2 text-sm">
            {visibleLinks.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="inline-flex items-center gap-2"
                  onClick={closeMobileMenu}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                  {href === "/cart" && (
                    <CartBadge
                      count={numOfItems}
                      className="bg-red-500 text-white text-center h-[22px] min-w-[22px] px-1 rounded-full leading-[22px] text-xs"
                    />
                  )}
                </Link>
              </li>
            ))}
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
                  hello, {session.user.name}
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
