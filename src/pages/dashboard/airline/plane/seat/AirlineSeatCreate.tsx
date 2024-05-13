import api from "@lib/api";
import { AxiosErrorResponse, PlaneSeatCreate } from "@lib/model";
import FormHead from "@pages/dashboard/components/FormHead";
import { useMutation } from "@tanstack/react-query";
import { showErrorToast, showSuccessToast } from "@utils/toast";
import { AxiosError } from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";

const AirlineSeatCreate = () => {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const { plane_id } = useParams<{ plane_id: string }>();
  const [data, setData] = useState<PlaneSeatCreate>({
    plane_id: plane_id!,
    seat_line: "A",
    start_number: 1,
    end_number: 2,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: PlaneSeatCreate) => {
      const seatData = [];
      for (let i = data.start_number; i <= data.end_number; i++) {
        seatData.push(`${data.seat_line}${i}`);
      }

      return api
        .post(
          "/partner/airline/plane/seat/create",
          {
            plane_id: data.plane_id,
            name: seatData,
          },
          {
            headers: { Authorization: `Bearer ${cookies.token}` },
          }
        )
        .then((res) => res.data);
    },
    onError: (error: AxiosError) => {
      const errorMessage: AxiosErrorResponse = error.response?.data as AxiosErrorResponse;
      showErrorToast(errorMessage.message);
    },
    onSuccess: (data) => {
      navigate("..", { relative: "path" });
      setTimeout(() => showSuccessToast(data.message), 1);
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(data);
  };

  return (
    <div className="px-4 py-6 h-dashboard-outlet">
      <FormHead title="Add Seat" />
      <div className="max-w-2xl mx-auto border rounded-lg shadow-md">
        <form className="flex flex-col space-y-4 p-6" onSubmit={onSubmit}>
          <div className="flex flex-row gap-2">
            <div className="flex flex-col w-1/6">
              <label htmlFor="seatLine">Seat Line</label>
              <input
                type="text"
                id="seatLine"
                name="seatLine"
                className="border rounded-lg p-2"
                value={data.seat_line}
                onChange={(e) => {
                  setData({ ...data, seat_line: e.target.value });
                }}
              />
            </div>
            <div className="flex flex-col flex-1">
              <label htmlFor="startNumber">Start</label>
              <input
                type="number"
                id="startNumber"
                name="startNumber"
                className="border rounded-lg p-2"
                value={data.start_number}
                onChange={(e) => {
                  if (Number(e.target.value) > data.end_number - 1) return;
                  setData({ ...data, start_number: Number(e.target.value) });
                }}
              />
            </div>
            <div className="flex flex-col flex-1">
              <label htmlFor="endNumber">End</label>
              <input
                type="number"
                id="endNumber"
                name="endNumber"
                className="border rounded-lg p-2"
                value={data.end_number}
                onChange={(e) => {
                  if (Number(e.target.value) < data.start_number + 1) return;
                  setData({ ...data, end_number: Number(e.target.value) });
                }}
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded-lg"
            disabled={isPending}
          >
            Add Seat
          </button>
        </form>
      </div>
    </div>
  );
};

export default AirlineSeatCreate;
