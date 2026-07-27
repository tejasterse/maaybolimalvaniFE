import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/api`
  : 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Request interceptor to attach JWT token from localStorage
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh logic if needed
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Basic error handler
    if (error.response && error.response.status === 401) {
      if (error.config && error.config.method === 'get' && window.location.pathname.startsWith('/admin')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/admin-login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
export { BASE_URL };

