import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../features/auth/model/useAuthStore";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}