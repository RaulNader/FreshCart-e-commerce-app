import type { Metadata } from "next";
import Navbar from "./_Components/Navbar/page";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Toaster } from "sonner";
import MySessionProvider from "./MySessionProvider/MySessionProvider";
import { CartContextProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: {
    default: "FreshCart",
    template: "FreshCart - %s",
  },
  description: "FreshCart ecommerce app",
  icons: {
    icon: [{ url: "/icon.svg?v=2", type: "image/svg+xml" }],
    shortcut: "/icon.svg?v=2",
    apple: "/icon.svg?v=2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <MySessionProvider>
          <CartContextProvider>
            <Navbar />
            {children}
            <Toaster />
          </CartContextProvider>
        </MySessionProvider>
      </body>
    </html>
  );
}
