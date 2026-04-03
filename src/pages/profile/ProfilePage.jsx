import { useState, useEffect, useRef, useCallback } from "react";
import BottomSheet from "../../shared/ui/BottomSheet";
import PersonalInfo from "../../features/profile/ui/sections/PersonalInfo";
import {
  DeliveryIcon,
  FavoriteIcon,
  FileIcon,
  LocationIcon,
  MarketIcon,
} from "../../assets/icons";

const NAV_ITEMS = [
  { key: "personal", label: "Shaxsiy ma'lumotlar", icon: <FileIcon /> },
  { key: "orders", label: "Buyurtmalar", icon: <DeliveryIcon /> },
  { key: "addresses", label: "Manzillar", icon: <LocationIcon /> },
  { key: "favorites", label: "Sevimlilar", icon: <FavoriteIcon /> },
  { key: "shop", label: "Do'kon", icon: <MarketIcon /> },
];

const MOCK_USER = {
  name: "Alisher Toshmatov",
  phone: "+998 90 123 45 67",
  id: "USR-0042",
};

function PlaceholderSection({ title, icon }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h2 style={{ fontSize: 20, fontWeight: 500 }}>{title}</h2>
      <div
        style={{
          background: "#fff",
          border: "0.5px solid rgba(0,0,0,0.12)",
          borderRadius: 12,
          padding: "48px 24px",
          textAlign: "center",
          color: "#aaa",
        }}
      >
        <div style={{ fontSize: 36, marginBottom: 12 }}>{icon}</div>
        <p style={{ fontSize: 14 }}>{title} bo'limi hozircha bo'sh</p>
      </div>
    </div>
  );
}

const SECTION_MAP = {
  personal: null, // rendered separately so it receives props
  orders: <PlaceholderSection title="Buyurtmalar" icon={<DeliveryIcon />} />,
  addresses: <PlaceholderSection title="Manzillar" icon={<LocationIcon />} />,
  favorites: <PlaceholderSection title="Sevimlilar" icon={<FavoriteIcon />} />,
  shop: <PlaceholderSection title="Do'kon" icon={<MarketIcon />} />,
};

// ── Sidebar ────────────────────────────────────────────────────────────────

// ── BottomSheet ────────────────────────────────────────────────────────────

// ── App (root) ─────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const [active, setActive] = useState("personal");
  const [sheetNav, setSheetNav] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [loggingOut, setLoggingOut] = useState(false);

  // useEffect(() => {
  //   const check = () => setIsMobile(window.innerWidth < 1024);
  //   window.addEventListener("resize", check);
  //   return () => window.removeEventListener("resize", check);
  // }, []);

  const handleNav = useCallback((key) => {
    setActive(key);

    setSheetNav(key);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setSheetOpen(true)),
    );
  });

  const handleClose = () => {
    setSheetOpen(false);
    setTimeout(() => {
      setSheetNav(null);
      setActive("personal");
    }, 380);
  };

  const handleLogout = () => {
    setLoggingOut(true);
    // Replace with your real logout call
    setTimeout(() => {
      setLoggingOut(false);
      alert("Logged out!");
    }, 1000);
  };

  const renderSection = (key) => {
    if (key === "personal")
      return <PersonalInfo onLogout={handleLogout} loggingOut={loggingOut} />;
    return SECTION_MAP[key];
  };

  const sheetTitle = sheetNav
    ? (NAV_ITEMS.find((n) => n.key === sheetNav)?.label ?? "")
    : "";

  return (
    <>
      <div>
        <div className="container">
          <div>
            <div className="mt-20">
              <div className="flex flex-col gap-3">
                <div className="bg-white/10 rounded-[14px] border border-secondary py-[14px] px-4 flex items-center gap-3">
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: "#e6f1fb",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 15,
                      fontWeight: 500,
                      color: "#185fa5",
                      flexShrink: 0,
                    }}
                  >
                    AT
                  </div>
                  <div>
                    <p style={{ fontWeight: 500, fontSize: 15 }}>
                      {MOCK_USER.name}
                    </p>
                    <p style={{ fontSize: 13, color: "#888" }}>
                      {MOCK_USER.phone}
                    </p>
                  </div>
                </div>

                {NAV_ITEMS.map(({ key, label, icon }) => (
                  <button
                    key={key}
                    onClick={() => handleNav(key)}
                    className="w-full text-primary text-base py-3 px-4 bg-white flex items-center justify-between border border-primary rounded-[14px]"
                  >
                    <span className="flex items-center gap-3">
                      <span>{icon}</span>
                      {label}
                    </span>
                  </button>
                ))}

                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="text-base text-red mt-6 p-3.5 font-medium rounded-[14px] bg-red/10 border border-red/40"
                >
                  {loggingOut ? "Chiqilmoqda..." : "Hisobdan chiqish"}
                </button>
              </div>

              <BottomSheet
                title={sheetTitle}
                open={sheetOpen}
                onClose={handleClose}
              >
                {sheetNav && renderSection(sheetNav)}
              </BottomSheet>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
