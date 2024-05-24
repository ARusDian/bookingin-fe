import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "@lib/api";

const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    api
      .post(
        `/forgot-password`,
        {
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    toast.success("Email untuk reset password telah dikirim!");
  };

  return (
    <>
      <form className="mb-4" onSubmit={handleSubmit}>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email:
        </label>
        <input
          type="email"
          id="email"
          className="mt-1 p-2 border rounded w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="bg-pink-400 mt-4 w-full hover:bg-pink-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Kirim !
        </button>
      </form>
    </>
  );
};

export default ResetPasswordForm;
