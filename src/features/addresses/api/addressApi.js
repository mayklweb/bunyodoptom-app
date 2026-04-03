import { api } from "@/shared/api/client";

export const fetchAddressesApi = () => api.get("/addresses");
export const createAddressApi = (data) => api.post("/addresses", data);
export const updateAddressApi = (id, data) => api.put(`/addresses/${id}`, data);
export const deleteAddressApi = (id) => api.delete(`/addresses/${id}`);