import { Brands, Categories, FavoriteProducts, HeroBanner, RecomendedProducts } from "./sections";

function Home() {
  return (
    <div>
      <HeroBanner />
      <Categories />
      <FavoriteProducts />
      <Brands />
      <RecomendedProducts />
    </div>
  );
}

export default Home;
