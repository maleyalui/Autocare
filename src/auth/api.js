import axios from 'axios';

const API_URL = axios.create({
    baseURL: 'https://autocare-backend-0syb.onrender.com'
});

// to add token to requests
API_URL.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export default API_URL;