import DashboardNavbar from "@components/dashboard/DashboardNavbar";
import DashboardSidebar from "@components/dashboard/DashboardSidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(true);
  const handleOpenSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

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
