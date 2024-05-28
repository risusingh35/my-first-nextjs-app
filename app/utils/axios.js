import axios from 'axios';

const operationAPI = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

const getAPI = axios.create({
  baseURL: 'http://localhost:4001',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token to headers
const requestInterceptor = (config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

operationAPI.interceptors.request.use(requestInterceptor, (error) => Promise.reject(error));
getAPI.interceptors.request.use(requestInterceptor, (error) => Promise.reject(error));

// Response interceptor to handle responses
const responseInterceptor = (response) => response;
const responseErrorInterceptor = (error) => {
  if (error.response && error.response.status === 401) {
    // Handle token expiration or unauthorized access
    localStorage.removeItem('token');
  }
  return Promise.reject(error);
};

operationAPI.interceptors.response.use(responseInterceptor, responseErrorInterceptor);
getAPI.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

export { operationAPI, getAPI };
