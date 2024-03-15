import { HotelForm } from "@lib/model";
import { capitalizeFirstLetter } from "@utils/capitalize_first_letter";
import React from "react";

interface Props {
  state: {
    hotel: HotelForm;
    setHotel: React.Dispatch<React.SetStateAction<HotelForm>>;
    isPending: boolean;
  };
  type: "create" | "edit";
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const HotelFillForm = ({
  state: { hotel, setHotel, isPending },
  type,
  onSubmit,
}: Props) => {
  return (
    <form className="flex flex-col p-4 space-y-4" onSubmit={onSubmit}>
      <div className="flex flex-col space-y-1">
        <label htmlFor="name" className="text-lg font-medium">
          Name
        </label>
        <input
          type="text"
          className="border p-2 rounded-lg"
          value={hotel.name}
          onChange={(e) => setHotel({ ...hotel, name: e.target.value })}
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="name" className="text-lg font-medium">
          Address
        </label>
        <input
          type="text"
          className="border p-2 rounded-lg"
          value={hotel.address}
          onChange={(e) => setHotel({ ...hotel, address: e.target.value })}
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="name" className="text-lg font-medium">
          Description
        </label>
        <textarea
          className="border p-2 rounded-lg"
          value={hotel.description}
          onChange={(e) => setHotel({ ...hotel, description: e.target.value })}
        />
      </div>
      <button
        disabled={isPending}
        className="bg-purple-200 font-medium px-4 py-2 rounded-lg hover:bg-purple-300"
      >
        {capitalizeFirstLetter(type)} Hotel
      </button>
    </form>
  );
};

export default HotelFillForm;
