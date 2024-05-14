import React from "react";
import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import HotelCardPayments from "./components/HotelCardPayments";
import HotelForm from "./components/HotelForm";
import api from "@lib/api";
import { Link, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import { MdOutlineArrowCircleLeft } from "react-icons/md";
import { HotelResponse } from "@lib/model";

interface Hotel {
  id: number;
  name: string;
  address: string;
  description: string;
  user: {
    name: string;
  };
  rooms: Room[];
}
interface Room {
  id: number;
  name: string;
  description: string;
  type: {
    id: number;
    name: string;
    price: number;
    selected: boolean;
  };
}

interface HotelFormProps {
  hotel: Hotel[];
}

const HotelPayments: React.FC<HotelFormProps> = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const [cookies] = useCookies(["token"]);

  const {
    data: hotelData,
    isError,
    isLoading,
  } = useQuery<HotelResponse, Error>({
    queryKey: ["hotel", hotelId],
    queryFn: () =>
      api
        .get(`/hotel/get/${hotelId}`, {
          headers: { Authorization: `Bearer ${cookies.token}` },
        })
        .then((res) => res.data),
  });

  const hotels = hotelData?.data
    ? Array.isArray(hotelData.data)
      ? hotelData.data
      : [hotelData.data]
    : [];

  console.log(hotels);
  return (
    <>
      <Navbar />
      <div className="p-8">
        <Link to="/hotel" className="text-6xl mt- font-bold">
          <MdOutlineArrowCircleLeft className="text-black mt-12 hover:text-pink-400" />
        </Link>
        <h1 className="text-6xl mt-24 font-bold mb-10">Bookingin Sekarang!</h1>
        <div className="flex flex-wrap gap-8">
        {hotels.map((hotel) => (
            <div key={hotel.id} className="flex-1">
              <HotelForm hotel={hotel} />
            </div>
          ))}
          {/* {hotels.map((hotel) => (
            <div key={hotel.id} className="flex-1 mt-4">
              <HotelCardPayments hotel={hotel} />
            </div>
          ))} */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HotelPayments;
