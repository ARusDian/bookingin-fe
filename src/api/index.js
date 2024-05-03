import axios from "axios";

export const apiURL = import.meta.env.VITE_API_URL
const api = axios.create({
    baseURL: `${apiURL}api`,
    headers: {
        "Content-Type": "application/json"
    }
})

export default api;