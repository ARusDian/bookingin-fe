import { AirlineForm, HotelForm } from "@lib/model";
import { capitalizeFirstLetter } from "@utils/capitalize_first_letter";
import React from "react";

interface Props {
  state: {
    data: HotelForm | AirlineForm;
    setData: React.Dispatch<React.SetStateAction<HotelForm>> | React.Dispatch<React.SetStateAction<AirlineForm>>;
    isPending: boolean;
  };
  type: "create" | "edit";
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const PartnerFillForm = ({
  state: { data, setData, isPending },
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
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="name" className="text-lg font-medium">
          Address
        </label>
        <input
          type="text"
          className="border p-2 rounded-lg"
          value={data.address}
          onChange={(e) => setData({ ...data, address: e.target.value })}
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="name" className="text-lg font-medium">
          Description
        </label>
        <textarea
          className="border p-2 rounded-lg"
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
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

export default PartnerFillForm;
