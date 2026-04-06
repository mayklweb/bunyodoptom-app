import { useEffect } from "react";
import { useCartStore } from "../../app/store/useCartStore";
import { CloseIcon } from "../../assets/icons";

function ProductBottomSheet({ product, open, onClose }) {
  const addToCart = useCartStore((s) => s.addToCart);
  const getQuantity = useCartStore((s) => s.getQuantity);

  const qty = getQuantity(product);
  // 🔥 Body scroll lock + ESC close
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  if (!product) return null;

  const imagePath = product?.images?.[0]?.url;
  const imageUrl = imagePath
    ? `https://api.bunyodoptom.uz${imagePath}`
    : "/placeholder.png";

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.4)",
          zIndex: 40,
          opacity: open ? 1 : 0,
          transition: "0.3s",
          pointerEvents: open ? "auto" : "none",
        }}
      />

      {/* Sheet */}
      <div
        onClick={(e) => e.stopPropagation()} // 🔥 prevent close
        style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          zIndex: 50,
          width: "100%",
          background: "#fff",
          borderRadius: "16px 16px 0px 0px",
          transform: open ? "translateY(0)" : "translateY(100%)",
          transition: "0.3s",
          height: "90svh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* <div className="container"> */}
        {/* Header */}
        <div className="relative overflow-y-auto">
          <button className="absolute top-5 right-5 bg-white rounded-full p-1 shadow-md" onClick={onClose}>
            <CloseIcon className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="overflow-hidden flex-1">
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full object-contain bg-gray-100"
            />

            <div className="p-4">
              <h2 className="text-xl font-bold mb-3">{product.name}</h2>

              {/* Price */}
              <div className="mb-4">
                <span className="text-2xl font-bold">
                  {Number(product.price).toLocaleString()}
                </span>{" "}
                so'm
              </div>

              {/* Stock */}
              {product.stock_qty > 0 ? (
                <div className="text-green-600 text-sm mb-3">
                  {product.stock_qty} ta mavjud
                </div>
              ) : (
                <div className="text-red-500 text-sm mb-3">Tugagan</div>
              )}

              {/* Extra prices */}
              {(product.kg_price || product.piece_price) && (
                <div className="bg-gray-100 p-3 rounded mb-4 text-sm">
                  {product.kg_price && (
                    <div className="flex justify-between">
                      <span>Kg narxi:</span>
                      <span>{product.kg_price.toLocaleString()} so'm</span>
                    </div>
                  )}

                  {product.piece_price && (
                    <div className="flex justify-between">
                      <span>Dona narxi:</span>
                      <span>{product.piece_price.toLocaleString()} so'm</span>
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              {product.description && (
                <p className="text-gray-500 text-sm">{product.description}</p>
              )}
            </div>
          </div>

          {/* 🔥 Bottom Action */}
          <div
            style={{
              padding: "12px 16px",
              borderTop: "1px solid #eee",
              background: "#fff",
            }}
          >
            {product.stock_qty > 0 ? (
              <button
                onClick={() =>
                  addToCart({
                    id: product.id,
                    price: product.price,
                    stock_qty: product.stock_qty,
                  })
                }
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "12px",
                  background: "#2e3192",
                  color: "#fff",
                  fontWeight: 600,
                }}
              >
                {qty > 0 ? `${qty} ta savatda` : "Savatga qo‘shish"}
              </button>
            ) : (
              <button
                disabled
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "12px",
                  background: "#ccc",
                  color: "#666",
                }}
              >
                Tugagan
              </button>
            )}
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
}

export default ProductBottomSheet;
