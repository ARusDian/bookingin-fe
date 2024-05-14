import FormHead from "@pages/dashboard/components/FormHead";
import { useState } from "react";
import RoomCreateForm from "./components/RoomCreateForm";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosErrorResponse, CreateHotelRoom } from "@lib/model";
import { useMutation } from "@tanstack/react-query";
import api from "@lib/api";
import { useCookies } from "react-cookie";
import { showErrorToast, showSuccessToast } from "@utils/toast";
import { AxiosError } from "axios";

const HotelRoomEdit = () => {
  const { hotel_id, room_id } = useParams();
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const [data, setData] = useState<CreateHotelRoom>({
    hotel_id: parseInt(hotel_id!),
    type_id: null,
    name: "",
    description: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateHotelRoom) =>
      api.put(`/partner/hotel/room/edit/${room_id}`, data, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      }),
    onError: (error: AxiosError) => {
      const errorData: AxiosErrorResponse = error.response
        ?.data as AxiosErrorResponse;
      setTimeout(() => showErrorToast(errorData.message), 1);
    },
    onSuccess: (data) => {
      navigate(`../..`, { relative: "path" });
      setTimeout(() => showSuccessToast(data.data.message), 1);
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(data);
  };

  return (
    <div className="px-4 py-6 h-dashboard-outlet">
      <FormHead
        title="Edit Room"
        linkBack={`../../`}
        // rightSide={
        //   <Link
        //     to="../../facility/add"
        //     className="flex items-center justify-end gap-2 font-roboto hover:text-purple-500 text-right"
        //   >
        //     Add Facility
        //     <IoMdArrowForward />
        //   </Link>
        // }
      />
      <div className="max-w-2xl mx-auto pt-4 border rounded-lg shadow-md">
        <RoomCreateForm
          type="edit"
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

export default HotelRoomEdit;
