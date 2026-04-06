import ProductModal from "../../shared/ui/ProductBottomSheet";
import {
  Brands,
  Categories,
  FavoriteProducts,
  HeroBanner,
  RecomendedProducts,
} from "./sections";

function Home() {
  // const { selectedProduct, openModal, closeModal } = /();
  // const { isModalOpen, openModal, closeModal } = useUIStore();

  return (
    <div>
      <HeroBanner />
      <Categories />
      <FavoriteProducts />
      <Brands />
      <RecomendedProducts />
      {/* <ProductModal   closeModal/> */}
    </div>
  );
}

export default Home;
