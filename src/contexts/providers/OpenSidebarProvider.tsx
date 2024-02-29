import { OpenSidebarContext } from "../OpenSidebarContext";
import { PropsWithChildren, useState } from "react";


const OpenSidebarProvider = ({ children }: PropsWithChildren) => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(true);
  
  const handleOpenSidebar = () => {
    setOpenSidebar((prev) => !prev);
  };

  return (
    <OpenSidebarContext.Provider value={{ openSidebar, handleOpenSidebar }}>
      {children}
    </OpenSidebarContext.Provider>
  );
};

export default OpenSidebarProvider;