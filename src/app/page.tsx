import AllHomeProducts from "./_Components/AllHomeProducts/AllHomeProducts";
import CategoriesSlider from "./_Components/CategoriesSlider/CategoriesSlider";
import MainSlider from "./_Components/MainSlider/MainSlider";

export const metadata = {
  title: "Home",
  description: "FreshCart - Home",
};

export default function Home() {
  return (
    <>
      <MainSlider />
      <CategoriesSlider />
      <AllHomeProducts />
    </>
  );
}
