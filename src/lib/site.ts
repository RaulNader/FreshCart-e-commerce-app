export const SITE_NAME = "FreshCart";

export const SITE_DESCRIPTION =
  "Shop groceries, electronics, fashion and more online at FreshCart. Fast delivery in Egypt with card or cash on delivery.";

/** Absolute site origin, used for canonical URLs, Open Graph and the sitemap. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.NEXTAUTH_URL ??
  "http://localhost:3000"
).replace(/\/$/, "");

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Metadata for pages that only make sense for one logged-in user. */
export const PRIVATE_PAGE_ROBOTS = { index: false, follow: false } as const;
