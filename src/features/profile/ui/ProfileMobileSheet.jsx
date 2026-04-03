import { BottomSheet } from "../components/BottomSheet";
import {
  Addresses,
  Favorites,
  Market,
  Orders,
  PersonalInfo,
} from "../sections";

const SECTION_MAP = {
  personal: <PersonalInfo />,
  shop: <Market />,
  orders: <Orders />,
  addresses: <Addresses />,
  favorites: <Favorites />,
};

export default function ProfileMobileSheet({
  open,
  onClose,
  title,
  section,
}) {
  return (
    <BottomSheet title={title} open={open} onClose={onClose}>
      {section && SECTION_MAP[section]}
    </BottomSheet>
  );
}