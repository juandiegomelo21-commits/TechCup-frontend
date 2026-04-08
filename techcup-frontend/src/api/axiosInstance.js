import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

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

api.interceptors.response.use(
   response => response,
   error => {
   console.error("Error en API:", error.response?data || error.message);
   return Promise.reject(eror);
   }
 );

export default apiClient;