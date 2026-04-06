// import { useAuthUser } from "../../features/auth/hooks/useAuthUser";
import { Link } from "react-router-dom";
import { CartIcon, HomeIcon, ProductsIcon, UserIcon } from "../../assets/icons";
import { useProfile } from "../../features/auth/hooks/useAuthUser";

function Footer() {
  const { data: user } = useProfile();

  return (
    <footer className="fixed z-[4] bottom-0 left-0 w-full border-t-[0.5px] border-solid border-[#999] bg-[#FAFAFA] px-2">
      <div className="container">
        <div className="flex items-center justify-between">
          <Link
            className="flex my-2 items-center justify-center flex-col gap-1 "
            to="/"
          >
            <span>
              <HomeIcon />
            </span>
            <span className="text-sm font-medium">Asosiy</span>
          </Link>
          <Link
            className="my-2 flex items-center justify-center flex-col gap-1 "
            to="/categories"
          >
            <span>
              <ProductsIcon />
            </span>
            <span className="text-sm font-medium">Katalog</span>
          </Link>
          <Link
            className="my-2 flex items-center justify-center flex-col gap-1 "
            to="/cart"
          >
            <span>
              <CartIcon />
            </span>
            <span className="text-sm font-medium">Savat</span>
          </Link>
          {/* <Link
            className="my-4 flex items-center justify-center flex-col gap-1 "
            to="/cart"
          >
            <span>
              <CartIcon />
            </span>
            <span className="text-sm font-medium">Savat</span>
          </Link> */}
          <Link
            className="my-2 flex items-center justify-center flex-col gap-1 "
            to={"/profile"}
          >
            <span>
              <UserIcon />
            </span>
            <span className="text-sm font-medium">
              {user ? user.name : "Kirish"}
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
