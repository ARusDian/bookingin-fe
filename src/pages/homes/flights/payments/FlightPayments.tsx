import React from "react";
import { useParams } from "react-router-dom";
import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import FlightCardPayments from "./components/FlightCardPayments";
import FlightForm from "./components/FlightForm";

interface Flight {
  id: number;
  guest: string;
  date: string;
  airline: string;
  price: number;
}

const FlightPayments = () => {
  const { flightId } = useParams<{ flightId: string }>();
  const flights: Flight[] = [
    {
      id: 1,
      guest: "Guest",
      date: "12 - 13 December 2021",
      airline: "Premium Lion King",
      price: 150,
    },
  ];

  const flight = flights.find(f => f.id === parseInt(flightId || '0'));

  return (
    <>
      <Navbar />
      <div className="p-8">
        <h1 className="text-6xl mt-24 font-bold mb-10">Bookingin Sekarang!</h1>
        <div className="flex flex-wrap gap-8">
          <div className="flex-1">
            <FlightForm />
          </div>
          {flights.map((flight) => (
            <div key={flight.id} className="flex-1">
              <FlightCardPayments flight={flight} />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </>
  );
};

export default FlightPayments;
