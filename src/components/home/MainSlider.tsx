"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import img1 from "@/assets/images/slider-image-1.jpeg";
import img2 from "@/assets/images/slider-image-2.jpeg";
import img3 from "@/assets/images/slider-image-3.jpeg";
import { Autoplay } from "swiper/modules";

const SLIDES = [
  { src: img3, alt: "Pack of chocolate ring cookies" },
  { src: img1, alt: "Shopping bag full of fresh vegetables and fruit" },
  { src: img2, alt: "Red velvet cream-filled wafer rolls" },
];

export default function MainSlider() {
  return (
    <section
      aria-label="Featured offers"
      className="container mx-auto w-full max-w-6xl px-3 sm:px-5 py-6 sm:py-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="md:col-span-3">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            modules={[Autoplay]}
            autoplay={{ delay: 5000 }}
          >
            {SLIDES.map(({ src, alt }, index) => (
              <SwiperSlide key={alt}>
                <Image
                  className="block h-56 sm:h-72 md:h-100 w-full object-cover"
                  src={src}
                  alt={alt}
                  // Only the first slide is visible on load, so only it
                  // should compete for bandwidth (Largest Contentful Paint).
                  priority={index === 0}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* Decorative repeats of the slides, so screen readers skip them. */}
        <div className="flex flex-col md:col-span-1">
          <Image
            className="h-40 sm:h-48 md:h-50 w-full object-cover"
            src={img1}
            alt=""
          />
          <Image
            className="h-40 sm:h-48 md:h-50 w-full object-cover"
            src={img2}
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
