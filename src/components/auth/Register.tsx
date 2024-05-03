import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [post, setPost] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    role_id: 0,
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };


  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   console.log("Data to be sent:", post);
  //   api
  //     .post("/auth/register", post)
  //     .then((response) => {
  //       console.log("Data successfully sent:", response);
  //       navigate("/dashboard-admin/user");
  //     })
  //     .catch((err) => console.log("Error sending data:", err));
  // };

  return (
    <>
      <div className="flex items-center justify-center">
        <form
          className="bg-white w-screen rounded-lg"
          // onSubmit={handleSubmit}
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
            className="bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-pink-500"
            placeholder="Isi Nama"
            onChange={handleInput}
            name="name"
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
            onChange={handleInput}
            name="email"
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
            onChange={handleInput}
            name="phone"
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
                onChange={handleInput}
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
