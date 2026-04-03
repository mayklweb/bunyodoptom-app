import { api } from "@/shared/api/client";

export const fetchMarketsApi = () => api.get("/markets");