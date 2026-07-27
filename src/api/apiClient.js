import axios from 'axios';
import toast from 'react-hot-toast';

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

// Response interceptor to handle token refresh logic & global error toasts
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        if (window.location.pathname.startsWith('/admin')) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          toast.error('सत्राची मुदत संपली आहे. कृपया पुन्हा लॉगिन करा.');
          window.location.href = '/admin-login';
        }
      } else if (error.response.status === 403) {
        toast.error('तुम्हाला या कृतीसाठी परवानगी नाही.');
      } else if (error.response.status >= 500) {
        toast.error('सर्व्हरमध्ये त्रुटी आली. कृपया थोड्या वेळाने प्रयत्न करा.');
      }
    } else if (error.request) {
      toast.error('सर्व्हरशी संपर्क होऊ शकला नाही. नेटवर्क तपासा.');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
export { BASE_URL };

