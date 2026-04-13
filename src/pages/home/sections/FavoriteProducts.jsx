import { useMemo } from "react";
import { useUIStore } from "../../../app/store/useUIStore";
import { useProducts } from "../../../features/product/hooks/useProducts";
import { useShuffledProducts } from "../../../features/product/hooks/useShuffledProducts";
import ProductCard from "../../../features/product/ui/ProductCard";
import ProductBottomSheet from "../../../shared/ui/ProductBottomSheet";

function FavoriteProductsSkeleton() {
  return (
    <section>
      <div className="container">
        <div className="mt-5">
          {/* Title skeleton */}
          <div className="h-9 md:h-10 lg:h-11 w-40 bg-gray-200 rounded-xl animate-pulse" />

          <div className="mt-6 mb-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl bg-gray-100 overflow-hidden animate-pulse [animation-fill-mode:both]"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {/* Image */}
                <div className="w-full h-40 sm:h-44 md:h-48 bg-gray-300" />
                {/* Content */}
                <div className="p-3 flex flex-col gap-2">
                  {/* Product name */}
                  <div className="h-3.5 w-3/4 bg-gray-300 rounded-full" />
                  <div className="h-3 w-1/2 bg-gray-200 rounded-full" />
                  {/* Price */}
                  <div className="h-4 w-2/3 bg-gray-300 rounded-full mt-1" />
                  {/* Button */}
                  <div className="h-9 w-full bg-gray-200 rounded-xl mt-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function normalizeProducts(products) {
  return products
    ?.filter(
      (p) => Array.isArray(p.images) && p.images.length > 0 && p.images[0]?.url,
    )
    .map((p) => ({
      ...p,
      mainImage: `https://api.bunyodoptom.uz${p.images[0]?.url}`,
    }));
}

function FavoriteProducts() {
  const { data: products, isLoading, isError, isFetching } = useProducts();
  const { selectedProduct, openModal, closeModal, isOpen } = useUIStore();

  console.log({ isLoading, isFetching });

  const filtred = useMemo(() => normalizeProducts(products), [products]);
  
  const favoriteProducts = useShuffledProducts(filtred, 10);

  if (isLoading) return <FavoriteProductsSkeleton />;

  if (isError) return <div>Error</div>;



  return (
    <section>
      <div className="container">
        <div className="mt-5 lg:mt-10">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium">
              Sizga yoqadiganlar
            </h1>
          </div>

          <div className="mt-2.5 mb-5 grid grid-cols-2 md:grid-cols-2 gap-4">
            {favoriteProducts.map((product, i) => (
              <ProductCard
                key={i}
                product={product}
                onClick={() => openModal(product)}
              />
            ))}
          </div>
        </div>
      </div>
      <ProductBottomSheet
        product={selectedProduct}
        onClose={closeModal}
        open={isOpen}
      />
    </section>
  );
}

export default FavoriteProducts;
