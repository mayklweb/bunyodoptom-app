import { api } from "../../../shared/api/client";

export const fetchAddressesApi = async () => {
  const { data } = await api.get("/addresses");
  return data.data;
};

export const createAddressApi = async (payload) => {
  const { data } = await api.post("/addresses", payload);
  return data.data;
};

export const updateAddressApi = async (id, payload) => {
  const { data } = await api.put(`/addresses/${id}`, payload);
  return data.data;
};

export const deleteAddressApi = async (id) => {
  const { data } = await api.delete(`/addresses/${id}`);
  return data.data;
};