import React from "react";
import { Link } from "react-router-dom";
import { CartIcon } from "../../assets/icons";

function EmptyCart() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center gap-2">
      <div className="w-20 h-20 mb-4 rounded-2xl bg-white flex items-center justify-center">
        <CartIcon className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold">Voy! Bu yerda hozircha hech narsa yoʻq</h3>
      <p className="text-gray-500 text-sm">
      Yoqqan mahsulotlaringizni savatga qoʻshing — ular <br /> bu yerda paydo boʻladi. Xaridlaringiz maroqli boʻlsin!
      </p>
      <Link
        href="/categories"
        className="text-sm text-white px-6 py-3 font-semibold rounded-xl bg-primary"
      >
        Xaridni boshlash
      </Link>
    </div>
  );
}

export default EmptyCart;
