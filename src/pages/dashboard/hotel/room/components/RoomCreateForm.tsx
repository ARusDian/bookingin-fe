import React, { useState } from "react";
import { CreateHotelRoom, FacilityResponse, TypeResponse } from "@lib/model";
import { IoMdAdd } from "react-icons/io";
import CreateTypeModal from "./CreateTypeModal";
import { useQuery } from "@tanstack/react-query";
import api from "@lib/api";
interface Props {
  state: {
    data: CreateHotelRoom;
    setData: React.Dispatch<React.SetStateAction<CreateHotelRoom>>;
    token: string;
    hotel_id: string;
  };
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const RoomCreateForm = ({
  state: { data, setData, hotel_id, token },
  onSubmit,
}: Props) => {
  const [openAddRoomTypeModal, setOpenAddRoomTypeModal] =
    useState<boolean>(false);

  const {
    data: typeData = [],
    isLoading,
    refetch,
    isRefetching,
  } = useQuery<TypeResponse[]>({
    queryKey: ["type", hotel_id],
    queryFn: () =>
      api
        .get("/partner/hotel/type/get", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            hotel_id,
          },
        })
        .then((res) => res.data.data),
  });

  const { data: facilityData = [], isLoading: isLoadingFacility } = useQuery<
    FacilityResponse[]
  >({
    queryKey: ["facility", hotel_id],
    queryFn: () =>
      api
        .get("/partner/hotel/facility/get", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            hotel_id,
          },
        })
        .then((res) => res.data.data),
  });

  return (
    <>
      <CreateTypeModal
        open={openAddRoomTypeModal}
        setOpen={setOpenAddRoomTypeModal}
        refetch={refetch}
        states={{
          data: facilityData,
          isLoading: isLoadingFacility,
          hotel_id,
          token: token,
        }}
      />
      <form className="flex flex-col px-4 pb-4 space-y-4" onSubmit={onSubmit}>
        <div className="flex flex-col space-y-1">
          <label htmlFor="name" className="text-lg font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="border p-2 rounded-lg"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            required
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="description" className="text-lg font-medium">
            Description
          </label>
          <textarea
            id="description"
            className="border p-2 rounded-lg"
            value={data.description}
            onChange={(e) =>
              setData({
                ...data,
                description: e.target.value,
              })
            }
            required
          />
        </div>
        <div className="flex flex-col space-y-1 pb-2">
          <label htmlFor="name" className="text-lg font-medium">
            Select Room Type
          </label>
          <div className="flex flex-row gap-2">
            <select
              id="type"
              className="border p-2 rounded-lg w-11/12"
              disabled={typeData.length === 0 || isLoading || isRefetching}
              value={data.type_id || ""}
              onChange={(e) =>
                setData({
                  ...data,
                  type_id: parseInt(e.target.value),
                })
              }
              required
            >
              {typeData.length > 0 ? (
                typeData.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))
              ) : (
                <option value="">No Type Available</option>
              )}
            </select>
            <button
              type="button"
              onClick={() => setOpenAddRoomTypeModal(true)}
              className="flex-1 flex justify-center items-center rounded-lg bg-purple-200"
            >
              <IoMdAdd className="text-2xl" />
            </button>
          </div>
        </div>
        <button type="submit" className="bg-purple-200 p-2 rounded-lg">
          Add Room
        </button>
      </form>
    </>
  );
};

export default RoomCreateForm;
