import { TbUser } from "react-icons/tb";
import { TbTicket } from "react-icons/tb";
import { TbSettings2 } from "react-icons/tb";
import { TbHome } from "react-icons/tb";
import SidebarTile from "./SidebarTile";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";

interface Props {
  isOpen: boolean;
}

const DashboardSidebar = ({ isOpen }: Props) => {
  const { pathname } = useLocation();
  const currentPaths = useMemo(() => {
    const path = pathname
      .trim()
      .split("/")
      .filter((path) => path !== "");
    path.shift();
    return path;
  }, [pathname]);

  return (
    <div
      className={`z-50 w-64 h-screen fixed ${
        isOpen ? "left-0" : "-left-64"
      } top-0 border-r border-opacity-5 transition-all duration-300 `}
    >
      <p className="flex text-2xl font-bold h-20 items-center px-4 font-roboto tracking-wider">
        BOOKINGIN
      </p>
      <div className="flex flex-col">
        <SidebarTile isActive={currentPaths.length === 0} Icon={TbHome} name="Home" />
        <SidebarTile isActive={currentPaths[0] === "users"} Icon={TbUser} name="Users" />
        <SidebarTile isActive={currentPaths[0] === "plane-tickets"} Icon={TbTicket} name="Plane Tickets" />
        <SidebarTile isActive={currentPaths[0] === "hotel-tickets"} Icon={TbTicket} name="Hotel Tickets" />
        <SidebarTile isActive={currentPaths[0] === "partners"} Icon={TbSettings2} name="Partners" />
      </div>
    </div>
  );
};

export default DashboardSidebar;