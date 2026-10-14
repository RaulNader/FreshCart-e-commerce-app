import CatalogGrid from "@/components/catalog/CatalogGrid";
import { productsHref } from "@/lib/product-query";
import { getCategories } from "@/services/catalog.service";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories",
  description:
    "Browse FreshCart categories: electronics, mobiles, men's and women's fashion, beauty, home, supermarket and more.",
  alternates: { canonical: "/categories" },
};

export default async function Categories() {
  const categories = await getCategories();

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-5 my-8">
      <h1 className="text-3xl font-bold mb-6">All Categories</h1>
      <CatalogGrid
        items={categories.map((category) => ({
          id: category._id,
          name: category.name,
          image: category.image,
          href: productsHref({ category: category._id }),
        }))}
      />
    </div>
  );
}
