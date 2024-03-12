import React from "react";

interface Hotel {
    id:number
    image: string;
    name: string;
    availability: number;
    location: string;
    roomType: string;
    price: number;
  }

  interface HotelCardProps {
    hotel: Hotel; 
  }
  
  const HotelCardPayments: React.FC<HotelCardProps> = ({ hotel }) => {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <img
        src={hotel.image}
        alt={hotel.name}
        className="w-full bg-gray-800 h-64 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2">{hotel.name}</h2>
        <div className="flex flex-col">
          <p className="text-xl text-gray-600 mb-1">Jumlah Tersedia: 50 / {hotel.availability}</p>
          <p className="text-xl text-gray-600 mb-1">Lokasi: {hotel.location}</p>
          <p className="text-xl text-gray-600 mb-4">Tipe Kamar: {hotel.roomType}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold">Rp{hotel.price}</p>
        </div>
      </div>
    </div>
  );
};

export default HotelCardPayments;
