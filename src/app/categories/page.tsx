import Image from "next/image";
import { getAllCategories } from "@/api/allCategories.api";

export const metadata = {
  title: "Categories",
  description: "FreshCart - Categories",
};

export default async function Categories() {
  const categories = await getAllCategories();

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-5 my-8">
      <h1 className="text-3xl font-bold mb-6">All Categories</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div
            key={category._id}
            className="bg-white rounded-xl border border-default shadow-xs p-4 flex flex-col items-center gap-3"
          >
            <Image
              src={category.image}
              alt={category.name}
              width={140}
              height={140}
              className="w-24 h-24 object-contain"
            />
            <h2 className="text-base font-semibold text-center">
              {category.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
