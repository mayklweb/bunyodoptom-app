"use client";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useUIStore } from "../../app/store/useUIStore";
import CartItemCard from "../../widgets/cart/CartItemCard";
import SelectAllToggle from "../../widgets/cart/SelectAllToggle";
import EmptyCart from "../../widgets/cart/EmptyCart";
import CartHeader from "../../widgets/cart/CartHeader";
import { useCartStore } from "../../app/store/useCartStore";
import { useProfile } from "../../features/auth/hooks/useAuthUser";
import { useMarkets } from "../../features/markets/hooks/useMarkets";
import { useAddresses } from "../../features/addresses/hooks/useAddresses";
import { div } from "framer-motion/client";

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
  // const navigate = Navigate();

  console.log(cart);

  const { data: user } = useProfile();
  const { data: addresses } = useAddresses();
  // const { mutate: checkout, isPending } = useCheckout();
  const { hasMarket, myMarket, isLoading } = useMarkets();

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMarketModal, setShowMarketModal] = useState(false);
  const [pendingMarketId, setPendingMarketId] = useState(null);

  useEffect(() => {
    if (addresses && !selectedAddressId) {
      const defaultAddr = addresses.find((a) => a.is_default);
      if (defaultAddr) setSelectedAddressId(defaultAddr.id);
    }
  }, [addresses]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  function handleCheckout() {
    if (isLoading) return;

    if (!hasMarket && !pendingMarketId) {
      setShowMarketModal(true);
      return;
    }

    proceedToCheckout(pendingMarketId ?? myMarket?.id ?? null);
  }

  function handleMarketRegistered(marketId) {
    setPendingMarketId(marketId);
    setShowMarketModal(false);
    proceedToCheckout(marketId);
  }

  const proceedToCheckout = (marketId) => {
    if (!user) {
      alert(
        "Пожалуйста, войдите в систему, чтобы продолжить оформление заказа.",
      );
      return;
    }

    if (!marketId) {
      alert("Пожалуйста, выберите магазин.");
      return;
    }

    if (!selectedAddressId) {
      alert("Пожалуйста, выберите адрес доставки.");
      return;
    }

    const products = selectedItems().map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      qty: item.count ?? 1,
    }));

    const totalAmount = selectedItems().reduce(
      (sum, item) => sum + item.price * item.count,
      0,
    );

    checkout(
      {
        user_id: parseInt(user.id),
        total_amount: totalAmount,
        address_id: selectedAddressId,
        market_id: marketId,
        payment_method: paymentMethod,
        payed: false,
        status: "preparing",
        products: products,
      },
      {
        onSuccess: () => {
          setIsModalOpen(false);

          // ✅ Set active section to orders in the store
          setActiveSection("orders");

          // ✅ Optional: Clear cart after successful checkout
          clearCart();

          // ✅ Optional: Show success message

          // ✅ Redirect to account page
          router.push("/profile");
        },
        onError: (error) => {
          console.error("Checkout failed:", error);
          alert(
            "Buyurtma yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
          );
        },
      },
    );

    setIsModalOpen(false);
  };

  const canCheckout =
    selectedItems().length > 0 && !!selectedAddressId && !isPending;

  return (
    <>
      <div className="container">
        <div className="w-full h-full flex flex-col mt-20">
          <CartHeader />

          {cart.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="flex flex-col lg:flex-row items-start gap-5">
              {/* Cart items section */}
              <div className="w-full lg:w-7/10 flex flex-col gap-5">
                <SelectAllToggle
                  isAllSelected={allSelected()}
                  selectedCount={selectedItems().length}
                  onToggle={toggleAll}
                />

                <div className="flex flex-col gap-3">
                  {cart.map((item) => (
                    // <div className="border-[1px] border-top">
                      <CartItemCard
                        key={item.id}
                        item={item}
                        isSelected={selectedIds.includes(item.id)}
                        onToggle={toggleItem}
                        onChangeQty={changeQty}
                        onRemove={remove}
                      />
                    // </div>
                  ))}
                </div>
              </div>

              {/* Mobile bottom bar */}
              {/* <MobileBottomBar
              totalCount={totalCount()}
              total={total()}
              selectedCount={selectedItems().length}
              onCheckout={() => setIsModalOpen(true)}
            /> */}

              {/* Mobile checkout modal
            <CheckoutModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              user={user}
              addresses={addresses ?? []}
              selectedAddressId={selectedAddressId}
              onSelectAddress={setSelectedAddressId}
              paymentMethod={paymentMethod}
              onPaymentMethodChange={setPaymentMethod}
              totalCount={totalCount()}
              total={total()}
              canCheckout={canCheckout}
              isPending={isPending}
              onCheckout={handleCheckout}
            /> */}
            </div>
          )}
        </div>

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
