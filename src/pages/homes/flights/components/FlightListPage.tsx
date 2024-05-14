import React, { useState } from 'react';
import api from "@lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import FlightCard from './FlightCard';
import Footer from '@components/Footer';
import { useCookies } from "react-cookie";

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
  data: Flight[];
  total: number;
}

const flightsPerPage = 10; 

const FlightListPage: React.FC = () => {
  const [cookies] = useCookies(["token"]);
  const [currentPage, setCurrentPage] = useState<number>(1); 

  const {
    data,
    isError,
    isRefetching,
    isLoading,
    refetch,
  } = useQuery<FlightResponse>({
    queryKey: ["flights", currentPage], 
    queryFn: () =>
      api
        .get(`/flight/get?page=${currentPage}&item=${flightsPerPage}`, { 
          headers: { Authorization: `Bearer ${cookies.token}` },
        })
        .then((res) => res.data),
  });

  const flights = data?.data || [];
  console.log(flights)

  const totalPages = Math.ceil(flights.length / flightsPerPage);

  return (
    <>
      <div className="my-20 container mx-auto">
        <h1 className="text-4xl text-center font-bold mb-8">Flight List</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error fetching flights.</p>
        ) : (
          <div className="max-w-screen-lg mx-auto">
            <div className="flex flex-col space-y-4">
              {flights.map((flight: Flight) => (
                <FlightCard key={flight.id} flight={flight} />
              ))}
            </div>

            <ul className="flex justify-center mt-4">
              {[...Array(totalPages).keys()].map((number) => (
                <li key={number + 1} className="mx-1">
                  <button
                    onClick={() => setCurrentPage(number + 1)}
                    className={`${
                      currentPage === number + 1 ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'
                    } px-3 py-1 rounded-md`}
                  >
                    {number + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default FlightListPage;
