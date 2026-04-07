import { useState, useMemo, useEffect } from "react";

export const INITIAL_FILTERS = {
  sortBy: "newest",
  brandIds: [],
  categoryIds: [],
  priceMin: "",
  priceMax: "",
  inStockOnly: false,
};


export function useProductFilters(
  allProducts,
  defaultCategoryId
) {
  const makeInitial = (catId) => ({
    ...INITIAL_FILTERS,
    categoryIds: catId ? [Number(catId)] : [],
  });

  const [filters, setFilters] = useState(() =>
    makeInitial(defaultCategoryId)
  );
  const [pendingFilters, setPendingFilters] = useState(() =>
    makeInitial(defaultCategoryId)
  );


  useEffect(() => {
    if (defaultCategoryId) {
      const catId = Number(defaultCategoryId);
      setFilters((prev) =>
        prev.categoryIds.length === 0
          ? { ...prev, categoryIds: [catId] }
          : prev
      );
      setPendingFilters((prev) =>
        prev.categoryIds.length === 0
          ? { ...prev, categoryIds: [catId] }
          : prev
      );
    }
  }, [defaultCategoryId]);

  const activeCount = [
    filters.brandIds.length > 0,
    defaultCategoryId
      ? !(
        filters.categoryIds.length === 1 &&
        filters.categoryIds[0] === Number(defaultCategoryId)
      )
      : filters.categoryIds.length > 0,
    filters.priceMin !== "",
    filters.priceMax !== "",
    filters.inStockOnly,
    filters.sortBy !== "newest",
  ].filter(Boolean).length;

  const filtered = useMemo(() => {
    if (!allProducts) return [];
    let result = [...allProducts];

    // FIX: coerce both sides to Number so "3" === 3 works
    if (filters.categoryIds.length > 0)
      result = result.filter((p) =>
        filters.categoryIds.map(Number).includes(Number(p.category_id))
      );

    if (filters.brandIds.length > 0)
      result = result.filter((p) =>
        filters.brandIds.map(Number).includes(Number(p.brand_id))
      );

    if (filters.priceMin !== "") {
      const min = Number(filters.priceMin);
      result = result.filter(
        (p) => (p.piece_price || p.kg_price || p.price) >= min
      );
    }

    if (filters.priceMax !== "") {
      const max = Number(filters.priceMax);
      result = result.filter(
        (p) => (p.piece_price || p.kg_price || p.price) <= max
      );
    }

    if (filters.inStockOnly)
      result = result.filter((p) => p.stock_qty > 0);

    if (filters.sortBy === "price_asc")
      result.sort(
        (a, b) =>
          (a.piece_price || a.kg_price || a.price) -
          (b.piece_price || b.kg_price || b.price)
      );
    else if (filters.sortBy === "price_desc")
      result.sort(
        (a, b) =>
          (b.piece_price || b.kg_price || b.price) -
          (a.piece_price || a.kg_price || a.price)
      );
    else
      result.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

    return result;
  }, [allProducts, filters]);

  const applyPending = () => setFilters(pendingFilters);

  const resetPending = () =>
    setPendingFilters(makeInitial(defaultCategoryId));

  const resetAll = () => {
    const reset = makeInitial(defaultCategoryId);
    setFilters(reset);
    setPendingFilters(reset);
  };

  return {
    filters,
    setFilters,
    pendingFilters,
    setPendingFilters,
    filtered,
    activeCount,
    applyPending,
    resetPending,
    resetAll,
  };
}