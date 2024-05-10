import React, { useState } from "react";
import FormHead from "../components/FormHead";
import PartnerFillForm from "../components/PartnerFillForm";
import { AirlineForm } from "@lib/model";
import { useCookies } from "react-cookie";
import { useMutation } from "@tanstack/react-query";
import { showSuccessToast } from "@utils/toast";
import api from "@lib/api";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "@zustand/auth";
import { useAdminStore } from "@zustand/admin_access_partner";

const AirlineEdit = () => {
  const [cookies] = useCookies(["token"]);
  const [airline, setAirline] = useState<AirlineForm>({
    name: "",
    address: "",
    description: "",
  });
  const { airline_id } = useParams<{ airline_id: string }>();
  const { partner } = useAdminStore((state) => state);
  const navigate = useNavigate();
  const role = useAuthStore((state) => state.user?.role);
  const url =
  role === "PARTNER"
  ? `/partner/airline/edit/${airline_id}`
  : `/admin/partner/${partner?.id}/airline/edit/${airline_id}`;

  const { mutate, isPending } = useMutation({
    mutationFn: (data: AirlineForm) =>
      api
        .put(url, data, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        })
        .then((res) => res.data),
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      navigate("../..", { relative: "path" });
      setTimeout(() => showSuccessToast(data.message), 1);
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(airline);
  };

  return (
    <div className="py-6 px-4 h-dashboard-outlet">
      <FormHead title="Edit Airline" linkBack="../.." />
      <div className="max-w-2xl mx-auto border rounded-lg shadow-md">
        <PartnerFillForm
          state={{ data: airline, setData: setAirline, isPending }}
          onSubmit={onSubmit}
          type="edit"
        />
      </div>
    </div>
  );
};

export default AirlineEdit;
