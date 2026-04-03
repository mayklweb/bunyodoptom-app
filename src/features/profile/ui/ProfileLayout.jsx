import { useEffect, useState } from "react";
import { useUIStore } from "@/store/useUIStore";
import { useLogout } from "@/shared/hooks/useAuth";

import { Sidebar } from "../components/Sidebar";
import ProfileContent from "./ProfileContent";
import ProfileMobileSheet from "./ProfileMobileSheet";

import { NAV_ITEMS } from "../../model/constants";

export default function ProfileLayout() {
  const [isMobile, setIsMobile] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetNav, setSheetNav] = useState(null);

  const { activeSection, setActiveSection } = useUIStore();
  const { mutate: logout, isPending } = useLogout();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile && activeSection !== "personal") {
      setSheetNav(activeSection);
      setTimeout(() => setSheetOpen(true), 0);
    }
  }, [activeSection, isMobile]);

  const handleNavClick = (key) => {
    setActiveSection(key);

    if (isMobile) {
      setSheetNav(key);
      setTimeout(() => setSheetOpen(true), 0);
    }
  };

  const handleClose = () => {
    setSheetOpen(false);
    setTimeout(() => setSheetNav(null), 400);
    setActiveSection("personal");
  };

  const sheetTitle =
    NAV_ITEMS.find((n) => n.key === sheetNav)?.label || "";

  return (
    <section>
      <div className="container mt-24 flex flex-col gap-5">
        <div className="flex gap-5">
          <Sidebar
            activeNav={activeSection}
            onNavClick={handleNavClick}
          />

          {!isMobile && <ProfileContent active={activeSection} />}
        </div>

        <button
          onClick={logout}
          disabled={isPending}
          className="lg:hidden mt-2 w-full py-3 border rounded-xl text-red-500"
        >
          {isPending ? "Chiqilmoqda..." : "Hisobdan chiqish"}
        </button>
      </div>

      {isMobile && (
        <ProfileMobileSheet
          open={sheetOpen}
          onClose={handleClose}
          title={sheetTitle}
          section={sheetNav}
        />
      )}
    </section>
  );
}