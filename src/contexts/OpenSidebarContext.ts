import { createContext, useContext } from "react";

interface OpenSidebarContextData {
  openSidebar: boolean;
  handleOpenSidebar: () => void;
}

export const OpenSidebarContext = createContext<OpenSidebarContextData>(
  {} as OpenSidebarContextData
);

export const useOpenSidebar = () => useContext(OpenSidebarContext);
