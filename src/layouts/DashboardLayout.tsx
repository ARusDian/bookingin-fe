import DashboardNavbar from "@components/dashboard/DashboardNavbar";
import DashboardSidebar from "@components/dashboard/DashboardSidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div>
      <DashboardNavbar />
      <DashboardSidebar />
      <div className="ml-64 mt-20 bg-slate-50 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
