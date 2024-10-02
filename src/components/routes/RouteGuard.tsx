import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const RouteGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default RouteGuard;
