"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  productsHref,
  SORT_OPTIONS,
  type ProductQuery,
  type SortValue,
} from "@/lib/product-query";
import type { Brand, Category } from "@/types/product.type";
import { Loader2, Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition, type FormEvent } from "react";

const selectClass =
  "h-9 w-full rounded-md border border-input bg-white px-3 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

interface ProductFiltersProps {
  query: ProductQuery;
  categories: Category[];
  brands: Brand[];
}

export default function ProductFilters({
  query,
  categories,
  brands,
}: ProductFiltersProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const hasFilters = productsHref({ ...query, page: 1 }) !== "/products";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const value = (name: string) => String(form.get(name) ?? "").trim();
    const price = (name: string) =>
      value(name) === "" ? undefined : Number(value(name));

    // New filters always start again from page 1.
    const href = productsHref({
      keyword: value("keyword"),
      category: value("category"),
      brand: value("brand"),
      sort: value("sort") as SortValue,
      minPrice: price("minPrice"),
      maxPrice: price("maxPrice"),
    });

    startTransition(() => router.push(href));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border border-default shadow-xs p-4 mb-6 space-y-3"
    >
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          name="keyword"
          type="search"
          defaultValue={query.keyword}
          placeholder="Search products..."
          aria-label="Search products"
          className="pl-9 bg-white"
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <select
          name="category"
          defaultValue={query.category}
          aria-label="Category"
          className={selectClass}
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          name="brand"
          defaultValue={query.brand}
          aria-label="Brand"
          className={selectClass}
        >
          <option value="">All brands</option>
          {brands.map((brand) => (
            <option key={brand._id} value={brand._id}>
              {brand.name}
            </option>
          ))}
        </select>

        <select
          name="sort"
          defaultValue={query.sort}
          aria-label="Sort by"
          className={selectClass}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <Input
          name="minPrice"
          type="number"
          min={0}
          defaultValue={query.minPrice}
          placeholder="Min price"
          aria-label="Minimum price"
          className="bg-white"
        />
        <Input
          name="maxPrice"
          type="number"
          min={0}
          defaultValue={query.maxPrice}
          placeholder="Max price"
          aria-label="Maximum price"
          className="bg-white col-span-2 lg:col-span-1"
        />
      </div>

      <div className="flex gap-2 justify-end">
        {hasFilters && (
          <Button asChild variant="ghost" type="button">
            <Link href="/products">
              <X className="h-4 w-4" />
              Clear
            </Link>
          </Button>
        )}
        <Button type="submit" disabled={isPending} className="bg-gray-600">
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
          Apply
        </Button>
      </div>
    </form>
  );
}
