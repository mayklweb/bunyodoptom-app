// app/router/router.jsx
import { Routes, Route, Navigate } from "react-router-dom";

// import HomePage from "@/pages/home/HomePage";
// import LoginPage from "@/pages/auth/LoginPage";
// import RegisterPage from "@/pages/auth/RegisterPage";
// import ProfilePage from "@/pages/profile/ProfilePage";
// import CartPage from "@/pages/cart/CartPage";
// import ProductPage from "@/pages/product/ProductPage";
import ProtectedRoute from "../../shared/ui/ProtectedRoute";
import HomePage from "../../pages/home/HomePage";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* Protected routes */}
      {/* <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      /> */}

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
