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
import { FaEye, FaEyeSlash } from "react-icons/fa";

const postUser = async (data: UserForm, token: string) => {
  const { data: response } = await api.post("/register", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

const Register = () => {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const [data, setData] = useState<UserForm>({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


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
      <div className="flex items-center justify-center">
        <form
          className="bg-white w-screen rounded-lg"
          onSubmit={onSubmit}
        >
          <h1 className="text-center font-bold text-4xl mb-2">
            Daftar Akun
          </h1>
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Nama
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-pink-500"
            placeholder="Isi Nama"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            required
          />

          <label
            htmlFor="email"
            className="block mt-4 text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-pink-500"
            placeholder="Isi E-mail"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
          />

          <label
            htmlFor="phone"
            className="block mt-4 text-gray-700 text-sm font-bold mb-2"
          >
            Nomor Telepon
          </label>
          <input
            type="tel"
            id="phone"
            className="bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-pink-500"
            placeholder="Isi Nomor Telepon"
            value={data.phone}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
            required
          />

          <div className="my-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Kata Sandi
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-pink-500"
                placeholder="Kata Sandi"
                id="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                name="password"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            className="bg-pink-400 mt-4 w-full hover:bg-pink-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
