import axios from "axios";

// ✅ Force correct base URL for production
const api = axios.create({
    baseURL: "https://api.docno.esigmatech.com/api",
    headers: {
        "Content-Type": "application/json"
    }
});

// ✅ Attach JWT automatically
api.interceptors.request.use(
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
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn("Unauthorized - clearing session");
            localStorage.removeItem("token");
        }
        return Promise.reject(error);
    }
);

export default api;