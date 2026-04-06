import { Link } from "react-router-dom";
import { CheckIcon, DeleteIcon, MinusIcon, PlusIcon } from "../../assets/icons";

function CartItemCard({ item, isSelected, onToggle, onChangeQty, onRemove }) {
  return (
    <div
      className={`rounded-xl p-2 flex flex-col gap-2 shadow-sm transition-all ${
        isSelected ? "bg-secondary/10" : "bg-[#E5E6FF]"
      }`}
    >
      <div className="w-full flex gap-2">
        <div className="w-25 h-18.5 rounded-xl bg-gray-100 overflow-hidden shrink-0">
          {/* <img
            src={`https://api.bunyodoptom.uz${item.images[0].url}`}
            alt={item.name}
            width={300}
            height={225}
          /> */}
        </div>
        <div className="flex-1 min-w-0 flex flex-col">
          <Link
            href={`/product/${item.id}`}
            className="text-sm sm:text-lg font-semibold text-zinc-800 truncate"
          >
            {item.name}
          </Link>
          <p className="text-sm sm:text-base font-medium text-zinc-900">
            {(item.price * item.count).toLocaleString()} so'm
          </p>
        </div>
        <div
          className="cursor-pointer shrink-0"
          onClick={() => onToggle(item.id)}
        >
          <div
            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
              isSelected
                ? "bg-primary border-primary"
                : "border-gray-300 bg-white"
            }`}
          >
            {isSelected && <CheckIcon className="w-3 h-3 text-white" />}
          </div>
        </div>
      </div>

      <div className="border border-solid border-accent" />

      <div className="flex gap-4 items-center justify-end">
        <div className="flex items-center gap-3 bg-zinc-100 rounded-xl px-1 py-1">
          <button
            onClick={() => onChangeQty(item.id, -1)}
            className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-primary transition-colors cursor-pointer"
          >
            <MinusIcon className="w-5 h-5" />
          </button>
          <span className="text-sm font-semibold w-5 text-center">
            {item.count}
          </span>
          <button
            onClick={() => onChangeQty(item.id, 1)}
            className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-primary transition-colors cursor-pointer"
          >
            <PlusIcon className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={() => onRemove(item.id)}
          className="flex items-center text-sm font-medium gap-2 px-2 py-2 bg-red/10 text-red rounded-lg cursor-pointer"
        >
          <DeleteIcon className="w-5 h-5" />
          <span>Yoq qilish</span>
        </button>
      </div>
    </div>
  );
}

export default CartItemCard;
