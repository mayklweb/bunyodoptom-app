import {
  Addresses,
  Favorites,
  Market,
  Orders,
  PersonalInfo,
} from "@/features/profile/ui/sections";

const SECTION_MAP = {
  personal: <PersonalInfo />,
  shop: <Market />,
  orders: <Orders />,
  addresses: <Addresses />,
  favorites: <Favorites />,
};

export default function ProfileContent({ active }) {
  return <div className="w-5/7">{SECTION_MAP[active]}</div>;
}