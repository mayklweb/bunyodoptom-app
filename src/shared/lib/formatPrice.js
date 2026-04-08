export const formatPrice = (price, currency = "UZS") =>
  new Intl.NumberFormat("uz-UZ", { style: "currency", currency }).format(price);