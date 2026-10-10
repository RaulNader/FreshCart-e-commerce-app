import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Providers from "@/components/layout/Providers";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "swiper/css";
import { Toaster } from "sonner";

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
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          {children}
          <Toaster position="top-center" richColors duration={3000} />
        </Providers>
      </body>
    </html>
  );
}
