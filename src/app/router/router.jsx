// app/router/router.jsx
import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "../../shared/ui/ProtectedRoute";
import HomePage from "../../pages/home/home";
import ProfilePage from "../../pages/profile/profile";
import LoginPage from "../../pages/login/login";
import MainLayout from "../../layouts/MainLayout";
import AuthLayout from "../../layouts/AuthLayout";
import SignupPage from "../../pages/signup/signup";
import CartPage from "../../pages/cart/cart";
import CategoriesPage from "../../pages/categories/categories";
import ProductsPage from "../../pages/products/products";
import ProductPage from "../../pages/product/product";
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
        <Route path="/checkout" element={<CheckoutPage />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
