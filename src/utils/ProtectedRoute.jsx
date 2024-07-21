import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../components/auth/AuthProvider";

function ProtectedRoute() {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/" replace={true} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
