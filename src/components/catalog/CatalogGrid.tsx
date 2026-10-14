import Image from "next/image";
import Link from "next/link";

export interface CatalogItem {
  id: string;
  name: string;
  image: string;
  href: string;
}

/** Grid of brand or category cards, each linking to its product listing. */
export default function CatalogGrid({ items }: { items: CatalogItem[] }) {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <li key={item.id}>
          <Link
            href={item.href}
            className="h-full bg-white rounded-xl border border-default shadow-xs p-4 flex flex-col items-center gap-3 hover:shadow-md hover:border-emerald-300 transition"
          >
            {/* The name below already labels the link, so the logo is decorative. */}
            <Image
              src={item.image}
              alt=""
              width={140}
              height={140}
              className="w-24 h-24 object-contain"
            />
            <h2 className="text-base font-semibold text-center">{item.name}</h2>
          </Link>
        </li>
      ))}
    </ul>
  );
}
