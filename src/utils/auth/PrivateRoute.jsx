import { isTokenValid } from "./auth.utils";
import { Navigate, Outlet } from "react-router-dom";
const PrivateRoute = () => {
  return isTokenValid() ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute