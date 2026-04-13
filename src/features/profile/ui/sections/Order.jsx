import { useState } from "react";
import {
  CartIcon,
  CloseIcon,
  DownIcon,
  EyeIcon,
  LocationIcon,
} from "../../../../assets/icons";
import { useCancelOrder, useOrders } from "../../../order/hooks/useOrder";
import { formatPrice } from "../../../../shared/lib/formatPrice";
// import { useOrders, useCancelOrder } from "@/app/shared/lib/hooks/useOrders";

// ── Status config keyed to real OrderStatus values ────────────────────────────
const STATUS = {
  "Yo'lda": {
    label: "Yo'lda",
    className: "bg-blue-50 text-blue-600",
    dot: "bg-blue-500",
  },
  Tayorlanmoqda: {
    label: "Tayorlanmoqda",
    className: "bg-yellow-50 text-yellow-600",
    dot: "bg-yellow-500",
  },
  Yetkazildi: {
    label: "Yetkazildi",
    className: "bg-green-50 text-green-600",
    dot: "bg-green-500",
  },
  "Bekor qilindi": {
    label: "Bekor qilindi",
    className: "bg-red-50 text-red-500",
    dot: "bg-red-400",
  },
  // ✅ English fallbacks
  pending: {
    label: "Yo'lda",
    className: "bg-blue-50 text-blue-600",
    dot: "bg-blue-500",
  },
  preparing: {
    label: "Tayorlanmoqda",
    className: "bg-yellow-50 text-yellow-600",
    dot: "bg-yellow-500",
  },
  delivered: {
    label: "Yetkazildi",
    className: "bg-green-50 text-green-600",
    dot: "bg-green-500",
  },
  cancelled: {
    label: "Bekor qilindi",
    className: "bg-red-50 text-red-500",
    dot: "bg-red-400",
  },
};

