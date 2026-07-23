import axios from 'axios';

const apiClient = axios.create({
  baseURL: `\https://maayboli-backend.yuktiyantra.com/api`, // Backend base URL
  withCredentials: true, // Allow sending cookies
});

// Response interceptor to handle token refresh logic if needed
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Basic error handler
    if (error.response && error.response.status === 401) {
      if (error.config && error.config.method === 'get') {
        window.location.href = '/admin-login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
