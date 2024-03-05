import React, { useState } from 'react';

const FlightListPage: React.FC = () => {
  const [flights, setFlights] = useState([
    { guest: 'Guest', date: '12 - 13 December 2021', airline: 'Premium Lion King', price: 'Rp1.000.000' },
    { guest: 'Guest', date: '12 - 13 December 2021', airline: 'Premium Lion King', price: 'Rp1.000.000' },
    { guest: 'Guest', date: '12 - 13 December 2021', airline: 'Premium Lion King', price: 'Rp1.000.000' },
    { guest: 'Guest', date: '12 - 13 December 2021', airline: 'Premium Lion King', price: 'Rp1.000.000' },
    { guest: 'Guest', date: '12 - 13 December 2021', airline: 'Premium Lion King', price: 'Rp1.000.000' },
    { guest: 'Guest', date: '12 - 13 December 2021', airline: 'Premium Lion King', price: 'Rp1.000.000' },
    { guest: 'Guest', date: '12 - 13 December 2021', airline: 'Premium Lion King', price: 'Rp1.000.000' },
    { guest: 'Guest', date: '12 - 13 December 2021', airline: 'Premium Lion King', price: 'Rp1.000.000' },
    { guest: 'Guest', date: '12 - 13 December 2021', airline: 'Premium Lion King', price: 'Rp1.000.000' },
    { guest: 'Guest', date: '12 - 13 December 2021123123', airline: 'Premium Lion King', price: 'Rp1.000.000' },
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
        <h1 className="text-4xl text-center font-bold mb-8">Penerbangan</h1>
        <div className="max-w-screen-lg mx-auto">
          <div className="flex flex-col space-y-4">
            {currentFlights.map((flight, index) => (
              <div key={index} className="h-28 border rounded-lg flex flex-col justify-center px-8 py-8 shadow">
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
                    <p className="text-slate-400 italic">Maskapai</p>
                    <p className="font-bold text-lg">{flight.airline}</p>
                  </div>
                  <div className="flex flex-col justify-between h-full">
                    <p className="text-slate-400 italic">Harga</p>
                    <p className="font-bold text-lg">{flight.price}</p>
                  </div>
                  <button className="bg-pink-400 flex h-full w-40 px-2 py-8 rounded-lg text-white font-semibold items-center">
                    Booking Tiket Penerbangan
                  </button>
                </div>
              </div>
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
    </>
  );
};

export default FlightListPage;
