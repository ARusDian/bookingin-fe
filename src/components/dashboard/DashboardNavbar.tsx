import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { useEffect, useState, useRef } from "react";

interface Props {
  handleOpenSidebar: () => void;
  isSidebarOpen: boolean;
}

const DashboardNavbar = ({ handleOpenSidebar, isSidebarOpen }: Props) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] =
    useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

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
      <div className="h-20 shadow-md flex items-center pl-6 pr-8">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={handleOpenSidebar}>
              <RxHamburgerMenu className="text-3xl" />
            </button>
            <p>
              Welcome! <span className="font-medium">Admin</span>
            </p>
          </div>
          <div
            className="flex items-center gap-3 cursor-pointer relative"
            onClick={() => setIsProfileDropdownOpen((prev) => !prev)}
            ref={dropdownRef}
          >
            <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center">
              PP
            </div>
            <p className="font-medium">Ariq Ah Ah</p>
            <button>
              <IoIosArrowDown />
            </button>

            {isProfileDropdownOpen && (
              <div className="absolute top-16 right-0 w-36 bg-white shadow-md rounded-md py-2">
                <div className="px-4 py-2 flex gap-2 items-center cursor-pointer">
                  <IoIosLogOut className="text-xl" />
                  <p>Logout</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
