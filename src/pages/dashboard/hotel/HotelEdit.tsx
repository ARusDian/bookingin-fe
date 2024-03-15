// import { useNavigate } from "react-router-dom";
import FormHead from "../components/FormHead";
// import { useCookies } from "react-cookie";
import { useState } from "react";
import { HotelForm } from "@lib/model";
// import HotelFillForm from "./components/HotelFillForm";
import PartnerFillForm from "../components/PartnerFillForm";

const HotelEdit = () => {
  // const [cookies] = useCookies(["token"]);
  const [hotel, setHotel] = useState<HotelForm>({
    name: "",
    address: "",
    description: "",
  });
  // const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // mutate(hotel);
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
