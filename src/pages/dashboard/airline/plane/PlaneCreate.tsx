import api from "@lib/api";
import { AirlinePlaneCreate, AirlineTypeResponse, AxiosErrorResponse } from "@lib/model";
import FormHead from "@pages/dashboard/components/FormHead";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { MdAdd } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import CreateTypeFormModal from "./components/CreateTypeFormModal";
import Loading from "react-loading";
import { showErrorToast, showSuccessToast } from "@utils/toast";
import { AxiosError } from "axios";

const PlaneCreate = () => {
  const [cookies] = useCookies(["token"]);
  const { airline_id } = useParams<{ airline_id: string }>();
  const [openCreateType, setOpenCreateType] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    data: { data: airlineTypes = [] } = {},
    isLoading,
    refetch,
  } = useQuery<AirlineTypeResponse>({
    queryKey: ["airline_type", airline_id],
    queryFn: () =>
      api
        .get("/partner/airline/type/get", {
          params: {
            airline_id,
          },
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        })
        .then((res) => res.data),
  });

  const [plane, setPlane] = useState<AirlinePlaneCreate>({
    airline_id: Number(airline_id),
    plane_type_id: null,
    name: "",
    description: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: AirlinePlaneCreate) =>
      api
        .post("/partner/airline/plane/create", data, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        })
        .then((res) => res.data),
    onSuccess: (res) => {
      navigate("..", { relative: "path" });
      setTimeout(() => showSuccessToast(res.message), 1);
    },
    onError: (error: AxiosError) => {
      const errorResponse: AxiosErrorResponse = error.response?.data as AxiosErrorResponse;
      showErrorToast(errorResponse.message);
    },
  });

  useEffect(() => {
    if (airlineTypes.length > 0 && !plane.plane_type_id) {
      setPlane({ ...plane, plane_type_id: airlineTypes[0].id });
    }
  }, [airlineTypes, plane]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(plane);
  };

  return (
    <>
      <CreateTypeFormModal
        open={openCreateType}
        onClose={setOpenCreateType}
        state={{ airline_id: airline_id!, token: cookies.token }}
        refetch={refetch}
      />
      <div className="px-4 py-6 h-dashboard-outlet">
        <FormHead title="Create Plane" />
        <div className="max-w-2xl mx-auto border rounded-lg shadow-md">
          <form className="flex flex-col space-y-2 p-4" onSubmit={onSubmit}>
            <div className="flex flex-col space-y-1">
              <label htmlFor="name" className="text-sm font-medium">
                Type
              </label>
              <div className="flex gap-2">
                <select
                  id="type"
                  className="border rounded-lg px-2 py-2 flex-1"
                  disabled={isLoading || airlineTypes.length === 0}
                  value={plane.plane_type_id ?? ""}
                  onChange={(e) =>
                    setPlane({
                      ...plane,
                      plane_type_id: Number(e.target.value),
                    })
                  }
                  required
                >
                  {airlineTypes.length > 0 ? (
                    airlineTypes.map((airlineType) => (
                      <option key={airlineType.id} value={airlineType.id}>
                        {airlineType.name}
                      </option>
                    ))
                  ) : (
                    <option value="">...</option>
                  )}
                </select>
                <button
                  type="button"
                  className="px-3 py-2 bg-purple-400 text-white font-medium rounded-lg hover:bg-purple-300"
                  onClick={() => setOpenCreateType(true)}
                >
                  <MdAdd className="text-2xl" />
                </button>
              </div>
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                className="border rounded-lg px-3 py-2"
                value={plane.name}
                onChange={(e) => setPlane({ ...plane, name: e.target.value })}
                required
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="border rounded-lg px-3 py-2"
                value={plane.description}
                onChange={(e) =>
                  setPlane({ ...plane, description: e.target.value })
                }
                required
              />
            </div>
            <button
              className="bg-purple-400 text-white font-medium rounded-lg py-2 hover:bg-purple-300 flex justify-center items-center"
              disabled={isPending}
            >
              {isPending ? (
                <Loading type="spin" height={25} width={25} />
              ) : (
                "Create Plane"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PlaneCreate;
