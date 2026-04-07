import { useNavigate } from "react-router-dom";
import { useCategories } from "../../features/categories/hooks/useCategories";
import { useProducts } from "../../features/product/hooks/useProducts";
import { useCategoryStore } from "../../app/store/useCategoryStore";

function normalizeProducts(products) {
  return products
    ?.filter(
      (p) => Array.isArray(p.images) && p.images.length > 0 && p.images[0]?.url,
    )
    .map((p) => ({
      ...p,
      mainImage:
        `https://api.bunyodoptom.uz${p.images[0]?.url}` &&
        `https://api.bunyodoptom.uz${p.images[1]?.url}`,
    }));
}

function CategoriesPage() {
  const router = useNavigate();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: allProducts, isLoading: productsLoading } = useProducts();
  const { selectedCategoryId, setSelectedCategoryId } = useCategoryStore();

  const products = normalizeProducts(allProducts);

  const handleMobileClick = (category) => {
    setSelectedCategoryId(category.id);
    router(`/categories/${category.id}`);
  };

  return (
    <>
      <div className="container">
        <div className="flex flex-col h-full mt-20">
          {categoriesLoading ? (
            <div className="grid grid-cols-2 gap-3 pb-24">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-gray-100 animate-pulse aspect-square"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 pb-24">
              {categories.reverse().map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleMobileClick(category)}
                  className="flex flex-col bg-white border border-zinc-100 rounded-xl overflow-hidden shadow-md active:scale-[0.97] transition-transform text-left"
                >
                  <div className=" relative overflow-hidden rounded-md">
                    <img
                      src={`/images/${category.id}.jpg`}
                      alt={category.name}
                      width={300}
                      height={225}
                      className="w-full h-full object-cover aspect-[4/3]"
                      unoptimized
                    />
                  </div>
                  <div className="px-2 py-2">
                    <p className="text-xs font-semibold text-gray-800 leading-snug line-clamp-2 text-center">
                      {category.name}
                    </p>
                  </div>
                </button>
              ))}

              {categories?.length === 0 && (
                <div className="col-span-2 text-center text-gray-400 text-sm py-12">
                  Kategoriyalar topilmadi
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CategoriesPage;
