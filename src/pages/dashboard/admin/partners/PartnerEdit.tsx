import { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

const PartnerEdit = () => {
  const [type, setType] = useState<string>("hotel");

  return (
    <div className="px-6 py-4">
      <div className="flex max-w-2xl justify-between mx-auto items-center relative">
        <Link
          to={"../.."}
          relative="path"
          className="absolute flex items-center gap-2 font-roboto hover:text-purple-500"
        >
          <IoMdArrowBack className="text-xl" />
          <span>Kembali</span>
        </Link>
        <p className="text-2xl font-semibold text-center mb-4 flex-1">
          Edit Mitra
        </p>
        <p></p>
      </div>
      <div className="max-w-2xl mx-auto border rounded-lg shadow-md">
        <form className="flex flex-col p-4 space-y-4">
          <div className="flex flex-col space-y-1">
            <label htmlFor="role" className="text-lg font-medium">
              Jenis
            </label>
            <select
              id="role"
              className="border p-2 rounded-lg"
              value={type}
              onChange={(e) => setType(e.target.value)}
              disabled
            >
              <option value="hotel">Hotel</option>
              <option value="airline">Maskapai</option>
            </select>
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="name" className="text-lg font-medium">
              Name
            </label>
            <input type="text" id="name" className="border p-2 rounded-lg" />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="description" className="text-lg font-medium">
              Deskripsi
            </label>
            <textarea id="description" className="border p-2 rounded-lg" />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="alamat" className="text-lg font-medium">
              Alamat
            </label>
            <input
              type="text"
              id="alamat"
              className="border p-2 rounded-lg"
              disabled={type === "airline"}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 w-full bg-purple-200 font-medium flex justify-center items-center space-x-1 rounded-lg hover:bg-purple-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PartnerEdit;
