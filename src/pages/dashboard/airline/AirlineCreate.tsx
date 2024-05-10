import { AirlineForm } from "@lib/model";
import FormHead from "@pages/dashboard/components/FormHead";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "@lib/api";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { showSuccessToast } from "@utils/toast";
import PartnerFillForm from "../components/PartnerFillForm";

const postAirline = async (data: AirlineForm, token: string) => {
  const { data: response } = await api.post("/partner/airline/create", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
};

const AirlineCreate = () => {
  const [cookies] = useCookies(["token"]);
  const [airline, setAirline] = useState<AirlineForm>({
    name: "",
    address: "",
    description: "",
  });
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: AirlineForm) => postAirline(data, cookies.token),
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
    mutate(airline);
  };

  return (
    <div className="py-6 px-4 h-dashboard-outlet">
      <FormHead title="Create Airline" />
      <div className="max-w-2xl mx-auto border rounded-lg shadow-md">
        <PartnerFillForm
          state={{ data: airline, setData: setAirline, isPending }}
          onSubmit={onSubmit}
          type="create"
        />
      </div>
    </div>
  );
};

export default AirlineCreate;
