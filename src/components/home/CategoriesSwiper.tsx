"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { productsHref } from "@/lib/product-query";
import type { Category } from "@/types/product.type";

export default function CategoriesSwiper({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <section
      aria-labelledby="popular-categories"
      className="container w-full max-w-6xl px-3 sm:px-5 mx-auto"
    >
      <h2
        id="popular-categories"
        className="text-2xl text-stone-600 font-bold pb-4"
      >
        Shop Popular Categories
      </h2>

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
        {categories.map((category) => (
          <SwiperSlide key={category._id}>
            {/* Crawlable link to the filtered product list for this category. */}
            <Link href={productsHref({ category: category._id })}>
              <Image
                className="w-full h-37.5 object-cover"
                src={category.image}
                alt=""
                width={500}
                height={500}
              />
              <p className="text-center text-stone-500 hover:text-emerald-600">
                {category.name}
              </p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
