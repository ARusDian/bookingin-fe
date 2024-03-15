import api from "@lib/api";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Loading from "react-loading";

const LoginAdmin = () => {
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookie["token"]) {
      navigate("/dashboard");
    }
  }, [cookie, navigate]);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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
      .catch((err) => {
        console.log(err);
      }).finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96">
        <h1 className="text-3xl font-medium mb-4">Login Admin</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex justify-center items-center w-full bg-purple-600 text-white font-medium py-2 rounded-lg hover:bg-purple-700"
          >
            {loading ? <Loading type="spin" color="#fff" width={25} height={25}/> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
