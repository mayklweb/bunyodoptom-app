import { api } from "../../../shared/api/client";

export const loginApi = (data) => api.post("/login", data);
export const registerApi = (data) => api.post("/register", data);

export const fetchProfileApi = async () => {
  const { data } = await api.get("/users/me");
  return data.data; // backend structurega qarab
};