import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
    // baseURL: "http://localhost:4000", // Use your actual API URL here
});

// Add token to headers for all requests
api.interceptors.request.use(
    (config) => {
        const user = localStorage.getItem("user"); // Get user from storage
        if (user?.token) {
            config.headers.Authorization = `Bearer ${user.token}`; // Attach token
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
