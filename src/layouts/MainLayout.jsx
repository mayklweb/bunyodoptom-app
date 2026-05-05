import { Outlet, useLocation } from "react-router-dom";
import Footer from "../widgets/footer/Footer";
import Header from "../widgets/header/Header";

export default function MainLayout() {
  const location = useLocation();

  const hideHeader =
    location.pathname.startsWith("/profile") ||
    location.pathname.startsWith("/cart");
  return (
    <>
      {!hideHeader && <Header />}
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
