// app/router/router.jsx
import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "../../shared/ui/ProtectedRoute";
import HomePage from "../../pages/home/HomePage";
import ProfilePage from "../../pages/profile/ProfilePage";
import LoginPage from "../../pages/login/LoginPage";
import MainLayout from "../../layouts/MainLayout";
import AuthLayout from "../../layouts/AuthLayout";
import SignupPage from "../../pages/signup/SignupPage";
import CartPage from "../../pages/cart/CartPage";
import CategoriesPage from "../../pages/categories/CategoriesPage";
import ProductsPage from "../../pages/products/ProductsPage";
import ProductPage from "../../pages/product/ProductPage";
import CheckoutPage from "../../pages/checkout/CheckoutPage";

export default function Router() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories/:id" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />

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
        <Route path="/signup" element={<SignupPage />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
