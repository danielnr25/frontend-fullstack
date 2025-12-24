import { isTokenValid } from "./auth.utils";
import { Navigate, Outlet } from "react-router-dom";
// Outlet: contenedor de rutas hijas, es muy utilizados para paneles administrativos
const PrivateRoute = () => {
  return isTokenValid() ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute