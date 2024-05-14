import React, { useRef } from 'react';
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import { FaCheckCircle } from "react-icons/fa";
import ReactToPrint from 'react-to-print';
import api from "@lib/api";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import { currencyFormatter } from "@utils/currency_formatter";

const PostPaymentsHotel = () => {
  const { reservationId } = useParams<{ reservationId: string }>();
  const [cookies] = useCookies(["token"]);
  const componentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const {
    data: reservationData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["reservation", reservationId],
    queryFn: () =>
      api
        .get(`user/reservation/get/${reservationId}`, {
          headers: { Authorization: `Bearer ${cookies.token}` },
        })
        .then((res) => res.data),
  });

  const reservation = reservationData?.data;

  const handleCancelReservation = async () => {
    try {
      await api.post(
        `user/reservation/cancel/${reservationId}`,
        {},
        {
          headers: { Authorization: `Bearer ${cookies.token}` },
        }
      );
      alert("Reservasi berhasil dibatalkan");
      navigate("/"); 
    } catch (error) {
      console.error("Error cancelling reservation:", error);
      alert("Gagal membatalkan reservasi. Silakan coba lagi.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow mt-10 flex flex-col justify-center items-center py-12 bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full mx-4" ref={componentRef}>
          <h2 className="font-bold text-pink-500 text-2xl mb-4 text-center animate-bounce">
            Selamat Pemesanan Reservasi Kamar Hotel Sukses !!
          </h2>
          <p className="mb-4 text-center text-gray-700">Terima kasih telah memesan kamar!</p>
          <div className="text-6xl text-pink-500 mb-6 flex justify-center animate-pulse">
            <FaCheckCircle />
          </div>
          <div className="mb-4">
            <p className="font-semibold text-gray-800">ID Pesanan:</p>
            <p className="text-gray-700">{reservation?.code}</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold text-gray-800">Nama Hotel:</p>
            <p className="text-gray-700">{reservation?.hotel?.name}</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold text-gray-800">Kamar:</p>
            <p className="text-gray-700">{reservation?.room.name}</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold text-gray-800">Tipe:</p>
            <p className="text-gray-700">{reservation?.room.type.name}</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold text-gray-800">Tanggal Mulai:</p>
            <p className="text-gray-700">{reservation?.check_in}</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold text-gray-800">Tanggal Selesai:</p>
            <p className="text-gray-700">{reservation?.check_out}</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold text-gray-800">Deskripsi:</p>
            <p className="text-gray-700">{reservation?.transaction?.description}</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold text-gray-800">Harga:</p>
            <p className="text-gray-700 font-bold text-green-500">{currencyFormatter(reservation?.transaction?.amount)}</p>
          </div>
          <div className="text-center">
            <ReactToPrint
              trigger={() => (
                <button className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
                  Cetak PDF
                </button>
              )}
              content={() => componentRef.current}
            />
            <button
              onClick={handleCancelReservation}
              className='bg-pink-500 text-white py-2 ml-2 px-4 rounded-lg hover:bg-pink-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2'
            >
              Cancel Tiket
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PostPaymentsHotel;
