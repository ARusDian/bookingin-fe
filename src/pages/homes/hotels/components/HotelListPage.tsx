import { useState } from "react";
import HotelCard from "./HotelCard";
import Footer from "@components/Footer";

interface Hotel {
  id: number;
  name: string;
  availability: number;
  location: string;
  roomType: string;
  price: number;
}

const HotelListPage = () => {
  const hotels: Hotel[] = [
    {
      id: 1,
      name: "Example Hotel 1",
      availability: 2,
      location: "asdasd",
      roomType: "asdad",
      price: 150,
    },
    {
      id: 1,
      name: "Example Hotel 1",
      availability: 2,
      location: "asdasd",
      roomType: "asdad",
      price: 150,
    },
    {
      id: 1,
      name: "Example Hotel 1",
      availability: 2,
      location: "asdasd",
      roomType: "asdad",
      price: 150,
    },
    {
      id: 1,
      name: "Example Hotel 1",
      availability: 2,
      location: "asdasd",
      roomType: "asdad",
      price: 150,
    },
    {
      id: 1,
      name: "Example Hotel 1",
      availability: 2,
      location: "asdasd",
      roomType: "asdad",
      price: 150,
    },
    {
      id: 1,
      name: "Example Hotel 1",
      availability: 2,
      location: "asdasd",
      roomType: "asdad",
      price: 150,
    },
    {
      id: 1,
      name: "Example Hotel 1",
      availability: 2,
      location: "asdasd",
      roomType: "asdad",
      price: 150,
    },
    {
      id: 1,
      name: "Example Hotel 1",
      availability: 2,
      location: "asdasd",
      roomType: "asdad",
      price: 150,
    },
    {
      id: 1,
      name: "Example Hotel 1",
      availability: 2,
      location: "asdasd",
      roomType: "asdad",
      price: 150,
    },
    {
      id: 1,
      name: "Example Hotel 1",
      availability: 2,
      location: "asdasd",
      roomType: "asdad",
      price: 150,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 9;

  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = hotels.slice(indexOfFirstHotel, indexOfLastHotel);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="my-20 container mx-auto">
        <h1 className="text-4xl text-center font-bold mb-8">Hotels</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
        <ul className="flex justify-center mt-4">
          {[...Array(Math.ceil(hotels.length / hotelsPerPage)).keys()].map(
            (number) => (
              <li key={number} className="mx-1">
                <button
                  onClick={() => paginate(number + 1)}
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
