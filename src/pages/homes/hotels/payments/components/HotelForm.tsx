import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Room {
  id: number;
  selected: boolean;
}

const HotelForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [acceptedPolicy, setAcceptedPolicy] = useState<boolean>(false);
  const [selectedDateIn, setSelectedDateIn] = useState<Date | null>(null);
  const [selectedDateOut, setSelectedDateOut] = useState<Date | null>(null);
  const [rooms, setRooms] = useState<Room[]>([
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

  const handleRoomSelection = (roomId: number) => {
    const updatedRooms = rooms.map((room) =>
      room.id === roomId ? { ...room, selected: !room.selected } : room
    );
    setRooms(updatedRooms);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (file && acceptedPolicy && selectedDateIn && selectedDateOut) {
      console.log("File:", file);
      console.log("Accepted Policy:", acceptedPolicy);
      console.log("Selected Check-in Date:", selectedDateIn);
      console.log("Selected Check-out Date:", selectedDateOut);
      console.log("Selected Rooms:", rooms.filter(room => room.selected).map(room => room.id));
    } else {
      alert("Please fill all fields and accept the policy to proceed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 p-6 rounded-lg bg-gray-200 shadow-md">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Check In pada:
        </label>
        <DatePicker
          selected={selectedDateIn}
          onChange={handleDateChangeIn}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
        />
        <label className="block text-sm font-medium text-gray-700">
          Check Out pada:
        </label>
        <DatePicker
          selected={selectedDateOut}
          onChange={handleDateChangeOut}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
        />
        <div className="mt-4">
          Pilih Kamar:
          <div className="grid grid-cols-5 gap-4">
            {rooms.map((room) => (
              <button
                key={room.id}
                className={`${
                  room.selected
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-800"
                } py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none`}
                onClick={() => handleRoomSelection(room.id)}
              >
                Kamar {room.id}
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
        Order
      </button>
    </form>
  );
};

export default HotelForm;
