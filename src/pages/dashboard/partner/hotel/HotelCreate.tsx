import { HotelForm } from "@lib/model";
import FormHead from "@pages/dashboard/components/FormHead";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "@lib/api";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { showSuccessToast } from "@utils/toast";

const postHotel = async (data: HotelForm, token: string) => {
  const { data: response } = await api.post("/partner/hotel/create", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
};

const HotelCreate = () => {
  const [cookies] = useCookies(["token"]);
  const [hotel, setHotel] = useState<HotelForm>({
    name: "",
    address: "",
    description: "",
  });
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: HotelForm) => postHotel(data, cookies.token),
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      navigate("..", { relative: "path" });
      setTimeout(() => showSuccessToast(data.message), 1);
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(hotel);
  };

  return (
    <div className="py-6 px-4 h-dashboard-outlet">
      <FormHead title="Create Hotel" />
      <div className="max-w-2xl mx-auto border rounded-lg shadow-md">
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
              onChange={(e) =>
                setHotel({ ...hotel, description: e.target.value })
              }
            />
          </div>
          <button
            disabled={isPending}
            className="bg-purple-200 font-medium px-4 py-2 rounded-lg hover:bg-purple-300"
          >
            Create Hotel
          </button>
        </form>
      </div>
    </div>
  );
};

export default HotelCreate;
