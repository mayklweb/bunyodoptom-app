import ProductModal from "../../shared/ui/ProductBottomSheet";
import {
  Brands,
  Categories,
  FavoriteProducts,
  HeroBanner,
  RecomendedProducts,
} from "./sections";

function Home() {
  return (
    <div className="mt-32 lg:mt-24">
      <HeroBanner />
      <Categories />
      <FavoriteProducts />
      <Brands />
      <RecomendedProducts />
    </div>
  );
}

export default Home;
