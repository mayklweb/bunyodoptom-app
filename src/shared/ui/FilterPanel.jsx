import { useState } from "react";

const SORT_OPTIONS = [
  { value: "newest", label: "Yangi" },
  { value: "price_asc", label: "Arzon" },
  { value: "price_desc", label: "Qimmat" },
];

const BRANDS_VISIBLE_DEFAULT = 5;

export function FilterPanel({ filters, onChange, brands, categories }) {
  const [showAllBrands, setShowAllBrands] = useState(false);

  const set = (partial) => onChange({ ...filters, ...partial });

  const toggleBrand = (id) =>
    set({
      brandIds: filters.brandIds.includes(id)
        ? filters.brandIds.filter((b) => b !== id)
        : [...filters.brandIds, id],
    });

  const toggleCategory = (id) => {
    // default category cannot be deselected
    // if (id === defaultCategoryId) return;
    set({
      categoryIds: filters.categoryIds.includes(id)
        ? filters.categoryIds.filter((c) => c !== id)
        : [...filters.categoryIds, id],
    });
  };

  const visibleBrands = showAllBrands
    ? brands
    : brands?.slice(0, BRANDS_VISIBLE_DEFAULT);

  return (
    <div className="flex flex-col gap-5">
      {/* Sort */}
      <Section title="Saralash">
        <div className="flex gap-2 flex-wrap">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => set({ sortBy: opt.value })}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                filters.sortBy === opt.value
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-zinc-700 border-zinc-300 hover:border-primary/40"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </Section>

      {/* Price range */}
      <Section title="Narx (so'm)">
        <div className="flex flex-col items-center gap-3">
          <input
            type="number"
            placeholder="dan"
            value={filters.priceMin}
            onChange={(e) => set({ priceMin: e.target.value })}
            className="w-full flex-1 px-3 py-2 rounded-xl border border-zinc-300 text-sm outline-none focus:border-primary transition-colors"
          />
          {/* <span className="text-zinc-400 text-sm">—</span> */}
          <input
            type="number"
            placeholder="gacha"
            value={filters.priceMax}
            onChange={(e) => set({ priceMax: e.target.value })}
            className="w-full flex-1 px-3 py-2 rounded-xl border border-zinc-300 text-sm outline-none focus:border-primary transition-colors"
          />
        </div>
      </Section>

      {/* Categories */}
      {categories && categories.length > 0 && (
        <Section title="Kategoriya">
          <div className="flex flex-col gap-1.5">
            {/* rest of categories */}
            {categories.map((cat) => (
              <label
                key={cat.id}
                className="flex items-center gap-3 cursor-pointer py-1"
              >
                <Checkbox
                  checked={filters.categoryIds.includes(cat.id)}
                  onChange={() => toggleCategory(cat.id)}
                />
                <span className="text-sm text-zinc-700">{cat.name}</span>
              </label>
            ))}
          </div>
        </Section>
      )}

      {/* Brands */}
      {brands && brands.length > 0 && (
        <Section title="Brend">
          <div className="flex flex-col gap-1.5">
            {visibleBrands?.map((brand) => (
              <label
                key={brand.id}
                className="flex items-center gap-3 cursor-pointer py-1"
              >
                <Checkbox
                  checked={filters.brandIds.includes(brand.id)}
                  onChange={() => toggleBrand(brand.id)}
                />
                <span className="text-sm text-gray-700">{brand.name}</span>
              </label>
            ))}
          </div>

          {brands.length > BRANDS_VISIBLE_DEFAULT && (
            <button
              onClick={() => setShowAllBrands((p) => !p)}
              className="mt-1 flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            >
              {showAllBrands ? (
                <>
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                  Kamroq
                </>
              ) : (
                <>
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  Yana {brands.length - BRANDS_VISIBLE_DEFAULT} ta
                </>
              )}
            </button>
          )}
        </Section>
      )}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
        {title}
      </p>
      {children}
    </div>
  );
}

function Checkbox({ checked, onChange, locked }) {
  return (
    <div
      onClick={locked ? undefined : onChange}
      className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
        locked
          ? "bg-primary/60 border-primary/60 cursor-not-allowed"
          : checked
            ? "bg-primary border-primary cursor-pointer"
            : "border-zinc-300 cursor-pointer"
      }`}
    >
      {checked && (
        <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
          <path
            d="M2 6l3 3 5-5"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}
