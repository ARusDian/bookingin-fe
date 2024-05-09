import api from "@lib/api";
import { AxiosErrorResponse, FacilityCreate } from "@lib/model";
import FormHead from "@pages/dashboard/components/FormHead";
import { useMutation } from "@tanstack/react-query";
import { showErrorToast, showSuccessToast } from "@utils/toast";
import { AxiosError } from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";

const HotelFacilityCreate = () => {
  const { hotel_id } = useParams();
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const [facilityData, setFacilityData] = useState<FacilityCreate>({
    hotel_id: hotel_id ? parseInt(hotel_id) : 0,
    name: "",
    description: "",
  });

  const postFacility = async (data: FacilityCreate, token: string) => {
    const { data: response } = await api.post(
      "/partner/hotel/facility/create",
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.message;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FacilityCreate) => postFacility(data, cookies.token),
    onError: (error: AxiosError) => {
      const errorData: AxiosErrorResponse = error.response
        ?.data as AxiosErrorResponse;
      showErrorToast(errorData.message);
    },
    onSuccess: (data) => {
      navigate("../../room/add", { relative: "path" });
      console.log(data)
      setTimeout(() => showSuccessToast(data), 1);
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(facilityData);
  };

  return (
    <div className="px-4 py-6 h-dashboard-outlet">
      <FormHead title="Add Facility" linkBack="../../room/add"/>
      <div className="max-w-2xl mx-auto pt-4 border rounded-lg shadow-md">
        <form className="flex flex-col p-4 space-y-4" onSubmit={onSubmit}>
          <div className="flex flex-col space-y-1">
            <label htmlFor="name" className="text-lg font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="border p-2 rounded-lg"
              value={facilityData.name}
              onChange={(e) =>
                setFacilityData({ ...facilityData, name: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="description" className="text-lg font-medium">
              Description
            </label>
            <textarea
              id="description"
              className="border p-2 rounded-lg"
              value={facilityData.description}
              onChange={(e) =>
                setFacilityData({
                  ...facilityData,
                  description: e.target.value,
                })
              }
            />
          </div>
          <button
            className="bg-purple-200 hover:bg-purple-300 px-2 py-2 rounded-lg"
            disabled={isPending}
          >
            Add Facility
          </button>
        </form>
      </div>
    </div>
  );
};

export default HotelFacilityCreate;
