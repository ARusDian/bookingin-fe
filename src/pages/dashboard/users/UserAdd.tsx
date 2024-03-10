import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { useState } from "react";
import api from "@lib/api";
import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosError } from "axios";
import { AxiosErrorResponse, UserForm } from "@lib/model";

const postUser = async (data: UserForm, token: string) => {
  const { data: response } = await api.post("/admin/user/create", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

const UserAdd = () => {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const [data, setData] = useState<UserForm>({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: UserForm) => postUser(data, cookies.token),
    onError: (error: AxiosError) => {
      const errorData: AxiosErrorResponse = error.response
        ?.data as AxiosErrorResponse;
      toast.error(errorData.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
    onSuccess: (data) => {
      console.log(data);
      navigate("..", { relative: "path" });
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(data);
  };

  return (
    <>
      <div className="py-4 px-6">
        <div className="flex max-w-2xl justify-between mx-auto items-center relative">
          <Link
            to={".."}
            relative="path"
            className="absolute flex items-center gap-2 font-roboto hover:text-purple-500"
          >
            <IoMdArrowBack className="text-xl" />
            <span>Kembali</span>
          </Link>
          <p className="text-2xl font-semibold text-center mb-4 flex-1">
            Add User
          </p>
          <p></p>
        </div>
        <div className="max-w-2xl mx-auto border rounded-lg shadow-md">
          <form className="flex flex-col p-4 space-y-4" onSubmit={onSubmit}>
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
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="email" className="text-lg font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="border p-2 rounded-lg"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="email" className="text-lg font-medium">
                Phone Number
              </label>
              <input
                type="number"
                className="border p-2 rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="password" className="text-lg font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="border p-2 rounded-lg"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="role" className="text-lg font-medium">
                Role
              </label>
              <select
                id="role"
                className="border p-2 rounded-lg"
                value={data.role}
                onChange={(e) =>
                  setData({
                    ...data,
                    role: e.target.value as "admin" | "user" | "partner",
                  })
                }
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="partner">Partner</option>
              </select>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-4 py-2 w-full bg-purple-200 font-medium flex justify-center items-center space-x-1 rounded-lg hover:bg-purple-300 disabled:bg-purple-100 disabled:cursor-not-allowed"
                disabled={isPending}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserAdd;
