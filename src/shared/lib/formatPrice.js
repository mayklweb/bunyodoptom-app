export const formatPrice = (price, currency = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(price);