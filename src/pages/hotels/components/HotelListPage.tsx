import React, { useState } from 'react';

const HotelListPage: React.FC = () => {
  const [hotels, setHotels] = useState([
    { name: 'Nama Hotel 1', image: 'gambar_hotel_1.jpg', availability: '100', location: 'Lokasi 1', roomType: 'Tipe Kamar 1', price: '500000' },
    { name: 'Nama Hotel 2', image: 'gambar_hotel_2.jpg', availability: '150', location: 'Lokasi 2', roomType: 'Tipe Kamar 2', price: '600000' },
    { name: 'Nama Hotel 3', image: 'gambar_hotel_3.jpg', availability: '200', location: 'Lokasi 3', roomType: 'Tipe Kamar 3', price: '700000' },
    { name: 'Nama Hotel 3', image: 'gambar_hotel_3.jpg', availability: '200', location: 'Lokasi 3', roomType: 'Tipe Kamar 3', price: '700000' },
    { name: 'Nama Hotel 3', image: 'gambar_hotel_3.jpg', availability: '200', location: 'Lokasi 3', roomType: 'Tipe Kamar 3', price: '700000' },
    { name: 'Nama Hotel 3', image: 'gambar_hotel_3.jpg', availability: '200', location: 'Lokasi 3', roomType: 'Tipe Kamar 3', price: '700000' },
    { name: 'Nama Hotel 3', image: 'gambar_hotel_3.jpg', availability: '200', location: 'Lokasi 3', roomType: 'Tipe Kamar 3', price: '700000' },
    { name: 'Nama Hotel 3', image: 'gambar_hotel_3.jpg', availability: '200', location: 'Lokasi 3', roomType: 'Tipe Kamar 3', price: '700000' },
    { name: 'Nama Hotel 3', image: 'gambar_hotel_3.jpg', availability: '200', location: 'Lokasi 3', roomType: 'Tipe Kamar 3', price: '700000' },
    { name: 'Nama Hotel 3', image: 'gambar_hotel_3.jpg', availability: '200', location: 'Lokasi 3', roomType: 'Tipe Kamar 3', price: '700000' },
    { name: 'Nama Hotel 3', image: 'gambar_hotel_3.jpg', availability: '200', location: 'Lokasi 3', roomType: 'Tipe Kamar 3', price: '700000' },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 9;

  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = hotels.slice(indexOfFirstHotel, indexOfLastHotel);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="my-20 container mx-auto">
        <h1 className="text-4xl text-center font-bold mb-8">Hotel List</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentHotels.map((hotel, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full bg-gray-800 h-64 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold mb-2">{hotel.name}</h2>
                <div className="flex flex-col">
                  <p className="text-sm text-gray-600 mb-1">Jumlah Tersedia: {hotel.availability}</p>
                  <p className="text-sm text-gray-600 mb-1">Lokasi: {hotel.location}</p>
                  <p className="text-sm text-gray-600 mb-4">Tipe Kamar: {hotel.roomType}</p>
                </div>
                <div className="flex justify-between items-center">
                  <button className="bg-pink-400 hover:bg-pink-600 text-white py-2 px-4 rounded-md">
                    Lihat Lebih Lengkap
                  </button>
                  <p className="text-lg font-bold">Rp{hotel.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ul className="flex justify-center mt-4">
          {[...Array(Math.ceil(hotels.length / hotelsPerPage)).keys()].map((number) => (
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
    </>
  );
};

export default HotelListPage;
