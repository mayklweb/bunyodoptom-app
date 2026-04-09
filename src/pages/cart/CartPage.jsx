import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUIStore } from "../../app/store/useUIStore";
import CartItemCard from "../../widgets/cart/CartItemCard";
import SelectAllToggle from "../../widgets/cart/SelectAllToggle";
import EmptyCart from "../../widgets/cart/EmptyCart";
import CartHeader from "../../widgets/cart/CartHeader";
import { useCartStore } from "../../app/store/useCartStore";
import { useProfile } from "../../features/auth/hooks/useAuthUser";
import { useMarkets } from "../../features/markets/hooks/useMarkets";
import { useAddresses } from "../../features/addresses/hooks/useAddresses";
import MarketRegisterModal from "../../shared/ui/MarketRegisterModal";

function CartPage() {
  const {
    cart,
    changeQty,
    remove,
    toggleAll,
    toggleItem,
    allSelected,
    selectedItems,
    total,
    totalCount,
    selectedIds,
    clearCart,
  } = useCartStore();

  const { setActiveSection, activeSection } = useUIStore();
  const navigate = useNavigate();

  const { data: user } = useProfile();
  const { data: addresses } = useAddresses();
  const { data: market, isLoading } = useMarkets();

  console.log(totalCount);

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [showMarketModal, setShowMarketModal] = useState(false);

  // Auto-select default address
  useEffect(() => {
    if (addresses && !selectedAddressId) {
      const defaultAddr = addresses.find((a) => a.is_default);
      if (defaultAddr) setSelectedAddressId(defaultAddr.id);
    }
  }, [addresses, selectedAddressId]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showMarketModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showMarketModal]);

  function handleCheckout() {
    if (isLoading) return;

    const items = selectedItems();

    if (!user) {
      alert("Buyurtma berish uchun tizimga kiring");
      navigate("/login");
      return;
    }

    if (!items.length) {
      alert("Kamida bitta mahsulot tanlang");
      return;
    }

    if (!market || market.length === 0) {
      setShowMarketModal(true);
      return;
    }

    // All checks passed - go to checkout
    navigate("/checkout");
  }

  function handleMarketRegistered(marketId) {
    setShowMarketModal(false);
    // After successful registration, proceed to checkout
    navigate("/checkout");
  }

  const canCheckout = selectedItems().length > 0 && !isLoading;

  return (
    <>
      <div className="container">
        <div className="w-full h-full flex flex-col pt-20 pb-32">
          <CartHeader />

          {cart.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="flex flex-col lg:flex-row items-start gap-5">
              <div className="w-full lg:w-7/10 flex flex-col gap-5">
                <SelectAllToggle
                  isAllSelected={allSelected()}
                  selectedCount={selectedItems().length}
                  onToggle={toggleAll}
                />

                <div className="flex flex-col gap-3">
                  {cart.map((item) => (
                    <CartItemCard
                      key={item.id}
                      item={item}
                      isSelected={selectedIds.includes(item.id)}
                      onToggle={toggleItem}
                      onChangeQty={changeQty}
                      onRemove={remove}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="fixed left-0 bottom-16 w-full bg-white rounded-t-xl shadow-md border-t border-accent py-2 px-4 flex items-center justify-between gap-3">
            <div className="flex flex-col text-sm shrink-0">
              <p className="text-gray-500">Mahsulotlar {totalCount()} dona</p>
              <p className="font-semibold">{total().toLocaleString()} so'm</p>
            </div>

            <button
              onClick={handleCheckout}
              disabled={!canCheckout}
              className="py-2 px-5 rounded-lg bg-primary text-white text-sm font-medium disabled:opacity-40"
            >
              {isLoading ? "Yuklanmoqda..." : "Buyurtma berish"}
            </button>
          </div>
        </div>

        {/* ✅ FIXED MODAL */}
        {showMarketModal && (
          <MarketRegisterModal
            onSuccess={handleMarketRegistered}
            onClose={() => setShowMarketModal(false)}
          />
        )}
      </div>
    </>
  );
}

export default CartPage;
