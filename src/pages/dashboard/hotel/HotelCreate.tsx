import { HotelForm } from "@lib/model";
import FormHead from "@pages/dashboard/components/FormHead";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "@lib/api";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { showSuccessToast } from "@utils/toast";
import HotelFillForm from "./components/HotelFillForm";

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
        <HotelFillForm state={{ hotel, setHotel, isPending }} onSubmit={onSubmit} type="create"/>
      </div>
    </div>
  );
};

export default HotelCreate;
