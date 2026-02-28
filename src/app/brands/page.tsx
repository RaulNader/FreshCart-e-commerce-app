import Image from "next/image";
import { getAllBrands } from "@/api/allBrands.api";

export const metadata = {
  title: "Brands",
  description: "FreshCart - Brands",
};

export default async function Brands() {
  const brands = await getAllBrands();

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-5 my-8">
      <h1 className="text-3xl font-bold mb-6">All Brands</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {brands.map((brand) => (
          <div
            key={brand._id}
            className="bg-white rounded-xl border border-default shadow-xs p-4 flex flex-col items-center gap-3"
          >
            <Image
              src={brand.image}
              alt={brand.name}
              width={120}
              height={120}
              className="w-24 h-24 object-contain"
            />
            <h2 className="text-base font-semibold text-center">{brand.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
