import React, { useState } from 'react';
import FlightCard from './FlightCard';
import Footer from '@components/Footer';

const FlightListPage: React.FC = () => {
  const [flights, setFlights] = useState([
    {id:1 , guest: 'Guest', date: '12 - 13 December 2021', airline: 'Premium Lion King', price: 'Rp1.000.000' },
    {id:1 , guest: 'Guest', date: '12 - 13 December 2021', airline: 'Premium Lion King', price: 'Rp1.000.000' },
    {id:1 , guest: 'Guest', date: '12 - 13 December 2021', airline: 'Premium Lion King', price: 'Rp1.000.000' },
    {id:1 , guest: 'Guest', date: '12 - 13 December 2021', airline: 'Premium Lion King', price: 'Rp1.000.000' },
    {id:1 , guest: 'Guest', date: '12 - 13 December 2021', airline: 'Premium Lion King', price: 'Rp1.000.000' },
    {id:1 , guest: 'Guest', date: '12 - 13 December 2021', airline: 'Premium Lion King', price: 'Rp1.000.000' },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const flightsPerPage = 5; 

  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
  const currentFlights = flights.slice(indexOfFirstFlight, indexOfLastFlight);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="my-20 container mx-auto">
        <h1 className="text-4xl text-center font-bold mb-8">Flights</h1>
        <div className="max-w-screen-lg mx-auto">
          <div className="flex flex-col space-y-4">
            {currentFlights.map((flight) => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </div>

          <ul className="flex justify-center mt-4">
            {[...Array(Math.ceil(flights.length / flightsPerPage)).keys()].map((number) => (
              <li key={number} className="mx-1">
                <button
                  onClick={() => paginate(number + 1)}
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
      </div>
        <Footer />
    </>
  );
};

export default FlightListPage;
