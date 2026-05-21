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
import { useLogout, useProfile } from "../../features/auth/hooks/useAuthUser";

const NAV_ITEMS = [
  { key: "personal", label: "Shaxsiy ma'lumotlar", icon: <FileIcon /> },
  { key: "orders", label: "Buyurtmalar", icon: <DeliveryIcon /> },
  { key: "addresses", label: "Manzillar", icon: <LocationIcon /> },
  { key: "favorites", label: "Sevimlilar", icon: <FavoriteIcon /> },
  { key: "shop", label: "Do'kon", icon: <MarketIcon /> },
];

const sections = [
  {
    title: "Profil",
    items: [
      {
        id: 1,
        name: "Profil",
        key: "personal",
        icon: <FileIcon className={"w-5 h-5 text-zinc-600"} />,
      },
      {
        id: 2,
        name: "Manzillar",
        key: "addresses",
        icon: <LocationIcon className={"w-5 h-5 text-zinc-600"} />,
      },
      {
        id: 3,
        name: "Buyurtmalar",
        key: "orders",
        icon: <DeliveryIcon className={"w-5 h-5 text-zinc-600"} />,
      },
      {
        id: 4,
        name: "Sevimlilar",
        key: "favorites",
        icon: <FavoriteIcon className={"w-5 h-5 text-zinc-600"} />,
      },
      {
        id: 5,
        name: "Do'kon",
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
  const { data: user } = useProfile();

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
      <div className="mt-32 lg:mt-24">
        <div className="container">
          <div className="">
            <div className="flex flex-col gap-3">
              <div className="rounded-2xl bg-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div style={{ position: "relative", width: 48, height: 48 }}>
                    <img
                      alt="user"
                      loading="lazy"
                      width={48}
                      height={48}
                      decoding="async"
                      data-nimg="1"
                      src="/images/placeholder-user.svg"
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
                    <h1 className="text-lg font-medium capitalize">
                      {user?.name}
                    </h1>
                    <h2 className="text-base font-medium">{user?.phone}</h2>
                  </div>
                </div>
                <button
                  type="button"
                  data-slot="button"
                  onClick={() => handleNav("personal")}
                  className="bg-gray text-primary rounded-xl p-1.5"
                >
                  <EditIcon className={"w-6 h-6"} />
                </button>
              </div>

              <div className="w-full flex flex-col gap-4">
                {sections.map((section, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl overflow-hidden w-full px-4 py-2"
                  >
                    {section.items.map((item, j) => {
                      const isActive = location.pathname === item.path;
                      return (
                        <button
                          key={j}
                          onClick={() => handleNav(item.key)}
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
              {/* <button
                onClick={logout}
                className="text-base text-red mt-6 p-3 font-medium rounded-[14px] bg-red/10 border border-red/40"
              >
                Hisobdan chiqish
              </button> */}
              <button
                onClick={logout}
                className="text-red bg-red/10 p-2 rounded-xl font-medium"
              >
                Chiqish
              </button>
            </div>

            <section className="bg-white flex w-full flex-col gap-3 p-4 mt-4 rounded-xl">
              <h3 className="text-black60 text">Ijtimoiy tarmoqlar:</h3>
              <ul className="flex gap-[10px]">
                <li>
                  <a
                    href="https://www.instagram.com/bunyodoptom"
                    target="_blank"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12Z"
                        fill="#F00073"
                      ></path>
                      <path
                        d="M12 6.89999C13.65 6.89999 13.875 6.89999 14.55 6.89999C15.15 6.89999 15.45 7.04999 15.675 7.12499C15.975 7.27499 16.2 7.34999 16.425 7.57499C16.65 7.79999 16.8 8.02499 16.875 8.32499C16.95 8.54999 17.025 8.84999 17.1 9.44999C17.1 10.125 17.1 10.275 17.1 12C17.1 13.725 17.1 13.875 17.1 14.55C17.1 15.15 16.95 15.45 16.875 15.675C16.725 15.975 16.65 16.2 16.425 16.425C16.2 16.65 15.975 16.8 15.675 16.875C15.45 16.95 15.15 17.025 14.55 17.1C13.875 17.1 13.725 17.1 12 17.1C10.275 17.1 10.125 17.1 9.44999 17.1C8.84999 17.1 8.54999 16.95 8.32499 16.875C8.02499 16.725 7.79999 16.65 7.57499 16.425C7.34999 16.2 7.19999 15.975 7.12499 15.675C7.04999 15.45 6.97499 15.15 6.89999 14.55C6.89999 13.875 6.89999 13.725 6.89999 12C6.89999 10.275 6.89999 10.125 6.89999 9.44999C6.89999 8.84999 7.04999 8.54999 7.12499 8.32499C7.27499 8.02499 7.34999 7.79999 7.57499 7.57499C7.79999 7.34999 8.02499 7.19999 8.32499 7.12499C8.54999 7.04999 8.84999 6.97499 9.44999 6.89999C10.125 6.89999 10.35 6.89999 12 6.89999ZM12 5.77499C10.275 5.77499 10.125 5.77499 9.44999 5.77499C8.77499 5.77499 8.32499 5.92499 7.94999 6.07499C7.57499 6.22499 7.19999 6.44999 6.82499 6.82499C6.44999 7.19999 6.29999 7.49999 6.07499 7.94999C5.92499 8.32499 5.84999 8.77499 5.77499 9.44999C5.77499 10.125 5.77499 10.35 5.77499 12C5.77499 13.725 5.77499 13.875 5.77499 14.55C5.77499 15.225 5.92499 15.675 6.07499 16.05C6.22499 16.425 6.44999 16.8 6.82499 17.175C7.19999 17.55 7.49999 17.7 7.94999 17.925C8.32499 18.075 8.77499 18.15 9.44999 18.225C10.125 18.225 10.35 18.225 12 18.225C13.65 18.225 13.875 18.225 14.55 18.225C15.225 18.225 15.675 18.075 16.05 17.925C16.425 17.775 16.8 17.55 17.175 17.175C17.55 16.8 17.7 16.5 17.925 16.05C18.075 15.675 18.15 15.225 18.225 14.55C18.225 13.875 18.225 13.65 18.225 12C18.225 10.35 18.225 10.125 18.225 9.44999C18.225 8.77499 18.075 8.32499 17.925 7.94999C17.775 7.57499 17.55 7.19999 17.175 6.82499C16.8 6.44999 16.5 6.29999 16.05 6.07499C15.675 5.92499 15.225 5.84999 14.55 5.77499C13.875 5.77499 13.725 5.77499 12 5.77499Z"
                        fill="white"
                      ></path>
                      <path
                        d="M12 8.77499C10.2 8.77499 8.77499 10.2 8.77499 12C8.77499 13.8 10.2 15.225 12 15.225C13.8 15.225 15.225 13.8 15.225 12C15.225 10.2 13.8 8.77499 12 8.77499ZM12 14.1C10.875 14.1 9.89999 13.2 9.89999 12C9.89999 10.875 10.8 9.89999 12 9.89999C13.125 9.89999 14.1 10.8 14.1 12C14.1 13.125 13.125 14.1 12 14.1Z"
                        fill="white"
                      ></path>
                      <path
                        d="M15.3 9.44999C15.7142 9.44999 16.05 9.11421 16.05 8.69999C16.05 8.28578 15.7142 7.94999 15.3 7.94999C14.8858 7.94999 14.55 8.28578 14.55 8.69999C14.55 9.11421 14.8858 9.44999 15.3 9.44999Z"
                        fill="white"
                      ></path>
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="https://t.me/bunyodoptom" target="_blank">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12Z"
                        fill="#0088CC"
                      ></path>
                      <path
                        d="M6.07494 11.7812C9.29616 10.3778 11.4441 9.45256 12.5189 9.00553C15.5875 7.72919 16.2251 7.50747 16.6407 7.50007C16.7322 7.49854 16.9365 7.52119 17.0689 7.62862C17.1807 7.71932 17.2115 7.84186 17.2262 7.92786C17.2409 8.01386 17.2592 8.20977 17.2447 8.36285C17.0784 10.1101 16.3588 14.3501 15.9928 16.307C15.8379 17.1351 15.5329 17.4127 15.2376 17.4399C14.596 17.4989 14.1087 17.0158 13.4872 16.6084C12.5147 15.9709 11.9653 15.5741 11.0213 14.952C9.93032 14.2331 10.6375 13.8379 11.2593 13.1922C11.422 13.0232 14.2492 10.4516 14.3039 10.2183C14.3108 10.1891 14.3171 10.0804 14.2525 10.023C14.1879 9.96553 14.0926 9.98516 14.0238 10.0008C13.9262 10.0229 12.3726 11.0498 9.36292 13.0814C8.92193 13.3842 8.5225 13.5318 8.16462 13.524C7.77009 13.5155 7.01117 13.301 6.44699 13.1176C5.755 12.8926 5.20502 12.7737 5.25291 12.3917C5.27785 12.1927 5.55186 11.9892 6.07494 11.7812Z"
                        fill="white"
                      ></path>
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/@bunyodoptom"
                    target="_blank"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1490_9922)">
                        <path
                          d="M12 24C5.3736 24 0 18.6264 0 12C0 5.3736 5.3736 0 12 0C18.6264 0 24 5.3736 24 12C24 18.6264 18.6264 24 12 24Z"
                          fill="#FF0000"
                        ></path>
                        <path
                          d="M19.6361 8.13819C19.4537 7.44699 18.9137 6.90459 18.2273 6.71979C16.984 6.38379 12.0017 6.38379 12.0017 6.38379C12.0017 6.38379 7.01685 6.38379 5.77605 6.71979C5.08965 6.90459 4.54965 7.44699 4.36725 8.13819C4.03125 9.38859 4.03125 11.9998 4.03125 11.9998C4.03125 11.9998 4.03125 14.611 4.36485 15.8614C4.54725 16.5526 5.08725 17.095 5.77365 17.2798C7.01685 17.6158 11.9992 17.6158 11.9992 17.6158C11.9992 17.6158 16.9841 17.6158 18.2249 17.2798C18.9113 17.095 19.4512 16.5526 19.6336 15.8614C19.9672 14.611 19.9672 11.9998 19.9672 11.9998C19.9672 11.9998 19.9673 9.38859 19.6361 8.13819ZM10.3697 14.3686V9.63099L14.5336 11.9998L10.3697 14.3686Z"
                          fill="white"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_1490_9922">
                          <rect width="24" height="24" fill="white"></rect>
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                </li>
              </ul>
            </section>

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
    </>
  );
}
