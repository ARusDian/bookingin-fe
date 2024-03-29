import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
});

api.defaults.headers.post["Content-Type"] = "application/json";

export default api;