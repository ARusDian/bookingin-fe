import React from "react";
import { Link } from "react-router-dom";

interface Hotel {
  id: number;
  name: string;
  address: string;
  description: string;
  user: {
    name: string;
  };
}

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  return (
    <div className="rounded-lg bg-pink-100 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{hotel.name}</h2>
        <p className="text-gray-700 mb-1">{hotel.description}</p>
        <p className="text-gray-700 mb-2">{hotel.address}</p>
        <p className="text-gray-700 mb-4 italic">
          Managed by: {hotel.user.name}
        </p>
      </div>
      <Link to={`/hotel/payments/${hotel.id}`}>
        <div className="bg-pink-500 rounded-b-lg text-white text-center p-3 uppercase font-bold cursor-pointer hover:bg-pink-600 transition-colors">
          Book Hotel Room
        </div>
      </Link>
    </div>
  );
};

export default HotelCard;
