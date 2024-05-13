import React from "react";
import { Link } from "react-router-dom";
import { currencyFormatter } from "@utils/currency_formatter";
import { FaPlane } from "react-icons/fa6";
import { FaPlaneArrival } from "react-icons/fa6";
import { FaPlaneDeparture } from "react-icons/fa6";
import { PiAirplaneInFlightFill } from "react-icons/pi";
import { FaMoneyBillWave } from "react-icons/fa6";
import { MdTimerOff } from "react-icons/md";
import { MdEventSeat } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

interface Flight {
  id: number;
  seats_count: number;
  available_seats_count: number;
  date: string;
  airline: string;
  price: number;
  departure_time: string;
  arrival_time: string;
  departure_airport: string;
  last_check_in: string;
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
    <div className="bg-pink-100 grid grid-col rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-5">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-gray-500 text-xs uppercase flex gap-2">
              <MdEventSeat className="text-lg" /> Guests
            </p>
            <p className="font-bold">
              {flight.seats_count} / {flight.available_seats_count}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs uppercase flex gap-2">
              <FaPlane className="text-lg" /> Plane
            </p>
            <p className="font-bold">{flight.plane.name}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs uppercase flex gap-2">
              {" "}
              <FaMoneyBillWave className="text-lg" />
              Price
            </p>
            <p className="font-bold">{currencyFormatter(flight.price)}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <p className="text-gray-500 text-xs uppercase flex gap-2">
              <FaPlaneDeparture />
              Departure
            </p>
            <p>{flight.departure_airport}</p>
            <p className="text-gray-400 text-xs">{flight.departure_time}</p>
          </div>
          <div className="flex">
            {" "}
            <MdOutlineKeyboardDoubleArrowRight className="text-6xl text-gray-600" />{" "}
            <PiAirplaneInFlightFill className="text-6xl text-gray-600" />{" "}
            <MdOutlineKeyboardDoubleArrowRight className="text-6xl text-gray-600" />
          </div>
          <div>
            <p className="text-gray-500 text-xs uppercase flex gap-2">
              <FaPlaneArrival /> Arrival
            </p>
            <p>{flight.arrival_airport}</p>
            <p className="text-gray-400 text-xs">{flight.arrival_time}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-gray-500 text-xs uppercase flex gap-2">
            <MdTimerOff />
            Last Check-in
          </p>
          <p className="font-bold">{flight.last_check_in}</p>
        </div>
      </div>
      <div className="bg-pink-500 text-white text-center p-3 uppercase font-bold cursor-pointer hover:bg-pink-600 transition-colors">
        <Link to={`/payments/:id`}>Book Flight Ticket</Link>
      </div>
    </div>
  );
};

export default FlightCard;
