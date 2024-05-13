import api from "@lib/api";
import {
  AirlineTypeCreate,
  AirlineTypeResponse,
  AxiosErrorResponse,
} from "@lib/model";
import FormModal from "@pages/dashboard/components/FormModal";
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from "@tanstack/react-query";
import { showErrorToast, showSuccessToast } from "@utils/toast";
import { AxiosError } from "axios";
import React, { useState } from "react";

interface Props {
  open: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  state: {
    airline_id: string;
    token: string;
  };
  refetch?: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<AirlineTypeResponse, Error>>;
}

const CreateTypeFormModal = ({
  open,
  onClose,
  state: { airline_id, token },
  refetch,
}: Props) => {
  const [type, setType] = useState<AirlineTypeCreate>({
    airline_id: Number(airline_id),
    name: "",
    description: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: AirlineTypeCreate) =>
      api
        .post("/partner/airline/type/create", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data),
    onSuccess: (res) => {
      onClose(false);
      setType({ airline_id: Number(airline_id), name: "", description: "" });
      refetch && refetch();
      showSuccessToast(res.message);
    },
    onError: (error: AxiosError) => {
      const errorData: AxiosErrorResponse = error.response
        ?.data as AxiosErrorResponse;
      showErrorToast(errorData.message);
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(type);
  };

  return (
    <FormModal open={open} onClose={() => onClose(false)}>
      <div className="w-96 p-2">
        <h1 className="text-lg font-medium mb-4">Create Type</h1>
        <form className="flex flex-col space-y-2" onSubmit={onSubmit}>
          <div className="flex flex-col space-y-1">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="border rounded-lg px-3 py-2"
              value={type.name}
              onChange={(e) => setType({ ...type, name: e.target.value })}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="name" className="text-sm font-medium">
              Description
            </label>
            <textarea
              id="name"
              name="name"
              className="border rounded-lg px-3 py-2"
              value={type.description}
              onChange={(e) =>
                setType({ ...type, description: e.target.value })
              }
            />
          </div>
          <button
            className="bg-purple-400 text-white font-medium rounded-lg py-2 hover:bg-purple-300"
            disabled={isPending}
          >
            Create Type
          </button>
        </form>
      </div>
    </FormModal>
  );
};

export default CreateTypeFormModal;
