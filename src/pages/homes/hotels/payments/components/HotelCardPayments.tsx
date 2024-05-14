import React, { useState } from "react";
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

const HotelCardPayments: React.FC<HotelCardProps> = ({ hotel }) => {
  return (
    <div className="rounded-lg bg-pink-100 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{hotel.name}</h2>
        <p className="text-gray-700 mb-1">{hotel.description}</p>
        <p className="text-gray-700 mb-2">{hotel.address}</p>
      </div>
    </div>
  );
};

export default HotelCardPayments;
