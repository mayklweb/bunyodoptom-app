// entities/product/helpers.js

/**
 * Format price to currency string
 * @param {number} price
 * @param {string} currency
 */
export const formatPrice = (price, currency = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(price);
};

/**
 * Filter products by category
 * @param {Product[]} products
 * @param {string} category
 */
export const filterByCategory = (products, category) => {
  if (!category) return products;
  return products.filter((p) => p.categories.includes(category));
};