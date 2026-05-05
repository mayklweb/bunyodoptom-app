import { Link, useLocation } from "react-router-dom";
import { CartIcon, HomeIcon, ProductsIcon, UserIcon } from "../../assets/icons";
import { useProfile } from "../../features/auth/hooks/useAuthUser";

function Footer() {
  const { data: user } = useProfile();
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { path: "/", icon: HomeIcon, label: "Asosiy" },
    { path: "/categories", icon: ProductsIcon, label: "Katalog" },
    { path: "/cart", icon: CartIcon, label: "Savat" },
    { path: "/profile", icon: UserIcon, label: user ? user.name : "Kirish" },
  ];

  return (
    <footer className="fixed z-[4] bottom-0 left-0 w-full border-t-[0.5px] border-solid border-[#999] bg-white px-2">
      <div className="container">
        <div className="flex items-center justify-between">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                className={`flex my-2 items-center justify-center flex-col gap-1 transition-colors ${
                  active ? "text-primary" : "text-zinc-600"
                }`}
                to={item.path}
              >
                <span className={active ? "" : ""}>
                  <Icon />
                </span>
                <span
                  className={`text-sm font-medium ${
                    active ? "font-semibold" : ""
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
