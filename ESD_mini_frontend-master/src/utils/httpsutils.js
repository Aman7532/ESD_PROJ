import axios from "axios";

const BASE_URL = "http://localhost:8080"; // Change this to match your backend URL

// Base API function
const apiRequest = async (endpoint, method = "GET", data = null, headers = {}) => {
    try {
        const config = {
            method,
            url: `${BASE_URL}${endpoint}`,
            data,
            headers,
        };

        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        throw error.response?.data || "API request failed.";
    }
};

// Login API function
const loginAdmin = async (email, password) => {
    const data = { email, password };
    return await apiRequest("/admin/login", "POST", data);
};

// Fetch all domains, specializations, and placements
const getDomains = async () => {
    return await apiRequest("/students/domains", "GET");
};

const getSpecializations = async () => {
    return await apiRequest("/students/specialization", "GET");
};

const getPlacements = async () => {
    return await apiRequest("/students/placement", "GET");
};

const HttpUtils = { loginAdmin, getDomains, getSpecializations, getPlacements };

export default HttpUtils;
