import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
    headers: {
        "Content-Type": "application/json",
    },
});

// ✅ Attach JWT automatically
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// ✅ Optional: handle auth failures globally
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn("Unauthorized - clearing session");
            localStorage.removeItem("token");
        }
        return Promise.reject(error);
    }
);

export default API;