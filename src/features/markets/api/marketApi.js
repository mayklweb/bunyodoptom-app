import { api } from "../../../shared/api/client";

export const fetchMarketsApi = async () => {
  const { data } = await api.get("/markets");
  return data.data;
};

export const createMarketApi = async (payload) => {
  const { data } = await api.post("/markets", payload);
  return data.data;
};

export const updateMarketApi = async (id, payload) => {
  const { data } = await api.put(`/markets/${id}`, payload);
  return data.data;
};

export const deleteMarketApi = async (id) => {
  const { data } = await api.delete(`/markets/${id}`);
  return data.data;
};