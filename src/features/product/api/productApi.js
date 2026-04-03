import { api } from "../../../shared/api/client";

export const fetchProductsApi = () => api.get("/products");
export const fetchProductByIdApi = (id) => api.get(`/products/${id}`);