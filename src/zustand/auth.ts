import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user?: {
    name: string;
    role: string;
    balance: number;
  };
  setUser: (user: { name: string; role: string; balance: number }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: undefined,
      setUser: (user) => set(() => ({ user })),
      logout: () => {
        set(() => ({ user: undefined }));
        localStorage.removeItem("auth-storage");
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
