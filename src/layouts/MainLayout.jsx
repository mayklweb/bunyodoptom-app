import { Outlet, useLocation } from "react-router-dom";
import Footer from "../widgets/footer/Footer";
import Header from "../widgets/header/Header";

export default function MainLayout() {
  const location = useLocation();

  const hideHeader =
    // location.pathname.startsWith("/profile") ||
    // location.pathname.startsWith("/cart") ||
    location.pathname.startsWith("/delete-account") ||
    location.pathname.startsWith("/privacy-policy")
  return (
    <>
      {!hideHeader && <Header />}
      <main className="w-full mt-20 h-[calc(100%-80px)]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
