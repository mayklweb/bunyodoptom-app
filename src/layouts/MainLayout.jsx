// import Header from "@/widgets/Header";
// import Footer from "@/widgets/Footer";
import { Outlet } from "react-router-dom";
import Footer from "../widgets/footer/Footer";
import Header from "../widgets/header/Header";

export default function MainLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
