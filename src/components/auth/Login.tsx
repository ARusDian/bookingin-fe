import api from "@lib/api";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { AxiosErrorResponse } from "@lib/model";
import { showErrorToast } from "@utils/toast";
import Loading from "react-loading";
// import { Helmet } from "react-helmet-async";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookie["token"]) {
      navigate("/");
    }
  }, [cookie, navigate]);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    api
      .post("/login", { email, password })
      .then((res) => {
        setCookie("token", res.data.data.token, {
          expires: new Date(res.data.data.expires_at),
        });
      })
      .catch((err: AxiosError) => {
        const errorResponse: AxiosErrorResponse = err.response
          ?.data as AxiosErrorResponse;
        if (errorResponse.code === 401) {
          showErrorToast(errorResponse.message);
        }
      })
      .finally(() => {
        setLoading(false);
        // window.location.reload()
      });
  };

  return (
    <div className="items-center justify-center">
      <form className="bg-white" onSubmit={handleSubmit}>
        <h2 className="text-4xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            E-mail
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-pink-500"
            placeholder="Isi Email Pengguna"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Kata Sandi
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-pink-500"
              placeholder="Isi Kata Sandi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          type="submit"
          disabled={loading}
          className="bg-pink-400 hover:bg-pink-700 text-white w-full font-bold py-2 px-4 rounded flex justify-center items-center"
        >
          {loading ? (
            <Loading type="spin" color="#fff" width={25} height={25} />
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
