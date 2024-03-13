// import { CreateHotelRoom } from "@lib/model";
import FormHead from "@pages/dashboard/components/FormHead";
import { useState } from "react";
import RoomCreateForm from "./components/RoomCreateForm";
import { CreateHotelRoom } from "@lib/model";
import { Link } from "react-router-dom";
import { IoMdArrowForward } from "react-icons/io";

const HotelRoomAdd = () => {
  const [data, setData] = useState<CreateHotelRoom>({
    room: {
      name: "",
      description: "",
    },
    type: {
      hotel_id: 0,
      name: "",
      description: "",
      price: 0,
      facilities: [],
    },
    facility: {
      hotel_id: 0,
      name: "",
      description: "",
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // mutate(data);
  };

  return (
    <div className="px-4 py-6 h-dashboard-outlet">
      <FormHead title="Add Room" rightSide={(
        <Link 
          to="../../facility/add" 
          className="flex items-center justify-end gap-2 font-roboto hover:text-purple-500 text-right"
        >

          Add Facility
          <IoMdArrowForward />
        </Link>
      )}/>
      <div className="max-w-2xl mx-auto pt-4 border rounded-lg shadow-md">
        <RoomCreateForm
          state={{
            data,
            setData,
          }}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default HotelRoomAdd;
