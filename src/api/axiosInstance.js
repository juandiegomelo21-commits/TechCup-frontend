import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token){
     config.headers.Authorization = `Bearer ${token}`;
     }
     return config;
  });

apiClient.interceptors.response.use(
   response => response,
   error => {
   console.error("Error en API:", error.response?.data || error.message);
   return Promise.reject(error);
   }
 );

export default apiClient;