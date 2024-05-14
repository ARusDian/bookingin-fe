import React from 'react';
import api from "@lib/api";
import { Link, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import FlightCardPayments from "./components/FlightCardPayments";
import FlightForm from "./components/FlightForm";
import { MdOutlineArrowCircleLeft } from "react-icons/md";

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
    airline: {
      name: string;
      description: string;
      address: string;
    };
  };
  seats: {
    id: number;
    name: string;
    available: boolean;
  }[];
}
type FlightResponse = {
  data: Flight[];
  total: number;
}

const FlightPayments = () => {
  const { flightId } = useParams<{ flightId: string }>();
  const [cookies] = useCookies(["token"]);
  console.log(flightId)

  const {
    data: flightsData,
    isError,
    isLoading,
  } = useQuery<FlightResponse, Error>({
    queryKey: ["flight", flightId],  
    queryFn: () => api.get(`/flight/get/${flightId}`, {  
      headers: { Authorization: `Bearer ${cookies.token}` }
    }).then(res => res.data),
  });

  const flights = flightsData?.data ? (Array.isArray(flightsData.data) ? flightsData.data : [flightsData.data]) : [];

  console.log(flights)
  return (
    <>
      <Navbar />
      <div className="p-8">
        
        <Link to="/flight" className="text-6xl mt- font-bold"><MdOutlineArrowCircleLeft className='text-black mt-12 hover:text-pink-400'/></Link>
        <h1 className="text-6xl mt-8 font-bold mb-10">Bookingin Sekarang!</h1>
        {isLoading ? (
          <p>Loading flights...</p>
        ) : isError || flights.length === 0 ? (
          <p>Error loading flights or no flights available.</p>
        ) : (
          <div className="flex flex-wrap gap-8">
             {flights.map((flight: Flight) => (
              <div key={flight.id} className="flex-1">
                <FlightForm flight={flight} />
              </div>
            ))}
            {flights.map((flight: Flight) => (
              <div key={flight.id} className="flex-1 mt-4">
                <FlightCardPayments flight={flight} />
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default FlightPayments;
