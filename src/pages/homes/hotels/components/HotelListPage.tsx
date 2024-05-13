import { useState } from "react";
import api from "@lib/api";
import HotelCard from "./HotelCard";
import Footer from "@components/Footer";
import { useCookies } from "react-cookie";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface Hotel {
  id: number;
  name: string;
  address: string;
  description: string;
  user:{
    name:string;
  }
}

type HotelResponse = {
  data: Hotel[];
}

const hotelPerPage = 9; 

const HotelListPage = () => {
  const [cookies] = useCookies(["token"]);
  const [currentPage, setCurrentPage] = useState(1);


  const {
    data,
    isError,
    isRefetching,
    isLoading,
    refetch,
  } = useQuery<HotelResponse>({
    queryKey: ["hotel", currentPage], 
    queryFn: () =>
      api
        .get(`/hotel/get?page=${currentPage}&item=${hotelPerPage}`, { 
          headers: { Authorization: `Bearer ${cookies.token}` },
        })
        .then((res) => res.data),
    placeholderData: keepPreviousData,
  });

  const hotel = data?.data || [];
  console.log(hotel)


  return (
    <div>
      <div className="my-20 container mx-auto">
        <h1 className="text-4xl text-center font-bold mb-8">Hotel List</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {hotel.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
        <ul className="flex justify-center mt-4">
          {[...Array(Math.ceil(hotel.length / hotelPerPage)).keys()].map(
            (number) => (
              <li key={number} className="mx-1">
                <button
                  onClick={() => setCurrentPage(number + 1)}
                  className={`${
                    currentPage === number + 1
                      ? "bg-gray-800 text-white"
                      : "bg-gray-200 text-gray-800"
                  } px-3 py-1 rounded-md`}
                >
                  {number + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default HotelListPage;
