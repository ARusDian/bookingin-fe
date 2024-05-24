import React, { useState, useEffect } from "react";
import api from "@lib/api";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import { AxiosError } from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { RoomTransaction, AxiosErrorResponse } from "@lib/model";
import { currencyFormatter } from "@utils/currency_formatter";

interface Hotel {
  id: number;
  name: string;
  address: string;
  description: string;
  user: {
    name: string;
  };
  rooms: Room[];
}

interface Room {
  id: number;
  name: string;
  description: string;
  type: {
    id: number;
    name: string;
    price: number;
    selected: boolean;
  };
}

interface HotelFormProps {
  hotel: Hotel;
}

const HotelForm: React.FC<HotelFormProps> = ({ hotel }) => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const [acceptedPolicy, setAcceptedPolicy] = useState<boolean>(false);
  const [selectedDateIn, setSelectedDateIn] = useState<Date | null>(null);
  const [selectedDateOut, setSelectedDateOut] = useState<Date | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [rooms, setRooms] = useState<Room[]>([
    hotel.rooms.map((room) => ({
      ...room,
      selected: false,
    })),
  ]);

  const handleDateChangeIn = (date: Date | null) => {
    setSelectedDateIn(date);
  };

  const handleDateChangeOut = (date: Date | null) => {
    setSelectedDateOut(date);
  };

  const handleRoomSelection = (room: Room) => {
    setSelectedRoom(room);
  };

  const postHotel = async (hotelData: RoomTransaction, token: string) => {
    try {
      const response = await api.post("/user/reservation/buy", hotelData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data: RoomTransaction) => postHotel(data, cookies.token),
    onError: (error: AxiosError) => {
      const errorData: AxiosErrorResponse = error.response
        ?.data as AxiosErrorResponse;
      toast.error(errorData.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
    onSuccess: (data) => {
      console.log(data);
      navigate("/post-payments", { relative: "path" });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedRoom || !acceptedPolicy) {
      toast.error("Please select a room and accept the policy to proceed.");
      return;
    }
    mutate({
      room_id: selectedRoom.id,
      check_in: selectedDateIn ? selectedDateIn.toISOString() : "",
      check_out: selectedDateOut ? selectedDateOut.toISOString() : "",
      id: 0,
      code: "",
      transaction_id: 0,
      user_id: 0,
      created_at: "",
      updated_at: "",
      user: {
        id: 0,
        name: "",
      },
      hotel_id: 0,
      room: {
        id: 0,
        name: "",
        description: "",
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 p-6 rounded-lg bg-gray-200 shadow-md"
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">
          Ketentuan Pemesanan Tiket
        </h3>
        <ul className="list-disc pl-5">
          <li className="mb-2">
            Pemesanan reservasi hanya dapat dilakukan oleh orang dewasa (usia di
            atas 18 tahun).
          </li>
          <li className="mb-2">
            Pembatalan reservasi dapat dilakukan dengan syarat dan ketentuan yang
            berlaku.
          </li>
          <li className="mb-2">
            Harga reservasi dapat berubah tanpa pemberitahuan sebelumnya.
          </li>
          <li className="mb-2">
            Penumpang hanya perlu memperlihatkan riwayat transaksi soft copy
            ataupun hard copy
          </li>
          <li className="mb-2">
            Maksimal pemesanan reservasi dilakukan 7 hari sebelum check-in"
          </li>
        </ul>
        <ul className="list-disc pl-5">
          {/* Your hotel reservation policy */}
        </ul>
        <label className="block text-sm font-medium text-gray-700">
          Check In pada:
        </label>
        <DatePicker
          selected={selectedDateIn}
          onChange={handleDateChangeIn}
          className="mt-1 block w-full p-2 px-96 border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
        />
        <label className="block text-sm font-medium text-gray-700">
          Check Out pada:
        </label>
        <DatePicker
          selected={selectedDateOut}
          onChange={handleDateChangeOut}
          className="mt-1 block w-full p-2 px-96 border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
        />
        <div className="mt-4">
          Pilih Kamar:
          {hotel.rooms.map((room) => (
            <div className="grid grid-cols-5 gap-4 my-2 ">
              <p className="place-content-center">{room.name}</p>
              <button
                key={room.id}
                className={`${
                  selectedRoom === room
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-800"
                } py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none`}
                onClick={() => handleRoomSelection(room)}
              >
                <p className="grid grid-cols-1">
                  <span>{room.type.name}</span>
                  <span>{currencyFormatter(room.type.price)}</span>
                </p>
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={acceptedPolicy}
            onChange={() => setAcceptedPolicy(!acceptedPolicy)}
            className="form-checkbox h-4 w-4 text-pink-600"
          />
          <span className="ml-2 text-sm text-gray-700">
            Saya setuju dengan ketentuan yang berlaku
          </span>
        </label>
      </div>
      <button
        type="submit"
        className="w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-100"
      >
        Pesan Tiket Hotel !
      </button>
    </form>
  );
};

export default HotelForm;
