import { useParams } from "react-router-dom";
import {
  useProduct,
  useProducts,
} from "../../features/product/hooks/useProducts";
import { useShuffledProducts } from "../../features/product/hooks/useShuffledProducts";
import ProductGallery from "../../features/product/ui/ProductGallery";
import ProductDetails from "../../features/product/ui/ProductDetails";
import ProductActions from "../../features/product/ui/ProductActions";
import RecommendedProducts from "../../features/product/ui/RecommendedProducts";
import { useMemo } from "react";

function ProductSkeleton() {
  return (
    <section>
      <div className="container">
        <div className="mt-20">
          <div className="w-full flex flex-col lg:flex-row gap-5">
            {/* Images */}
            <div className="w-full lg:w-1/2 flex flex-col gap-3">
              <div className="w-full aspect-4/3 rounded-2xl bg-gray-200 animate-pulse" />
              <div className="flex gap-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-20 h-20 rounded-xl bg-gray-200 animate-pulse"
                  />
                ))}
              </div>
            </div>
            {/* Info */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <div className="h-8 w-3/4 bg-gray-200 rounded-xl animate-pulse" />
              <div className="h-4 w-1/2 bg-gray-100 rounded-xl animate-pulse" />
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-5 w-full bg-gray-100 rounded-xl animate-pulse"
                />
              ))}
              <div className="h-12 w-full bg-gray-200 rounded-xl animate-pulse mt-4" />
            </div>
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
      mainImage:
        `https://api.bunyodoptom.uz${p.images[0]?.url}` &&
        `https://api.bunyodoptom.uz${p.images[1]?.url}`,
    }));
}

function ProductPage() {
  const params = useParams();

  const id = Number(params.id);
  const { data: product, isLoading, isError } = useProduct(id);
  console.log(product);

  const { data: products } = useProducts();
  const filtred = useMemo(() => normalizeProducts(products), [products]);

  const recomendedProduct = useShuffledProducts(filtred, 20);

  if (isLoading) return <ProductSkeleton />;
  if (isError || !product) {
    return (
      <div className="container mt-24 text-center text-gray-400 text-xl">
        Mahsulot topilmadi
      </div>
    );
  }

  const images = product.images?.length
    ? product.images.map((img) =>
        img.url ? `https://api.bunyodoptom.uz${img.url}` : "/product.jpg",
      )
    : ["/product.jpg"];

  return (
    <>
      <section>
        <div className="container">
          <div className="mt-20 flex flex-col lg:flex-row gap-5">
            <ProductGallery images={images} name={product.name} />

            <div className="lg:w-1/2 flex flex-col gap-4">
              <h1 className="text-3xl">{product.name}</h1>

              <ProductDetails product={product} />

              <ProductActions product={product} />
            </div>
          </div>
        </div>
      </section>
      <RecommendedProducts products={recomendedProduct} />
    </>
  );
}

export default ProductPage;
