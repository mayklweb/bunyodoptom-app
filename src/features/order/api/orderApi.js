export const ordersApi = {
  fetchAll: async () => {
    const { data } = await api.get("/orders");
    return data.data;
  },
  
  fetchById: async (id) => {
    const { data } = await api.get(`/orders/${id}`);
    return data.data;
  },
  
  checkout: async (payload) => {
    const { data } = await api.post("/orders/checkout", payload);
    return data.data;
  },
  
  cancel: async (id) => {
    const { data } = await api.post(`/orders/${id}/cancel`);
    return data.data;
  },
  
  updateStatus: async (id, payload) => {
    const { data } = await api.put(`/orders/${id}/status`, payload);
    return data.data;
  },
};