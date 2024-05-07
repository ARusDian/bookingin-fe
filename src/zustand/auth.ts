import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user?: {
    name: string;
    role: string;
  };
  setUser: (user: { name: string; role: string }) => void;
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