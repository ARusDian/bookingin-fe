import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import FlightCard from './FlightCard';
import Footer from '@components/Footer';

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

const fetchFlights = async (page: number, itemsPerPage: number) => {
  const response = await fetch(`/flight/get?page=${page}&item=${itemsPerPage}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const FlightListPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const flightsPerPage = 5; 

  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ['flights', currentPage, flightsPerPage],
    queryFn: () => fetchFlights(currentPage, flightsPerPage),
    
  });

  const flights = data?.data || [];

  console.log(data)

  return (
    <>
      <div className="my-20 container mx-auto">
        <h1 className="text-4xl text-center font-bold mb-8">Flights</h1>
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
              {[...Array(Math.ceil(flights.length / flightsPerPage)).keys()].map((number) => (
                <li key={number} className="mx-1">
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
