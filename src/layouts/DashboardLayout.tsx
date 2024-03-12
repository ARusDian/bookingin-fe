import DashboardNavbar from "@components/dashboard/DashboardNavbar";
import DashboardSidebar from "@components/dashboard/DashboardSidebar";
import api from "@lib/api";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../zustand/auth";

const DashboardLayout = () => {
  const [cookies, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const [openSidebar, setOpenSidebar] = useState<boolean>(true);
  const handleOpenSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const { user, setUser, logout } = useAuthStore((state) => ({
    user: state.user,
    setUser: state.setUser,
    logout: state.logout,
  }));

  useEffect(() => {
    const getProfile = () => {
      if (!user)
        api
          .get("/me", {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          })
          .then((res) => {
            setUser({
              name: res.data.data.name,
              role: res.data.data.role,
            });
          })
          .catch((err) => {
            if (err.response.status === 401) {
              removeCookie("token");
              logout();
            }
            console.log(err);
          });
    };

    if (!cookies.token) {
      navigate("/login-admin");
    } else {
      getProfile();
    }
  }, [navigate, cookies.token, removeCookie, setUser, logout, user]);

  return (
    <div className="bg-slate-50">
      <DashboardNavbar
        handleOpenSidebar={handleOpenSidebar}
        isSidebarOpen={openSidebar}
      />
      <DashboardSidebar isOpen={openSidebar} />
      <div
        className={`${
          openSidebar ? "pl-64" : ""
        } pt-20 min-h-screen transition-all duration-300`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
