import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:7000/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 1000,
});

// 
export default axiosInstance;