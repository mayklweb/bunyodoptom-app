// app/router/router.jsx
import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "../../shared/ui/ProtectedRoute";
import HomePage from "../../pages/home/HomePage";
import ProfilePage from "../../pages/profile/ProfilePage";
import LoginPage from "../../pages/login/LoginPage";
import MainLayout from "../../layouts/MainLayout";
import AuthLayout from "../../layouts/AuthLayout";

export default function Router() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        {/* Protected routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* 🔥 AUTH LAYOUT */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
