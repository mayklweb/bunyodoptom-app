import React from 'react'
import { useState } from "react";
import { useAddMarket } from '../../features/markets/hooks/useMarkets';
import { CloseIcon } from '../../assets/icons';

function MarketRegisterModal({onClose, onSuccess}) {
    const { mutate: createMarket, isPending } = useAddMarket();
  const [form, setForm] = useState({
    name: "",
    region: "",
    district: "",
    address: "",
  });

  const handleSubmit = () => {
    if (!form.name || !form.address) return;
    createMarket(form, {
      onSuccess: (market) => onSuccess(market.id),
    });
  };
  return (
<div
      className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:w-[480px] rounded-t-2xl sm:rounded-xl p-5 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <CloseIcon className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold mb-1">Magaziningizni ro'yxatdan o'tkazing</h2>
        <p className="text-sm text-gray-400 mb-5">
          Buyurtma berish uchun avval magazin ma'lumotlarini kiriting
        </p>

        <div className="flex flex-col gap-3">
          {[
            { key: "name", label: "Magazin nomi" },
            { key: "region", label: "Viloyat" },
            { key: "district", label: "Tuman" },
            { key: "address", label: "Manzil" },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                {label}
              </label>
              <input
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary transition"
                placeholder={label}
                value={form[key]}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, [key]: e.target.value }))
                }
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={isPending || !form.name || !form.address}
          className="mt-5 w-full py-3 bg-primary text-white font-semibold rounded-xl disabled:opacity-50 cursor-pointer"
        >
          {isPending ? "Saqlanmoqda..." : "Saqlash va davom etish"}
        </button>
      </div>
    </div>
  )
}

export default MarketRegisterModal