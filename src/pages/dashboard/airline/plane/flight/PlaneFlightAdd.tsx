import api from "@lib/api";
import { AxiosErrorResponse, PlaneFlightCreate } from "@lib/model";
import FormHead from "@pages/dashboard/components/FormHead";
import { useMutation } from "@tanstack/react-query";
import {
  currencyDeformatter,
  currencyFormatter,
} from "@utils/currency_formatter";
import { getCurrentDatetime, ISOToDatetime } from "@utils/date";
import { AxiosError } from "axios";
import { useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "react-loading";
import { showErrorToast, showSuccessToast } from "@utils/toast";

const PlaneFlightAdd = () => {
  const [token] = useCookies(["token"]);
  const { plane_id } = useParams<{ plane_id: string }>();
  const currentDatetime = useMemo(() => getCurrentDatetime(), []);
  const [data, setData] = useState<PlaneFlightCreate>({
    plane_id: Number(plane_id!),
    last_check_in: currentDatetime,
    departure_time: currentDatetime,
    departure_airport: "",
    arrival_time: currentDatetime,
    arrival_airport: "",
    price: 0,
  });
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: PlaneFlightCreate) =>
      api
        .post("/partner/airline/plane/flight/create", data, {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        })
        .then((res) => res.data),
    onSuccess: (res) => {
      navigate("../", { relative: "path" });
      setTimeout(() => showSuccessToast(res.message), 1);
    },
    onError: (error: AxiosError) => {
      const errorResponse: AxiosErrorResponse = error.response?.data as AxiosErrorResponse;
      showErrorToast(errorResponse.message);
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const mutateData = {
      ...data,
      departure_time: ISOToDatetime(data.departure_time),
      arrival_time: ISOToDatetime(data.arrival_time),
      last_check_in: ISOToDatetime(data.last_check_in),
    };
    mutate(mutateData);
  };

  return (
    <div className="px-4 py-6 h-dashboard-outlet">
      <FormHead title="Create Flight Ticket" />
      <div className="max-w-2xl mx-auto border rounded-lg shadow-md">
        <form className="p-4 flex flex-col space-y-5" onSubmit={onSubmit}>
          <div className="flex flex-col space-y-1">
            <label htmlFor="last_check_in" className="text-sm font-medium">
              Last Check In
            </label>
            <input
              id="last_check_in"
              type="datetime-local"
              name="last_check_in"
              className="border rounded-lg px-3 py-2"
              min={currentDatetime}
              value={data.last_check_in}
              onChange={(e) =>
                setData({ ...data, last_check_in: e.target.value })
              }
              required
            />
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex flex-col space-y-1 flex-1">
              <label htmlFor="departure_time" className="text-sm font-medium">
                Departure Time
              </label>
              <input
                type="datetime-local"
                name="departure_time"
                className="border rounded-lg px-3 py-2"
                value={data.departure_time}
                onChange={(e) =>
                  setData({ ...data, departure_time: e.target.value })
                }
                required
              />
            </div>
            <div className="flex flex-col space-y-1 flex-1">
              <label
                htmlFor="departure_airport"
                className="text-sm font-medium"
              >
                Departure Airport
              </label>
              <input
                type="text"
                name="departure_airport"
                placeholder="Balikpapan (BPN)"
                className="border rounded-lg px-3 py-2"
                value={data.departure_airport}
                onChange={(e) =>
                  setData({ ...data, departure_airport: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex flex-col space-y-1 flex-1">
              <label htmlFor="arrival_time" className="text-sm font-medium">
                Arrival Time
              </label>
              <input
                id="arrival_time"
                type="datetime-local"
                name="arrival_time"
                className="border rounded-lg px-3 py-2"
                value={data.arrival_time}
                onChange={(e) =>
                  setData({ ...data, arrival_time: e.target.value })
                }
                required
              />
            </div>
            <div className="flex flex-col space-y-1 flex-1">
              <label htmlFor="arrival_airport" className="text-sm font-medium">
                Arrival Airport
              </label>
              <input
                type="text"
                name="arrival_airport"
                placeholder="Samarinda (SMR)"
                className="border rounded-lg px-3 py-2"
                value={data.arrival_airport}
                onChange={(e) =>
                  setData({ ...data, arrival_airport: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="price" className="text-sm font-medium">
              Price
            </label>
            <input
              type="text"
              name="price"
              className="border rounded-lg px-3 py-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              value={currencyFormatter(data.price)}
              onChange={(e) =>
                setData({
                  ...data,
                  price: currencyDeformatter(e.target.value),
                })
              }
              required
            />
          </div>
          <button
            type="submit"
            className="bg-purple-500 text-white font-medium py-2 rounded-lg hover:bg-purple-400 flex justify-center items-center"
            disabled={isPending}
          >
            {isPending ? (
              <Loading type="spin" color="#ffffff" height={20} width={20} />
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlaneFlightAdd;
