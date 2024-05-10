import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AdminState {
  partner?: {
    id: number | undefined;
    name: string | undefined;
  };
  setPartner: (partner: { id: number; name: string }) => void;
  deletePartner: () => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      partner: undefined,
      setPartner: (partner) => set(() => ({ partner })),
      deletePartner: () => {
        set(() => ({ partner: undefined }));
        localStorage.removeItem("admin-storage");
      },
    }),
    {
      name: "admin-storage",
    }
  )
);