// ── Skeleton ──────────────────────────────────────────────────────────────────
function OrdersSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white border border-ZINC-100 rounded-xl shadow-sm overflow-hidden animate-pulse"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <div className="h-4 w-32 bg-gray-200 rounded-lg" />
            <div className="h-6 w-20 bg-gray-200 rounded-xl" />
          </div>
          <div className="px-4 py-3 flex flex-col gap-3">
            {[1, 2].map((j) => (
              <div key={j} className="flex items-center gap-3">
                <div className="flex-1 flex flex-col gap-1.5">
                  <div className="h-3.5 w-3/4 bg-gray-100 rounded-lg" />
                  <div className="h-3 w-1/4 bg-gray-100 rounded-lg" />
                </div>
                <div className="h-4 w-20 bg-gray-100 rounded-lg" />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-100">
            <div className="h-5 w-28 bg-gray-200 rounded-lg" />
            <div className="h-8 w-20 bg-gray-200 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function Orders() {
  const { data: orders, isLoading, isError, refetch } = useOrders();
  const { mutate: cancelOrder, isPending: isCancelling } = useCancelOrder();
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="w-full h-full">
      <div className="hidden lg:block lg:mb-5">
        <h1 className="text-2xl font-semibold">Buyurtmalar</h1>
      </div>

      {isLoading && <OrdersSkeleton />}

      {isError && (
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-center max-w-xs">
            <div className="w-20 h-20 rounded-2xl bg-red-50 flex items-center justify-center">
              <CloseIcon className="w-10 h-10 text-red-300" />
            </div>
            <h3 className="text-xl font-semibold">Xatolik yuz berdi</h3>
            <p className="text-gray-500 text-sm">
              Buyurtmalarni yuklab bo'lmadi. Qaytadan urinib ko'ring.
            </p>
            <button
              onClick={() => refetch()}
              className="mt-1 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Qayta yuklash
            </button>
          </div>
        </div>
      )}

      {!isLoading && !isError && orders?.length === 0 && (
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-center max-w-xs">
            <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center">
              <CartIcon className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold">Buyurtma mavjud emas</h3>
            <p className="text-gray-500 text-sm">
              Hozircha sizda hech qanday buyurtma mavjud emas
            </p>
          </div>
        </div>
      )}

      {!isLoading && !isError && orders && orders.length > 0 && (
        <div className="flex flex-col gap-3">
          {orders.map((order) => (
            <OrderCard
        
              key={order.id}
              order={order}
              onViewDetails={() => setSelectedOrder(order)}
              onCancel={(id) => cancelOrder(id)}
              isCancelling={isCancelling}
            />
          ))}
        </div>
      )}

      {/* ── Detail modal ── */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div>
                <p className="text-xs text-gray-400">Buyurtma raqami</p>
                <p className="text-base font-bold text-gray-900">
                  #{selectedOrder.id}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg ${
                    STATUS[selectedOrder.status].className
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      STATUS[selectedOrder.status].dot
                    }`}
                  />
                  {STATUS[selectedOrder.status].label}
                </span>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <CloseIcon className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Address */}
            {selectedOrder.address && (
              <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
                <LocationIcon className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="text-sm text-gray-500">
                  {selectedOrder.address.region},{" "}
                  {selectedOrder.address.district},{" "}
                  {selectedOrder.address.address}
                </span>
              </div>
            )}

            {/* Products */}
            <div className="px-5 py-4 flex flex-col gap-4 max-h-72 overflow-y-auto">
              {selectedOrder.products.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {item.name ?? "Mahsulot"}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {item.qty} dona × {item.price.toLocaleString()} so'm
                    </p>
                  </div>
                  <p className="text-sm font-bold text-gray-900 shrink-0">
                    {(item.price * item.qty).toLocaleString()} so'm
                  </p>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between">
              <p className="text-sm text-gray-500">Jami summa</p>
              <p className="text-lg font-bold text-gray-900">
                {total().toLocaleString()} so'm
              </p>
            </div>

            {/* Actions */}
            <div className="px-5 pb-5 flex gap-2">
              {selectedOrder.status !== "delivered" &&
                selectedOrder.status !== "cancelled" && (
                  <button
                    onClick={() => {
                      cancelOrder(selectedOrder.id);
                      setSelectedOrder(null);
                    }}
                    disabled={isCancelling}
                    className="flex-1 py-2.5 rounded-xl border border-red-200 text-red-500 text-sm font-medium hover:bg-red-50 transition-colors disabled:opacity-50"
                  >
                    Bekor qilish
                  </button>
                )}
              <button
                onClick={() => setSelectedOrder(null)}
                className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// // ── Order card ────────────────────────────────────────────────────────────────
// function OrderCard({ order, onViewDetails, onCancel, isCancelling }) {
//   const status = STATUS[order.status];
//   const previewProducts = order.products;
//   const remaining = order.products.length - 3;

//   console.log(previewProducts);

//   return (
//     <div className=" rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
//       {/* Header */}
//       <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-200">
//         <div className="flex items-center gap-2">
//           {/* <span className="text-sm font-semibold text-gray-700">
//             #{order.id}
//           </span> */}
//           {order.address && (
//             <>
//               {/* <span className="text-gray-300">·</span> */}
//               <span className="text-xs text-gray-400 truncate max-w-48">
//                 {order.address.district}, {order.address.address}
//               </span>
//             </>
//           )}
//         </div>
//         <span
//           className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-xl ${status.className}`}
//         >
//           <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
//           {status.label}
//         </span>
//       </div>

//       {/* Products */}
//       <div className="px-4 py-3 flex flex-col gap-3">
//         {previewProducts.map((item, i) => (
//           <div key={i} className="flex items-center gap-3">
//             <div className="flex-1 min-w-0">
//               <p className="text-sm font-medium text-gray-800 truncate">
//                 {item.name ?? "Mahsulot"}
//               </p>
//               <p className="text-xs text-gray-400 mt-0.5">{item.qty} dona</p>
//             </div>
//             <p className="text-sm font-semibold text-gray-800 shrink-0">
//               {(item.price * item.qty).toLocaleString()} so'm
//             </p>
//           </div>
//         ))}
//         {remaining > 0 && (
//           <p className="text-xs text-gray-400">+{remaining} ta mahsulot yana</p>
//         )}
//       </div>

//       {/* Footer */}
//       <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-zinc-100">
//         <div>
//           <p className="text-xs text-gray-400">Jami:</p>
//           <p className="">
//             {order.products.length} ta mahsulot,
//           </p>
//           <p className="text-sm font-bold text-gray-900">
//             {getTotal(order).toLocaleString()} so'm
//           </p>
//         </div>
//         <div className="flex items-center gap-2">
//           {order.status !== "delivered" && order.status !== "cancelled" && (
//             <button
//               onClick={() => onCancel(order.id)}
//               disabled={isCancelling}
//               className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-red text-red text-xs font-medium hover:bg-red-50 transition-colors disabled:opacity-50"
//             >
//               Bekor qilish
//             </button>
//           )}
//           <button
//             onClick={onViewDetails}
//             className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-primary text-white text-xs font-medium hover:opacity-90 transition-opacity"
//           >
//             <EyeIcon className="w-3.5 h-3.5" />
//             Batafsil
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { formatDate, formatPrice } from "@/utils/formatters";
// import { ChevronDown, Copy, Receipt } from "lucide-react";

export default function OrderCard({ order, total }) {
  const [isExpanded, setIsExpanded] = useState(false);

  console.log(order);

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(order.id);
  };

  const getStatusStyle = (status) => {
    const styles = {
      returned: "bg-gray-200 text-gray-900",
      delivered: "bg-green-100 text-green-900",
      pending: "bg-yellow-100 text-yellow-900",
      cancelled: "bg-red-100 text-red-900",
    };
    return styles[status] || styles.pending;
  };

  const getStatusText = (status) => {
    const texts = {
      returned: "Qaytarildi",
      delivered: "Yetkazildi",
      pending: "Kutilmoqda",
      cancelled: "Bekor qilindi",
    };
    return texts[status] || status;
  };

  return (
    <article className="bg-secondary/20 p-2 rounded-lg overflow-hidden">
      {/* Header */}
      <header className="p-2 border-b border-zinc-300">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold">Buyurtma №{order.id}</h3>

          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
              order.status,
            )}`}
          >
            {getStatusText(order.status)}
          </span>
        </div>

        <p className="text-sm text-gray-500">
          {/* {formatDate(order.createdAt)} */}
        </p>
      </header>

      {/* Products Summary */}
      <div className="p-2 border-b border-zinc-300">
        <p className="text-sm font-semibold mb-3">
          {/* {order.returnedAt && `${formatDate(order.returnedAt)} qaytarildi`} */}
        </p>

        {/* Product Images */}
        <div className="flex gap-2 mb-3">
          {order.products.slice(0, 4).map((item) => (
            <div key={item.id} className="relative">
              <div className="w-14 h-14 rounded-md bg-zinc-500"></div>
              {/* <img
                src={item?.images[0]?.url}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg"
              /> */}
              {item.status === "returned" && (
                <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-white font-medium">Bekor</span>
                </div>
              )}
            </div>
          ))}
          {order.products.length > 4 && (
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-sm text-gray-600">
                +{order.products.length - 4}
              </span>
            </div>
          )}
        </div>

        {/* Totals */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>{order.products.length} ta tovar</span>
          <span>·</span>
          <span className="font-semibold text-gray-900">{order.price}</span>
        </div>
      </div>

      {/* Delivery Info */}
      <div className="p-2 space-y-3">
        <div>
          <p className="text-xs font-semibold text-gray-900 mb-1">
            Buyurtmani qabul qiluvchi
          </p>
          <div className="text-sm text-gray-600">
            <p>{order.user.name}</p>
            <p>{order.user.phone}</p>
          </div>
        </div>

        {/* Total with Details */}
        <div className="pt-3 border-t border-zinc-300">
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              <span className="text-sm font-medium text-gray-900">Jami </span>
              <p className="text-sm font-medium text-zinc-700">
                {" "}
                {order.products.length} ta mahsulot
              </p>
            </div>
            <p className="flex items-center gap-1 text-sm text-primary font-medium">
              {total().toLocaleString()} so'm
              {/* <ChevronDown className="w-4 h-4" /> */}
            </p>
          </div>
        </div>
      </div>

      {/* Expandable Products List */}
      <footer className="border-t border-zinc-300">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full  p-2 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <span className="font-medium text-gray-900">
            {order.products.length} mahsulot
          </span>
          <DownIcon
            className={`w-5 h-5 transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </button>

        {isExpanded && (
          <div className="px-4 pb-4 space-y-3">
            {order.products.map((item) => (
              <OrderItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </footer>
    </article>
  );
}

// Separate component for individual items
function OrderItem({ item }) {
  console.log(item);

  return (
    <div className="flex gap-3">
      <img
        src={`https://api.bunyodoptom.uz${item.product.images[0].url}`}
        alt={item.product.name}
        className="w-20 h-28 object-cover rounded-lg"
      />

      <div className="flex-1 flex flex-col justify-between">
        <h4 className="text-sm text-gray-900 line-clamp-2">
          {item.product.name}
        </h4>

        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Soni</span>
            <span className="text-gray-900">{item.product.quantity}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Narxi</span>
            {/* <span className="text-gray-900">{formatPrice(item.price)}</span> */}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between items-end">
        <span className="text-xs text-gray-500">
          {item.status === "returned" ? "Qaytarildi" : "Yetkazildi"}
        </span>
      </div>
    </div>
  );
}
