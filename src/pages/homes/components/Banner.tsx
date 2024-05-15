import React from 'react';
import { Link } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 

const Banner = () => {
  return (
    <div className="h-screen pt-18">
      <div className="container mx-auto w-full h-full flex ">
        <div className="flex flex-col space-y-8 justify-center pr-10 w-[55%]">
          <h1 className="text-7xl font-bold leading-tight">
            Website Booking Terbaik di Alam Semesta
          </h1>
          <p>
            Website terbaik untuk memesan tiket hotel dan pesawat sesuai tujuan anda untuk keseluruh dunia!
          </p>
          <div className="flex space-x-4">
            <Link to="/flight">
              <button className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-400">
                Booking Tiket Pesawat
              </button>
            </Link>
            <Link to="/hotel">
              <button className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-400">
                Booking Kamar Hotel
              </button>
            </Link>
          </div>
        </div>
        <div className="bg-gray-700 flex-1">
          <Carousel
            showArrows={true}
            autoPlay={true}
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}
          >
            <div>
              <img className="h-screen w-screen object-cover opacity-70" src="/image/banner.png" alt="Banner 1"/>
            </div>
            <div>
              <img className="h-screen w-screen object-cover" src="/image/banner2.jpg" alt="Banner 2"/>
            </div>
            <div>
              <img className="h-screen w-screen object-cover" src="/image/banner3.jpg" alt="Banner 3"/>
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Banner;
