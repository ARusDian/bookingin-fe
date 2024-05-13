import React from 'react';
import { Link } from 'react-router-dom';

interface Flight {
  id: number;
  guest: string;
  date: string;
  airline: string;
  price: number;
  departure_time: string;
  arrival_time: string;
  departure_airport: string;
  arrival_airport: string;
  plane: {
    name: string;
    description: string;
  };
}
interface FlightCardProps {
    flight: Flight; 
  }

const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  return (
    <div className="h-28 border rounded-lg flex flex-col justify-center px-8 py-8 shadow">
      <div className="flex justify-between items-center h-full">
        <div className="flex flex-col justify-between h-full">
          <p className="text-slate-400 italic">{flight.guest}</p>
          <p className="font-bold text-lg">50</p>
        </div>
        <div className="flex flex-col justify-between h-full w-52">
          <p className="text-slate-400 italic">Date</p>
          <p className="font-bold text-lg">{flight.date}</p>
        </div>
        <div className="flex flex-col justify-between h-full w-52">
          <p className="text-slate-400 italic">Airline</p>
          <p className="font-bold text-lg">{flight.airline}</p>
        </div>
        <div className="flex flex-col justify-between h-full">
          <p className="text-slate-400 italic">Price</p>
          <p className="font-bold text-lg">{flight.price}</p>
        </div>
        <Link to="/payments/:id" className="bg-pink-400 flex h-full w-40 px-2 py-8 rounded-lg text-white font-semibold items-center">
          Book Flight Ticket
        </Link>
      </div>
    </div>
  );
};

export default FlightCard;
