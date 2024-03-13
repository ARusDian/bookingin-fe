import React, { useState } from "react";
import { CreateHotelRoom } from "@lib/model";
import FormModal from "@pages/dashboard/components/FormModal";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";

interface Props {
  state: {
    data: CreateHotelRoom;
    setData: React.Dispatch<React.SetStateAction<CreateHotelRoom>>;
  };
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const RoomCreateForm = ({ state: { data, setData }, onSubmit }: Props) => {
  const [openAddRoomTypeModal, setOpenAddRoomTypeModal] =
    useState<boolean>(false);

  return (
    <>
      <FormModal
        open={openAddRoomTypeModal}
        onClose={() => setOpenAddRoomTypeModal(false)}
      >
        <div className="w-[400px]">
          <p className="text-2xl font-bold mb-4">Add Type</p>
          <form className="mt-2 flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Type Name</label>
              <input
                type="text"
                className="border p-2 rounded-lg"
                placeholder="Type Name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Type Description</label>
              <textarea
                className="border p-2 rounded-lg"
                placeholder="Type Description"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Price</label>
              <input
                type="text"
                className="border p-2 rounded-lg"
                placeholder="Type Name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Select Facilities</label>
              <div className="flex flex-row gap-2">
                <select
                  id="type"
                  className="border p-2 rounded-lg w-10/12"
                  required
                >
                  <option value="single">Single</option>
                </select>
                <Link
                  to={"../../facility/add"}
                  relative="path"
                  className="flex-1 flex justify-center items-center rounded-lg bg-green-200"
                >
                  <IoMdAdd className="text-2xl" />
                </Link>
              </div>
            </div>
            <button type="submit" className="bg-green-200 p-2 rounded-lg mt-2">
              Add
            </button>
          </form>
        </div>
      </FormModal>
      <form className="flex flex-col px-4 pb-4 space-y-4" onSubmit={onSubmit}>
        <div className="flex flex-col space-y-1">
          <label htmlFor="name" className="text-lg font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="border p-2 rounded-lg"
            value={data.room.name}
            onChange={(e) =>
              setData({
                ...data,
                room: { ...data.room, name: e.target.value },
              })
            }
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
            value={data.room.description}
            onChange={(e) =>
              setData({
                ...data,
                room: { ...data.room, description: e.target.value },
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
              required
            >
              <option value="single">Single</option>
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
