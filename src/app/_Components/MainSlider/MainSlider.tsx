"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import img1 from "../../../assets/images/slider-image-1.jpeg";
import img2 from "../../../assets/images/slider-image-2.jpeg";
import img3 from "../../../assets/images/slider-image-3.jpeg";
import { Autoplay } from "swiper/modules";

export default function MainSlider() {
  return (
    <div className="container mx-auto w-[80%] py-8">
      <div className="grid grid-cols-1  md:grid-cols-4">
        <div className="md:col-span-3">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            modules={[Autoplay]}
            autoplay={{ delay: 5000 }}
          >
            <SwiperSlide>
              <Image
                className=" h-100 w-full object-cover"
                src={img3}
                alt="Slider Image 1"
                priority
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                priority
                className=" h-100 w-full object-cover"
                src={img1}
                alt="Slider Image 2"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                priority
                className="block h-100 w-full object-cover"
                src={img2}
                alt="Slider Image 3"
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="flex flex-col  md:col-span-1">
          <Image
            priority
            className=" h-50 w-full object-cover"
            src={img1}
            alt="Grocery Banner 1"
          />
          <Image
            priority
            className="b h-50 w-full object-cover"
            src={img2}
            alt="Grocery Banner 2"
          />
        </div>
      </div>
    </div>
  );
}
