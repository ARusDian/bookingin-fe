import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { MdEventSeat } from "react-icons/md";
import api from "@lib/api";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { FlightTicket, AxiosErrorResponse } from "@lib/model";

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
  }[];
}

interface Seat {
  id: number;
  name: string;
  available: boolean;
  selected: boolean;
}

interface FlightFormProps {
  flight: Flight;
}



const FlightForm: React.FC<FlightFormProps> = ({ flight }) => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const [acceptedPolicy, setAcceptedPolicy] = useState<boolean>(false);
  const [seats, setSeats] = useState<Seat[]>(
    flight.seats.map((seat) => ({
      ...seat,
      selected: false,
    }))
  );

  const postFlight = async (flightData: FlightTicket, token:string) => {
    try {
      const response = await api.post("/user/ticket/buy", flightData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data:FlightTicket) => postFlight(data, cookies.token),
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
    const selectedSeat = seats.find((seat) => seat.selected);
    if (!selectedSeat || !acceptedPolicy) {
      toast.error("Please select a seat and accept the policy to proceed.");
      return;
    }
    mutate({
      plane_flight_id: flight.id,
      plane_seat_id: selectedSeat.id,
      id: 0,
      code: "",
      transaction_id: 0,
      user_id: 0,
      created_at: "",
      updated_at: "",
      user: {
        id: 0,
        name: ""
      },
      deleted_at: null
    });
  };

  const handleSeatSelection = (seatId: number) => {
    const updatedSeats = seats.map((seat) =>
      seat.id === seatId ? { ...seat, selected: !seat.selected } : seat
    );
    setSeats(updatedSeats);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 p-6 rounded-lg bg-gray-200 shadow-md"
    >
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Penerbangan Pada:
        </label>
        <div className="mt-4">
          Pilih Kamar:
          <div className="grid grid-cols-12 gap-2">
            {seats.map((seat) => (
              <button
                key={seat.id}
                className={`py-2 px-4 rounded-md transition duration-300 ease-in-out transform ${
                  seat.selected
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-800"
                } ${
                  !seat.available && "bg-red-500 text-white cursor-not-allowed"
                }`}
                onClick={() => seat.available && handleSeatSelection(seat.id)}
                disabled={!seat.available}
              >
                <MdEventSeat className="mx-auto"/>
                {seat.name}
              </button>
            ))}
          </div>
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
        Pesan Tiket Penerbangan !
      </button>
    </form>
  );
};

export default FlightForm;
