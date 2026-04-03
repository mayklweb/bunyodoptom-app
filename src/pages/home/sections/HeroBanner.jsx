"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination } from "swiper/modules";

const banner = [
  {
    id: 1,
    image: "/images/banner-1.jpg",
  },
  {
    id: 2,
    image: "/images/banner-2.jpg",
  },
  {
    id: 3,
    image: "/images/banner-3.jpg",
  },
  {
    id: 4,
    image: "/images/banner-4.jpg",
  },
  {
    id: 5,
    image: "/images/banner-5.jpg",
  },
];

function HeroBanner() {
  return (
    <section>
      <div className="mt-20">
        <div className="container">
          <div className="rounded-xl overflow-hidden relative">
            <Swiper
              cssMode={true}
              loop={true}
              spaceBetween={20}
              autoplay={{
                delay: 2500,
                disableOnInteraction: true,
              }}
              pagination={{ clickable: true }}
              modules={[Autoplay, Pagination]}
              className="w-full h-full ronuded-xl overflow-hidden"
            >
              {banner.map(({ image }) => (
                <SwiperSlide className=" rounded-xl overflow-hidden">
                  <img
                    width={1368}
                    height={615}
                    src={image}
                    alt={image}
                    priority="true"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
