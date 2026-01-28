import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Helper to safely access localStorage
const getToken = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
    }
    return null;
};

// Add a request interceptor to attach the token
api.interceptors.request.use(
    (config) => {
        const token = getToken();
        console.log('[API Request]', config.url, 'Token:', token ? 'present' : 'missing');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log('[API Response Error]', error.config?.url, error.response?.status);
        return Promise.reject(error);
    }
);

export default api;
