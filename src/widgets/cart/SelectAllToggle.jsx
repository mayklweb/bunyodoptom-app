import React from "react";
import { CheckIcon } from "../../assets/icons";

function SelectAllToggle({ isAllSelected, selectedCount, onToggle }) {
  return (
    <div
      className="flex items-center gap-3 cursor-pointer select-none bg-primary/10 p-4 rounded-xl"
      onClick={onToggle}
    >
      <div
        className={`w-5 h-5 rounded-md border-[1px] flex items-center justify-center transition-colors ${
          isAllSelected
            ? "bg-primary border-primary"
            : "border-gray bg-white"
        }`}
      >
        {isAllSelected && <CheckIcon className="w-3 h-3 text-white" />}
      </div>
      <span className="text-sm font-medium text-black">
        Tanlangan: {selectedCount} ta mahsulot
      </span>
    </div>
  );
}

export default SelectAllToggle;
