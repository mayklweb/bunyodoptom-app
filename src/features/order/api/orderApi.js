import { api } from "@/shared/api/client";

export const fetchOrdersApi = () => api.get("/orders");
export const fetchOrderByIdApi = (id) => api.get(`/orders/${id}`);
export const createOrderApi = (data) => api.post("/orders/checkout", data);
export const cancelOrderApi = (id) => api.post(`/orders/${id}/cancel`);
export const updateOrderStatusApi = (id, data) => api.put(`/orders/${id}/status`, data);