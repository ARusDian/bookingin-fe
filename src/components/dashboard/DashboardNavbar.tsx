import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "@contexts/providers/AuthContext";

interface Props {
  handleOpenSidebar: () => void;
  isSidebarOpen: boolean;
}

const DashboardNavbar = ({ handleOpenSidebar, isSidebarOpen }: Props) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] =
    useState<boolean>(false);
  const { name } = useAuth();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();

  useEffect(() => {
    const closeProfileDropdown = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        dropdownRef.current.contains(e.target as Node)
      ) {
        return;
      }
      setIsProfileDropdownOpen(false);
    };

    window.addEventListener("click", closeProfileDropdown);

    return () => {
      window.removeEventListener("click", closeProfileDropdown);
    };
  }, []);

  return (
    <div
      className={`z-40 absolute left-0 top-0 ${
        isSidebarOpen && "pl-64"
      }  w-full transition-all duration-300`}
    >
      <div className="h-20 shadow-md flex items-center px-6">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={handleOpenSidebar}>
              <RxHamburgerMenu className="text-3xl" />
            </button>
            <p>
              Welcome! <span className="font-medium">{name ? name : "..."}</span>
            </p>
          </div>
          <div
            className="flex items-center gap-3 cursor-pointer relative"
            onClick={() => setIsProfileDropdownOpen((prev) => !prev)}
            ref={dropdownRef}
          >
            <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center">
              AH
            </div>
            <p className="font-medium">{name ? name : "..."}</p>
            <button>
              <IoIosArrowDown />
            </button>

            {isProfileDropdownOpen && (
              <div className="absolute top-16 right-0 w-36 shadow-md rounded-md py-2 bg-white">
                <button
                  onClick={logout}
                  className="px-4 py-2 flex gap-2 items-center cursor-pointer"
                >
                  <IoIosLogOut className="text-xl" />
                  <p>Logout</p>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
