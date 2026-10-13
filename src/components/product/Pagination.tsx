import { productsHref, type ProductQuery } from "@/lib/product-query";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface PaginationProps {
  query: ProductQuery;
  page: number;
  totalPages: number;
}

const itemClass =
  "inline-flex h-9 min-w-9 items-center justify-center rounded-md border border-default bg-white px-3 text-sm hover:bg-emerald-50";

export default function Pagination({ query, page, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const href = (target: number) => productsHref({ ...query, page: target });

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-wrap items-center justify-center gap-2 my-8"
    >
      {page > 1 && (
        <Link href={href(page - 1)} className={itemClass} aria-label="Previous page">
          <ChevronLeft className="h-4 w-4" />
        </Link>
      )}

      {pages.map((target) => (
        <Link
          key={target}
          href={href(target)}
          aria-current={target === page ? "page" : undefined}
          className={cn(
            itemClass,
            target === page &&
              "bg-gray-600 text-white border-gray-600 hover:bg-gray-600",
          )}
        >
          {target}
        </Link>
      ))}

      {page < totalPages && (
        <Link href={href(page + 1)} className={itemClass} aria-label="Next page">
          <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </nav>
  );
}
