import CatalogGrid from "@/components/catalog/CatalogGrid";
import { productsHref } from "@/lib/product-query";
import { getActiveBrands } from "@/services/catalog.service";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brands",
  description:
    "Shop products from top brands like Adidas, Samsung, Sony, Dell and more at FreshCart.",
  alternates: { canonical: "/brands" },
};

export default async function Brands() {
  const brands = await getActiveBrands();

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-5 my-8">
      <h1 className="text-3xl font-bold mb-6">All Brands</h1>
      <CatalogGrid
        items={brands.map((brand) => ({
          id: brand._id,
          name: brand.name,
          image: brand.image,
          href: productsHref({ brand: brand._id }),
        }))}
      />
    </div>
  );
}
