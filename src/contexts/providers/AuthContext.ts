import { createContext, useContext } from "react";

interface AuthContextProps {
  id: number,
  role: string,
  logout: () => void,
}

const AuthContext = createContext<AuthContextProps>({
  id: 0,
  role: "",
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export default AuthContext;