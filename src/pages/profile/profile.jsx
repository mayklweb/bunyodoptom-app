import { useState, useCallback } from "react";
import BottomSheet from "../../shared/ui/BottomSheet";
import PersonalInfo from "../../features/profile/ui/sections/PersonalInfo";
import {
  DeliveryIcon,
  FavoriteIcon,
  FileIcon,
  LocationIcon,
  MarketIcon,
  RightIcon,
} from "../../assets/icons";
import { Orders } from "../../features/profile/ui/sections/Order";
import { Addresses } from "../../features/profile/ui/sections/Addresses";
import { Favorites } from "../../features/profile/ui/sections/Fovarite";
import { Market } from "../../features/profile/ui/sections/Market";
import { useLogout } from "../../features/auth/hooks/useAuthUser";

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

const SECTION_MAP = {
  personal: null, // rendered separately so it receives props
  orders: <Orders />,
  addresses: <Addresses title="Manzillar" icon={<LocationIcon />} />,
  favorites: <Favorites title="Sevimlilar" icon={<FavoriteIcon />} />,
  shop: <Market title="Do'kon" icon={<MarketIcon />} />,
};

export default function ProfilePage() {
  const [active, setActive] = useState("personal");
  const [sheetNav, setSheetNav] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const logout = useLogout();

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

  const renderSection = (key) => {
    if (key === "personal") return <PersonalInfo />;
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
            <div className="pt-20">
              <div className="flex flex-col gap-3">
                <div className="rounded-[14px] bg-white py-[14px] px-4 flex items-center gap-3">
                  <div className="w-12 h-12 text-base font-medium bg-secondary/50 rounded-[50%] flex items-center justify-center">
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
                    className="w-full text-primary text-base py-2 px-1 flex items-center justify-between border-b border-primary "
                  >
                    <span className="flex items-center gap-3">
                      <span>{icon}</span>
                      <span>{label}</span>
                    </span>
                    <span>
                      <RightIcon className={"w-5 h-5"} />
                    </span>
                  </button>
                ))}

                <button
                  onClick={logout}
                  className="text-base text-red mt-6 p-3 font-medium rounded-[14px] bg-red/10 border border-red/40"
                >
                  Hisobdan chiqish
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
