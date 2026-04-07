import { useFavoritesStore } from "../../../../app/store/useFavoritesStore";
import ProductCard from "../../../product/ui/ProductCard";

export function Favorites() {
  const { favorites } = useFavoritesStore();
        
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
