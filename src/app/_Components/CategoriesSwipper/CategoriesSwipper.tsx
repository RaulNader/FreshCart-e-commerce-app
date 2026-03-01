"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { Category } from "@/types/category.type";

export default function CategoriesSwipper({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <>
      <div className="container w-full max-w-6xl px-3 sm:px-5 mx-auto">
        <h1 className="text-2xl text-stone-600 font-bold pb-4">
          Shop Popular Categories
        </h1>

        <Swiper
          spaceBetween={0}
          slidesPerView={1.5}
          modules={[Autoplay]}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {categories.map((category: Category) => {
            return (
              <>
                <SwiperSlide key={category._id}>
                  <Image
                    className="w-full h-37.5 object-cover"
                    src={category.image}
                    alt={category.name}
                    width={500}
                    height={500}
                  />
                  <p className="text-center text-stone-500">{category.name}</p>
                </SwiperSlide>
              </>
            );
          })}
        </Swiper>
      </div>
    </>
  );
}
