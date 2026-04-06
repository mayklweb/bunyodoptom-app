import React from "react";
import { Link } from "react-router-dom";
import { CartIcon } from "../../assets/icons";

function EmptyCart() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center gap-3">
      <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center">
        <CartIcon className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-2xl font-semibold">Savat bo'sh</h3>
      <p className="text-gray-500 text-base">
        Hozircha savatda mahsulot yo'q.
        <br /> Xarid qilishni boshlang!
      </p>
      <Link
        href="/categories"
        className="text-white px-6 py-3 font-semibold rounded-xl bg-primary"
      >
        Xaridni boshlash
      </Link>
    </div>
  );
}

export default EmptyCart;
