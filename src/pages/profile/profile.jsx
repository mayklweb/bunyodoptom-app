import { useState, useCallback } from "react";
import BottomSheet from "../../shared/ui/BottomSheet";
import PersonalInfo from "../../features/profile/ui/sections/PersonalInfo";
import {
  DeliveryIcon,
  EditIcon,
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

const sections = [
  {
    title: "Profile",
    items: [
      {
        name: "Profile",
        key: "personal",
        icon: <FileIcon className={"w-5 h-5 text-zinc-600"} />,
      },
      {
        name: "Address",
        key: "addresses",
        icon: <LocationIcon className={"w-5 h-5 text-zinc-600"} />,
      },
      {
        name: "Buyurtmalar",
        key: "orders",
        icon: <DeliveryIcon className={"w-5 h-5 text-zinc-600"} />,
      },
      {
        name: "Sevimli",
        key: "favorites",
        icon: <FavoriteIcon className={"w-5 h-5 text-zinc-600"} />,
      },
      {
        name: "Market",
        key: "shop",
        icon: <MarketIcon className={"w-5 h-5 text-zinc-600"} />,
      },
    ],
  },
  {
    title: "Ma’lumot",
    items: [
      { name: "Biz haqimizda", path: "/about" },
      { name: "Bog‘lanish", path: "/contact" },
    ],
  },
];

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
    ? NAV_ITEMS.find((n) => n.key === sheetNav)?.label ?? ""
    : "";

  return (
    <>
      <div>
        {/* <div className="container"> */}
        <div>
          <div className="">
            <div className="flex flex-col gap-3">
              <div className="rounded-b-2xl bg-white px-[16px] pb-[16px] text-center text-xl font-semibold text-black pt-[16px]">
                <a
                  className="flex cursor-pointer items-center justify-between"
                  href="/profile/my-data?shop_id=3dcb97ff-700e-4d57-baf1-b036a9f6b48f"
                >
                  <div className="flex items-center gap-[12px]">
                    <div
                      style={{ position: "relative", width: 48, height: 48 }}
                    >
                      <img
                        alt="user"
                        loading="lazy"
                        width={48}
                        height={48}
                        decoding="async"
                        data-nimg="1"
                        // src="https://jmmobile.uz/_next/image?url=%2Fplaceholder-user.webp&amp;w=96&amp;q=75"
                        style={{
                          color: "transparent",
                          visibility: "visible",
                          objectFit: "cover",
                          width: 48,
                          height: 48,
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                    <div className="flex flex-col">
                      <h1 className=" text-start">Muhammad</h1>
                      <h2 className=" text-start">+998770618482</h2>
                    </div>
                  </div>
                  <button
                    type="button"
                    data-slot="button"
                    className="inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap radius-md text-md font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none shrink-0 outline-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive rounded-full !p-0 h-[36px] px-4 py-2"
                  >
                    <EditIcon />
                  </button>
                </a>
              </div>

              <div className="w-full flex flex-col gap-4">
                {sections.map((section, i) => (
                  <div className="bg-white rounded-2xl overflow-hidden w-full px-4 py-2">
                    {section.items.map((item, j, key) => {
                      const isActive = location.pathname === item.path;

                      return (
                        <button
                          key={key}
                          onClick={() => handleNav(key)}
                          className="w-full flex items-center gap-4  last:border-b-0"
                        >
                          <div className="p-1.5 my-2 bg-slate-100 rounded-xl">
                            {item.icon}
                          </div>
                          <div className="item flex w-full items-center justify-between py-1 border-b border-zinc-200">
                            <h6 className="text-base">{item.name}</h6>
                            <div className="flex items-center gap-1">
                              <div className="flex items-center gap-1">
                                <div className="flex items-center gap-1">
                                  <RightIcon
                                    className={"w-5 h-5 text-zinc-500"}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
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
        {/* </div> */}
      </div>
    </>
  );
}
