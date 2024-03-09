import DashboardNavbar from "@components/dashboard/DashboardNavbar";
import DashboardSidebar from "@components/dashboard/DashboardSidebar";
import AuthProvider from "@contexts/providers/AuthProvider";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(true);
  const handleOpenSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <AuthProvider>
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
    </AuthProvider>
  );
};

export default DashboardLayout;
