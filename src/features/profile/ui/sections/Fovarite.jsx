// import { ProductCard } from "@/app/components";
// import { products } from "@/app/profile/model/constants/constants";
// import { useFavoritesStore } from "@/app/store/favoritesStore";

import { useFavoritesStore } from "../../../../shared/lib/favorites";
import ProductCard from "../../../product/ui/ProductCard";

export function Favorites() {
  const { favorites, clearFavorites } = useFavoritesStore();
  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {favorites.map((product, i) => (
          <ProductCard key={i} product={product} />
        ))}
      </div>
    </div>
  );
}
