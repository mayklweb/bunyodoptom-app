import { api } from "../../../shared/api/client";

export const fetchCategoriesApi = () => api.get("/categories");
export const createCategoryApi = (data) => api.post("/categories", data);
export const updateCategoryApi = (id, data) => api.put(`/categories/${id}`, data);
export const deleteCategoryApi = (id) => api.delete(`/categories/${id}`);