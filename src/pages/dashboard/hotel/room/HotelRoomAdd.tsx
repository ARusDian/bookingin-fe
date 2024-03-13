// import { CreateHotelRoom } from "@lib/model";
import FormHead from "@pages/dashboard/components/FormHead";
import { useState } from "react";
import RoomCreateForm from "./components/RoomCreateForm";
import { Link, useParams } from "react-router-dom";
import { IoMdArrowForward } from "react-icons/io";
import { CreateHotelRoom } from "@lib/model";
import { useMutation } from "@tanstack/react-query";
import api from "@lib/api";
import { useCookies } from "react-cookie";

const HotelRoomAdd = () => {
  const { hotel_id } = useParams();
  const [cookies] = useCookies(["token"]);
  const [data, setData] = useState<CreateHotelRoom>({
    hotel_id: parseInt(hotel_id!),
    type_id: null,
    name: "",
    description: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateHotelRoom) => api.post("/partner/hotel/room/create", data, {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    }),
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(data);
  };

  return (
    <div className="px-4 py-6 h-dashboard-outlet">
      <FormHead
        title="Add Room"
        rightSide={
          <Link
            to="../../facility/add"
            className="flex items-center justify-end gap-2 font-roboto hover:text-purple-500 text-right"
          >
            Add Facility
            <IoMdArrowForward />
          </Link>
        }
      />
      <div className="max-w-2xl mx-auto pt-4 border rounded-lg shadow-md">
        <RoomCreateForm
          state={{
            hotel_id: hotel_id!,
            token: cookies.token,
            isPending,
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
