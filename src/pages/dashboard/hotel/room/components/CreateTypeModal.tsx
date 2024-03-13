import api from "@lib/api";
import { FacilityResponse, HotelTypeCreate, TypeResponse } from "@lib/model";
import FormModal from "@pages/dashboard/components/FormModal";
import { QueryObserverResult, RefetchOptions, useMutation } from "@tanstack/react-query";
import {
  currencyDeformatter,
  currencyFormatter,
} from "@utils/currency_formatter";
import { useMemo, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import Select from "react-select";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<TypeResponse[], Error>>
  states: {
    data: FacilityResponse[];
    isLoading: boolean;
    hotel_id: string | undefined;
    token: string;
  };
}

const CreateTypeModal = ({ open, setOpen, states: { data: facilityData, isLoading, hotel_id, token}, refetch }: Props) => {
  const [typeData, setTypeData] = useState<HotelTypeCreate>({
    hotel_id: parseInt(hotel_id!),
    name: "",
    description: "",
    price: 0,
    facilities: [],
  });

  const facilityOptions = useMemo(
    () =>
      facilityData.map((facility) => ({
        label: facility.name,
        value: facility.id,
      })),
    [facilityData]
  );

  const { mutate, isPending } = useMutation({
    mutationFn: (data: HotelTypeCreate) =>
      api
        .post("/partner/hotel/type/create", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data.data),
    onSuccess: () => {
      setOpen(false);
      refetch();
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(typeData);
  };

  if (isLoading) return;

  return (
    <FormModal open={open} onClose={() => setOpen(false)}>
      <div className="w-[400px]">
        <p className="text-2xl font-bold mb-4">Add Type</p>
        <form className="mt-2 flex flex-col gap-2" onSubmit={onSubmit}>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Type Name</label>
            <input
              type="text"
              className="border p-2 rounded-lg"
              placeholder="Type Name"
              value={typeData.name}
              onChange={(e) =>
                setTypeData({ ...typeData, name: e.target.value })
              }
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Type Description</label>
            <textarea
              className="border p-2 rounded-lg"
              placeholder="Type Description"
              value={typeData.description}
              onChange={(e) =>
                setTypeData({ ...typeData, description: e.target.value })
              }
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Price</label>
            <input
              type="text"
              className="border p-2 rounded-lg"
              placeholder="Type Name"
              value={currencyFormatter(typeData.price)}
              onChange={(e) =>
                setTypeData({
                  ...typeData,
                  price: currencyDeformatter(e.target.value),
                })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Select Facilities</label>
            <div className="flex flex-row gap-2">
              <Select
                className="border rounded-lg w-10/12"
                options={facilityOptions}
                onChange={(selectedOptions) => {
                  setTypeData({
                    ...typeData,
                    facilities: selectedOptions.map((option) => option.value),
                  });
                }}
                isMulti
              />
              <Link
                to={"../../facility/add"}
                relative="path"
                className="flex-1 flex justify-center items-center rounded-lg bg-green-200"
              >
                <IoMdAdd className="text-2xl" />
              </Link>
            </div>
          </div>
          <button disabled={isPending} type="submit" className="bg-green-200 p-2 rounded-lg mt-2">
            Add
          </button>
        </form>
      </div>
    </FormModal>
  );
};

export default CreateTypeModal;
