import { api } from "../../../shared/api/client";

// export const fetchOrdersApi = () => api.get("/orders");
export const fetchOrdersApi = async () => {
  const { data } = await api.get("/orders");
  return data.data; // 🔥 shu yerda tozalaymiz
};
export const fetchOrderByIdApi = async (id) => {
  const { data } = await api.get(`/orders/${id}`);
  return data.data; // 🔥 shu yerda tozalaymiz
};

export const createOrderApi = (data) => api.post("/orders/checkout", data.data);
export const cancelOrderApi = (id) => api.post(`/orders/${id}/cancel`);
export const updateOrderStatusApi = (id, data) => api.put(`/orders/${id}/status`, data.data);