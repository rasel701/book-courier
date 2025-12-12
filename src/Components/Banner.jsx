import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import "./styles.css";

// import bannerOne from "../assets/banner-1.jpg";
// import bannerTwo from "../assets/banner-2.jpg";
// import bannerThree from "../assets/banner-3.jpg";
// import bannerFore from "../assets/banner-4.png";

import bookCourier1 from "../assets/book-courier-1.jpg";
import bookCourier2 from "../assets/book-courier-2.jpg";
import bookCourier3 from "../assets/book-courier-3.jpg";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router";

const Banner = () => {
  const banners = [bookCourier1, bookCourier2, bookCourier3];
  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <img
              className="w-full h-[600px] object-cover"
              src={banner}
              alt=""
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center px-10  bg-opacity-30 text-black">
              <h2 className="text-5xl font-bold mb-4 text-center">
                Welcome to Our Bookstore
              </h2>
              <p className="mb-6 text-lg max-w-lg">
                Discover amazing books and order your favorite titles online!
              </p>
              <Link to="/books">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition cursor-pointer">
                  Explore All Books
                </button>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
