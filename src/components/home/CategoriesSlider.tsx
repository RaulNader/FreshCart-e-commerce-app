import { getCategories } from "@/services/catalog.service";
import CategoriesSwiper from "./CategoriesSwiper";

export default async function CategoriesSlider() {
  const categories = await getCategories();

  return <CategoriesSwiper categories={categories} />;
}
