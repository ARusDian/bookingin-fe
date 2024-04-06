import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdEventSeat } from "react-icons/md";

interface Seat {
  id: number;
  selected: boolean;
}

const FlightForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [acceptedPolicy, setAcceptedPolicy] = useState<boolean>(false);
  const [selectedDateIn, setSelectedDateIn] = useState<Date | null>(null);
  const [selectedDateOut, setSelectedDateOut] = useState<Date | null>(null);
  const [seats, setSeats] = useState<Seat[]>([
    { id: 1, selected: false },
    { id: 2, selected: false },
    { id: 3, selected: false },
    { id: 4, selected: false },
  ]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      setFile(fileList[0]);
    }
  };

  const handleDateChangeIn = (date: Date | null) => {
    setSelectedDateIn(date);
  };

  const handleDateChangeOut = (date: Date | null) => {
    setSelectedDateOut(date);
  };

  const handleSeatSelection = (seatId: number) => {
    const updatedSeats = seats.map((seat) =>
      seat.id === seatId ? { ...seat, selected: !seat.selected } : seat
    );
    setSeats(updatedSeats);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (file && acceptedPolicy && selectedDateIn && selectedDateOut) {
      console.log("File:", file);
      console.log("Accepted Policy:", acceptedPolicy);
      console.log("Selected Check-in Date:", selectedDateIn);
      console.log("Selected Check-out Date:", selectedDateOut);
      console.log("Selected Seats:", seats.filter((seat) => seat.selected).map((seat) => seat.id));
    } else {
      alert("Please fill all fields and accept the policy to proceed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 p-6 rounded-lg bg-gray-200 shadow-md">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Check In pada:</label>
        <DatePicker
          selected={selectedDateIn}
          onChange={handleDateChangeIn}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
        />
        <label className="block text-sm font-medium text-gray-700">Check Out pada:</label>
        <DatePicker
          selected={selectedDateOut}
          onChange={handleDateChangeOut}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
        />
        <div className="mt-4">
          Pilih Kamar:
          <div className="grid grid-cols-12 gap-2">
            {seats.map((seat) => (
              <div
              key={seat.id}
              className={`${
                seat.selected ? "bg-green-500 text-white" : "bg-gray-300 text-gray-800"
              } py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none flex items-center justify-center`}
              onClick={() => handleSeatSelection(seat.id)}
            >
              <MdEventSeat size={20} />
            </div>
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
          <span className="ml-2 text-sm text-gray-700">Saya setuju dengan ketentuan yang berlaku</span>
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
