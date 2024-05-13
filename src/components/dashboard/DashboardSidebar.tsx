import { TbUser } from "react-icons/tb";
import { LuHotel } from "react-icons/lu";
import { TbHome } from "react-icons/tb";
// import { RiProfileLine } from "react-icons/ri";
import SidebarTile from "./SidebarTile";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import { IoDocumentOutline } from "react-icons/io5";
import { SiEthiopianairlines } from "react-icons/si";
import { useAuthStore } from "../../zustand/auth";
import { CiCreditCard1 } from "react-icons/ci";

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
  const role = useAuthStore((state) => state.user?.role);

  return (
    <div
      className={`z-50 w-64 h-screen fixed ${
        isOpen ? "left-0" : "-left-64"
      } top-0 border-r border-opacity-5 transition-all duration-300 bg-white`}
    >
      <p className="flex text-2xl font-bold h-20 items-center px-4 font-roboto tracking-wider">
        BOOKINGIN
      </p>
      <div className="flex flex-col">
        <SidebarTile
          isActive={currentPaths.length === 0}
          Icon={TbHome}
          name="Home"
          linkTo="."
        />
        {role && (
          <>
            {/* {role === "PARTNER" && (
              <SidebarTile
                isActive={currentPaths[0] === "partner-profile"}
                Icon={RiProfileLine}
                name="Partner Profile"
                linkTo="./partner-profile"
              />
            )} */}
            <SidebarTile
              isActive={currentPaths[1] === "airline"}
              Icon={SiEthiopianairlines}
              name="Airline"
              linkTo="./partner/airline"
            />
            <SidebarTile
              isActive={currentPaths[1] === "hotel"}
              Icon={LuHotel}
              name="Hotel"
              linkTo="./partner/hotel"
            />
            {role === "ADMIN" && (
              <>
                <SidebarTile
                  isActive={currentPaths[0] === "user"}
                  Icon={TbUser}
                  name="Users"
                  linkTo="./user"
                />
                <SidebarTile
                  isActive={currentPaths[0] === "transactions"}
                  Icon={CiCreditCard1}
                  name="Transactions"
                  linkTo="./transactions"
                />
                {/* <SidebarTile
                  isActive={currentPaths[0] === "top-up"}
                  Icon={MdAttachMoney}
                  name="Top-up"
                  linkTo="./top-up"
                /> */}
                {/* <SidebarTile
                  isActive={currentPaths[0] === "partner" && !currentPaths[1]}
                  Icon={TbSettings2}
                  name="Partners"
                  linkTo="partner"
                /> */}
                <SidebarTile
                  isActive={currentPaths[0] === "log"}
                  Icon={IoDocumentOutline}
                  name="Log"
                  linkTo="log"
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardSidebar;
