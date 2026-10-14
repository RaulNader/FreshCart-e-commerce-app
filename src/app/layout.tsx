import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Providers from "@/components/layout/Providers";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "swiper/css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  // Resolves relative URLs in canonical, Open Graph and Twitter tags.
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Online Shopping in Egypt`,
    // Page name first: search results cut long titles from the end.
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "online shopping",
    "Egypt",
    "groceries",
    "electronics",
    "fashion",
    "cash on delivery",
  ],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_EG",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
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
      <body className="flex min-h-screen flex-col">
        {/* Lets keyboard and screen reader users jump past the navigation. */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-60 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-gray-900 focus:shadow"
        >
          Skip to main content
        </a>
        <Providers>
          <Navbar />
          {/* flex-1 pushes the footer to the bottom on short pages */}
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <Toaster position="top-center" richColors duration={3000} />
        </Providers>
      </body>
    </html>
  );
}
