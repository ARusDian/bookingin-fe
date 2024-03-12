import { PropsWithChildren, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";
import api from "@lib/api";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState({ id: 0, name: "", role: "" });
  const [cookies, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.token) {
      navigate("/login-admin");
    } else if (!data.id) {
      api
        .get("/me", {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        })
        .then((res) => {
          setData({
            id: res.data.data.id,
            name: res.data.data.name,
            role: res.data.data.role,
          });
        })
        .catch((err) => {
          if (err.response.status === 401) {
            removeCookie("token");
          }
          console.log(err);
        });
    }
  }, [cookies, removeCookie, navigate, data]);

  const logout = () => {
    removeCookie("token");
  };

  return (
    <AuthContext.Provider value={{ logout, ...data }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
