import { absoluteUrl } from "@/lib/site";
import type { MetadataRoute } from "next";

// Served at /robots.txt.
// Private pages (cart, login, orders...) are NOT disallowed here on purpose:
// they send a noindex tag instead, and a crawler blocked by robots.txt would
// never see that tag and could still list the bare URL.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
