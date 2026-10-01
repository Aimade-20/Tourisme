import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function GuideRoute() {
  const { isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (user?.role !== "guide") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}