export const setLocale = (key, value) => localStorage.setItem(key, value);
export const getLocale = (key) => localStorage.getItem(key);
export const removeLocale = (key) => localStorage.removeItem(key);