import logo from "@/assets/images/freshcart-logo.svg";
import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS, SOCIAL_LINKS } from "./links";

const shopLinks = NAV_LINKS.filter((link) => !link.authOnly);
const accountLinks = NAV_LINKS.filter((link) => link.authOnly);

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: typeof NAV_LINKS;
}) {
  return (
    <div>
      <h2 className="mb-3 font-semibold text-white">{title}</h2>
      <ul className="space-y-2 text-sm">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className="hover:text-emerald-300 hover:underline">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="mt-12 bg-gray-700 text-gray-300">
      <div className="container mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-3 py-10 sm:grid-cols-2 sm:px-5 lg:grid-cols-4">
        <div className="space-y-3 sm:col-span-2">
          <Image
            src={logo}
            alt="Fresh Cart Logo"
            className="h-8 w-auto bg-white"
          />
          <p className="max-w-sm text-sm">
            Fresh groceries, electronics and fashion delivered to your door.
            Pay by card or cash on delivery.
          </p>
          <ul className="flex gap-3 pt-1">
            {SOCIAL_LINKS.map(({ href, label, icon }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white hover:scale-110 transition-transform"
                >
                  <i className={`fa-brands ${icon}`} aria-hidden="true"></i>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <LinkColumn title="Shop" links={shopLinks} />
        <LinkColumn title="My account" links={accountLinks} />
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs">
        © {new Date().getFullYear()} FreshCart. All rights reserved.
      </div>
    </footer>
  );
}
