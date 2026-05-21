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
import DeleteAccount from "../../pages/daleteaccount/daleteaccount";
import PrivacyPolicy from "../../pages/privacypolicy/privacy-policy";
import OfflinePage from "../../pages/offline/offline";
import useOnlineStatus from "../../shared/hooks/useOnlineStatus";

export default function Router() {
  const isOnline = useOnlineStatus();

  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={isOnline ? <HomePage /> : <OfflinePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/:id" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/delete-account" element={<DeleteAccount />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
