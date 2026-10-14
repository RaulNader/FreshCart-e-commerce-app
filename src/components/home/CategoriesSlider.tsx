import { getActiveCategories } from "@/services/catalog.service";
import CategoriesSwiper from "./CategoriesSwiper";

export default async function CategoriesSlider() {
  const categories = await getActiveCategories();

  return <CategoriesSwiper categories={categories} />;
}
