import { createContext, useState, useContext } from "react";
import { IUserData } from "../modules/authentication/models";

interface IAuthContext {
  isAuthenticated: boolean;
  setIsAuthenticated: (va: boolean) => void;
  userData: IUserData;
  setUserData: (userData: IUserData) => void;
}

const AuthContext = createContext({} as IAuthContext);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<IUserData>({} as IUserData);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, userData, setUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve estar dentro de um AuthProvider");
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
