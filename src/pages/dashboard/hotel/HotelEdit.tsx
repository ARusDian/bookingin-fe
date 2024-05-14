import FormHead from "../components/FormHead";
import { useState } from "react";
import { HotelForm } from "@lib/model";
import PartnerFillForm from "../components/PartnerFillForm";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useMutation } from "@tanstack/react-query";
import api from "@lib/api";
import { showSuccessToast } from "@utils/toast";

const HotelEdit = () => {
  const [cookies] = useCookies(["token"]);
  const { hotel_id } = useParams<{ hotel_id: string }>();
  const [hotel, setHotel] = useState<HotelForm>({
    name: "",
    address: "",
    description: "",
  });
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: (data: HotelForm) =>
      api
        .put(`/partner/hotel/edit/${hotel_id}`, data, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        })
        .then((res) => res.data),
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
    <div className="px-4 py-6 h-dashboard-outlet">
      <FormHead title="Edit Hotel" />
      <div className="max-w-2xl mx-auto border rounded-lg shadow-md">
        <PartnerFillForm
          state={{ data: hotel, setData: setHotel, isPending: false }}
          onSubmit={onSubmit}
          type="edit"
        />
      </div>
    </div>
  );
};

export default HotelEdit;
