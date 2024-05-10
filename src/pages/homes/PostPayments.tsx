import React, { useRef } from 'react';
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import { FaCheckCircle } from "react-icons/fa";
import ReactToPrint from 'react-to-print';

const PostPayments = () => {
  const componentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex justify-center items-center py-32">
        <div className="bg-white bg-pink-100 shadow-md rounded-lg p-8 max-w-lg w-full mx-4" ref={componentRef}>
          <h2 className="font-bold text-pink-500 text-2xl mb-4 text-center">
            Pemesanan Tiket Sukses !!
          </h2>
          <p className="mb-4 text-center">Terima kasih telah memesan tiket!</p>
          <div className="text-6xl text-pink-500 mb-6 flex justify-center">
            <FaCheckCircle />
          </div>
          <div className="mb-4">
            <p className="font-semibold">ID Pesanan:</p>
            <p className="text-gray-700">ABC123</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Nama Pesanan:</p>
            <p className="text-gray-700">TSX</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Tanggal Mulai:</p>
            <p className="text-gray-700">1/1/2024</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Tanggal Selesai:</p>
            <p className="text-gray-700">2/1/2024</p>
          </div>
          <div className="text-center">
            <ReactToPrint
              trigger={() => (
                <button className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
                  Cetak PDF
                </button>
              )}
              content={() => componentRef.current}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PostPayments;
