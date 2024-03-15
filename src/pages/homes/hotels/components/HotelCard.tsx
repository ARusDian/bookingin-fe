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
  
  const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <img
        src={hotel.image}
        alt={hotel.name}
        className="w-full bg-gray-800 h-64 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">{hotel.name}</h2>
        <div className="flex flex-col">
          <p className="text-sm text-gray-600 mb-1">Jumlah Tersedia: 50 / {hotel.availability}</p>
          <p className="text-sm text-gray-600 mb-1">Lokasi: {hotel.location}</p>
          <p className="text-sm text-gray-600 mb-4">Tipe Kamar: {hotel.roomType}</p>
        </div>
        <div className="flex justify-between items-center">
          <button className="bg-pink-400 hover:bg-pink-600 text-white py-2 px-4 rounded-md">
            Lihat Lebih Lengkap
          </button>
          <p className="text-lg font-bold">Rp{hotel.price}</p>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
