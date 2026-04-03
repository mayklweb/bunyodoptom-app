import { api } from "../../../shared/api/client";


export const fetchBrandsApi = () => api.get("/brands");
export const createBrandApi = (data) => api.post("/brands", data);
export const updateBrandApi = (id, data) => api.put(`/brands/${id}`, data);
export const deleteBrandApi = (id) => api.delete(`/brands/${id}`);