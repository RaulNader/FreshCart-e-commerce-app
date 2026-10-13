import {
  Boxes,
  Building2,
  Heart,
  Home,
  ReceiptText,
  ShoppingCart,
  Tags,
  type LucideIcon,
} from "lucide-react";

export interface NavLink {
  href: string;
  label: string;
  icon: LucideIcon;
  authOnly?: boolean;
}

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/cart", label: "Cart", icon: ShoppingCart, authOnly: true },
  { href: "/wishlist", label: "Wishlist", icon: Heart, authOnly: true },
  { href: "/allorders", label: "All Orders", icon: ReceiptText, authOnly: true },
  { href: "/products", label: "Products", icon: Boxes },
  { href: "/categories", label: "Categories", icon: Tags },
  { href: "/brands", label: "Brands", icon: Building2 },
];

export const SOCIAL_LINKS = [
  { href: "https://www.instagram.com", label: "Instagram", icon: "fa-instagram text-pink-500" },
  { href: "https://www.facebook.com", label: "Facebook", icon: "fa-facebook text-blue-800" },
  { href: "https://www.tiktok.com", label: "TikTok", icon: "fa-tiktok text-gray-800" },
  { href: "https://www.twitter.com", label: "Twitter", icon: "fa-twitter text-blue-400" },
  { href: "https://www.linkedin.com", label: "LinkedIn", icon: "fa-linkedin text-blue-500" },
  { href: "https://www.youtube.com", label: "YouTube", icon: "fa-youtube text-red-600" },
];
