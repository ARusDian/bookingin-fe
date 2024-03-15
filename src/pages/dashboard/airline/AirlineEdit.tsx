import React, { useState } from "react";
import FormHead from "../components/FormHead";
import PartnerFillForm from "../components/PartnerFillForm";
import { AirlineForm } from "@lib/model";

const AirlineEdit = () => {
  // const [cookies] = useCookies(["token"]);
  const [airline, setAirline] = useState<AirlineForm>({
    name: "",
    address: "",
    description: "",
  });
  // const navigate = useNavigate();

  // const { mutate, isPending } = useMutation({
  //   mutationFn: (data: AirlineForm) => postAirline(data, cookies.token),
  //   onError: (error) => {
  //     console.error(error);
  //   },
  //   onSuccess: (data) => {
  //     navigate("..", { relative: "path" });
  //     setTimeout(() => showSuccessToast(data.message), 1);
  //   },
  // });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // mutate(airline);
  };

  return (
    <div className="py-6 px-4 h-dashboard-outlet">
      <FormHead title="Edit Airline" linkBack="../.."/>
      <div className="max-w-2xl mx-auto border rounded-lg shadow-md">
        <PartnerFillForm
          state={{ data: airline, setData: setAirline, isPending: false }}
          onSubmit={onSubmit}
          type="create"
        />
      </div>
    </div>
  );
};

export default AirlineEdit;
