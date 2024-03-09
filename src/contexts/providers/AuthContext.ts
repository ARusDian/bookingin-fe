import { createContext, useContext } from "react";

interface AuthContextProps {
  id: number,
  name: string,
  role: string,
  logout: () => void,
}

const AuthContext = createContext<AuthContextProps>({
  id: 0,
  role: "",
  name: "",
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export default AuthContext;