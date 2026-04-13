import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../app/store/useCartStore";
import { useProfile } from "../../features/auth/hooks/useAuthUser";
import { useMarkets } from "../../features/markets/hooks/useMarkets";
import { useCheckout } from "../../features/order/hooks/useOrder";
import { useAddAddress } from "../../features/addresses/hooks/useAddresses";

export function CheckoutPage() {
  const navigate = useNavigate();
  const { data: user } = useProfile();
  const { data: addresses, isPending: loadingAddress } = useAddAddress();
  const { data: markets } = useMarkets();
  const { mutate: checkout, isPending } = useCheckout();
  const { cart, selectedIds, clearCart, total, totalCount, selectedItems } =
    useCartStore();

  const [selectedAddressId, setSelectedAddressId] = useState(6);
  const [selectedMarketId, setSelectedMarketId] = useState(10);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [orderType, setOrderType] = useState("pickup"); // delivery or pickup

  const selectedProducts = cart.filter((item) => selectedIds.includes(item.id));

  const products = selectedItems().map((item) => ({
    ...item,
    qty: item.count ?? 1,
  }));

  const canCheckout =
    selectedProducts.length > 0 && selectedMarketId && selectedAddressId;

  const onCheckout = () => {
    if (!canCheckout) return;

    // 👇 SHU YERGA QO‘YASAN
    const selectedAddress = addresses?.find((a) => a.id === selectedAddressId);

    const selectedMarket = markets?.find((m) => m.id === selectedMarketId);

    checkout(
      {
        user_id: parseInt(user.id),
        total_amount: total(),
        address_id: selectedAddressId, // 👈 asosiy
        market: selectedMarket,
        market_id: selectedMarketId, // 👈 asosiy
        payment_method: paymentMethod,
        payed: false,
        status: "preparing",
        products: products,
      },
      {
        onSuccess: () => {
          clearCart();
          navigate(`/profile`);
        },
      },
    );
  };

  console.log(total());

  return (
    <div className="">
      <div className="bg-white p-4 shadow-sm ">
        <h1 className="text-xl font-bold text-gray-900">
          Buyurtmani tasdiqlash
        </h1>
      </div>
      <div className="container">
        <div>
          {/* Header */}

          <div className="mt-5 flex flex-col gap-5">
            {/* 1. User Info */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-zonc-900 mb-3">
                Foydalanuvchi
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xl">👤</span>
                </div>
                <div>
                  <p className="font-medium text-zinc-900">
                    {user?.name || "Ism kiritilmagan"}
                  </p>
                  <p className="text-sm text-zinc-500">+998 {user?.phone}</p>
                </div>
              </div>
            </div>
            {/* 2. Address */}
            {orderType === "delivery" && (
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-zinc-900 mb-3">
                  Yetkazib berish manzili
                </h3>
                {addresses?.length === 0 ? (
                  <button
                    onClick={() => navigate("/addresses/new")}
                    className="w-full py-3 border border-dashed border-zinc-300 rounded-lg text-sm text-zinc-500 hover:border-primary hover:text-primary transition-colors"
                  >
                    + Manzil qo'shish
                  </button>
                ) : (
                  <div className="space-y-2">
                    {addresses?.map((addr) => (
                      <label
                        key={addr.id}
                        className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedAddressId === addr.id
                            ? "border-primary bg-primary/5"
                            : "border-zinc-200 hover:border-zinc-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="address"
                          checked={selectedAddressId === addr.id}
                          onChange={() => setSelectedAddressId(addr.id)}
                          className="mt-1"
                        />
                        <div className="flex-1 text-sm">
                          <p className="font-medium text-zinc-900">
                            {addr.region}, {addr.district}
                          </p>
                          <p className="text-zinc-600">{addr.address}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-zinc-900 mb-3">
                Do'kon tanlang
              </h3>
              {markets?.length === 0 ? (
                <p className="text-sm text-zinc-500">Do'konlar topilmadi</p>
              ) : (
                <div className="space-y-2">
                  {markets?.map((market) => (
                    <label
                      key={market.id}
                      className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedMarketId === market.id
                          ? "border-primary bg-primary/5"
                          : "border-zinc-200 hover:border-zinc-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="market"
                        checked={selectedMarketId === market.id}
                        onChange={() => setSelectedMarketId(market.id)}
                        className="mt-1"
                      />
                      <div className="flex-1 text-sm">
                        <p className="font-medium text-zinc-900">
                          {market.name}
                        </p>
                        <p className="text-zinc-600">
                          {market.region}, {market.district}
                        </p>
                        <p className="text-zinc-500 text-xs">
                          {market.address}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* 4. Products */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-zinc-900 mb-3">
                Mahsulotlar ({totalCount()} dona)
              </h3>
              <div className="space-y-3">
                {selectedProducts.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={
                        item.mainImage ||
                        item.images?.[0]?.url ||
                        "/placeholder.png"
                      }
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover bg-zinc-100"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-zinc-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-zinc-500">{item.qty} dona</p>
                      <p className="text-sm font-semibold text-primary">
                        {(item.price * item.qty).toLocaleString()} so'm
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Payment Method */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-zinc-900 mb-3">
                To'lov usuli
              </h3>
              <div className="space-y-2">
                <label
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    paymentMethod === "cash"
                      ? "border-primary bg-primary/5"
                      : "border-zinc-200 hover:border-zinc-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="text-2xl">💵</span>
                  <span className="font-medium text-zinc-900">Naqd pul</span>
                </label>
                <label
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    paymentMethod === "click"
                      ? "border-primary bg-primary/5"
                      : "border-zinc-200 hover:border-zinc-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="click"
                    checked={paymentMethod === "click"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="text-2xl">💳</span>
                  <span className="font-medium text-zinc-900">Click</span>
                </label>
              </div>
            </div>
            {/* Total & Checkout Button */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-zinc-500">Jami summa</span>
                <span className="text-2xl font-bold text-zinc-900">
                  {total()} so'm
                </span>
              </div>

              <button
                onClick={onCheckout}
                disabled={!canCheckout || isPending}
                className="w-full py-4 rounded-xl bg-primary text-white font-semibold text-base hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isPending
                  ? "Yuborilmoqda..."
                  : `Tasdiqlash — ${total().toLocaleString()} so'm`}
              </button>

              {!canCheckout && selectedProducts.length > 0 && (
                <p className="text-xs text-center text-red-500 mt-2">
                  {orderType === "pickup"
                    ? "Buyurtma berish uchun manzil tanlang"
                    : "Buyurtma berish uchun do'kon tanlang"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
