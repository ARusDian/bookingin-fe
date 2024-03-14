import React from "react";

interface Flight {
  id: number;
  guest: string;
  date: string;
  airline: string;
  price: number;
}
interface FlightCardPaymentsProps {
  flight: Flight;
}

const FlightCardPayments: React.FC<FlightCardPaymentsProps> = ({ flight }) => {
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
          <p className="font-bold text-lg">Rp. {flight.price}</p>
        </div>
      </div>
    </div>
  );
};

export default FlightCardPayments;
