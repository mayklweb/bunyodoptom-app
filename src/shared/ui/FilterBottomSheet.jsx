import { useEffect } from "react";
import { FilterPanel } from "./FilterPanel";
import { CloseIcon } from "../../assets/icons";
//  import { FilterPanel } from "../shared/ui/FilterPanel";

function FilterBottomSheet({
  open,
  onClose,
  pendingFilters,
  setPendingFilters,
  onApply,
  onReset,
  brands,
  categories,
  defaultCategoryId,
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      <div className="fixed w-full flex-1 bottom-0 left-0 z-50 bg-white rounded-t-3xl max-h-[85vh] flex flex-col animate-slide-up">
        {/* Handle */}

        {/* Title */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray shrink-0">
          <h2 className="text-lg font-medium text-zinc-800">Filtr</h2>
          <button
            className="text-zinc-700 p-1 bg-gray rounded-lg"
            onClick={onClose}
          >
            <CloseIcon className={"w-5.5 h-5.5"} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <FilterPanel
            filters={pendingFilters}
            onChange={setPendingFilters}
            brands={brands}
            categories={categories}
            defaultCategoryId={defaultCategoryId}
          />
        </div>

        {/* Actions */}
        <div className="shrink-0 px-5 py-4 border-t border-gray flex gap-3">
          <button
            onClick={() => {
              onReset();
              onClose();
            }}
            className="flex-1 py-3 rounded-2xl border border-zinc-200 text-sm font-semibold text-zinc-600"
          >
            Tozalash
          </button>
          <button
            onClick={() => {
              onApply();
              onClose();
            }}
            className="flex-1 py-3 rounded-2xl bg-primary text-white text-sm font-semibold"
          >
            Qo'llash
          </button>
        </div>
      </div>
    </>
  );
}

export default FilterBottomSheet;
