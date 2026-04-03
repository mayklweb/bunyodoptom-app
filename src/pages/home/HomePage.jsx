import { Brands, Categories, FavoriteProducts, HeroBanner } from "./sections";

function Home() {
  return (
    <div>
      <HeroBanner />
      <Categories />
      <Brands />
      <FavoriteProducts />
    </div>
  );
}

export default Home;
