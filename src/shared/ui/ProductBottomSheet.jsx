import { useEffect, useState } from "react";
import { useCartStore } from "../../app/store/useCartStore";
import { CloseIcon, MinusIcon, PlusIcon } from "../../assets/icons";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";

function ProductBottomSheet({ product, open, onClose }) {
  const addToCart = useCartStore((s) => s.addToCart);
  const getQuantity = useCartStore((s) => s.getQuantity);

  const qty = getQuantity(product?.id);
  // 🔥 Body scroll lock + ESC close

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!product) return null;

  const imagePath = product?.images?.[0]?.url;
  const imageUrl = imagePath
    ? `https://api.bunyodoptom.uz${imagePath}`
    : "/placeholder.png";

  return (
    <AnimatePresence key={open}>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 bg-black/50"
        onClick={onClose}
      />

      {/* Sheet */}
      <motion.div
        key="sheet"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1], // smooth cubic bezier
        }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        // dragElastic={{ top: 0, bottom: 0.5 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[90vh] overflow-hidden md:max-w-2xl md:left-1/2 md:-translate-x-1/2"
      >
        {/* Header */}
        <div className="relative overflow-y-auto">
          <button
            className="absolute top-5 right-5 bg-white rounded-full p-1 shadow-md"
            onClick={onClose}
          >
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
            {qty === 0 ? (
              <button
                onClick={() =>
                  addToCart({
                    ...product,
                    qty: 1,
                    mainImage: `https://api.bunyodoptom.uz${product?.images[0].url}`,
                  })
                }
                className="w-full h-12 bg-primary text-white rounded-xl"
              >
                Savatga qo'shish
              </button>
            ) : (
              <div className="flex w-full justify-between bg-primary/10 rounded-xl p-2">
                <button
                  onClick={() =>
                    qty === 1 ? remove(product.id) : dec(product.id)
                  }
                >
                  <MinusIcon />
                </button>
                <span>{qty}</span>
                <button onClick={() => inc(product.id)}>
                  <PlusIcon />
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ProductBottomSheet;
