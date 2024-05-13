import React from 'react';
import api from "@lib/api";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import FlightCardPayments from "./components/FlightCardPayments";
import FlightForm from "./components/FlightForm";

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
  seats: {
    id: number;
    name: string;
    available: boolean;
  };
}

type FlightResponse = {
  data: Flight[] | null; 
}

const FlightPayments = () => {
  const { flightId } = useParams<{ flightId: string }>();
  const [cookies] = useCookies(["token"]);

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
        <h1 className="text-6xl mt-24 font-bold mb-10">Book Now!</h1>
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
              <div key={flight.id} className="flex-1">
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
