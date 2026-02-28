import CategoriesSwipper from "../CategoriesSwipper/CategoriesSwipper";

export default async function CategoriesSlider() {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`);
  const { data } = await res.json();

  return (
    <>
      <CategoriesSwipper categories={data} />
    </>
  );
}
