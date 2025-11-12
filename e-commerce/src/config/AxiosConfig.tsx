import axios from 'axios';
import type { UserType, LoginFormType, ProductType } from '../types/Types';

const BASE_URL = 'http://localhost:3000';
const FAKESTORE_BASE_URL = 'https://fakestoreapi.com';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Token varsa header'a eklenebilir
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - token geçersiz
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// FakeStore API instance
export const fakeStoreInstance = axios.create({
  baseURL: FAKESTORE_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints
export const usersAPI = {
  register: (userData: UserType) => axiosInstance.post<UserType>('/users', userData),
  login: (credentials: LoginFormType) => axiosInstance.get<UserType[]>('/users', { params: credentials }),
  getAll: () => axiosInstance.get<UserType[]>('/users'),
  getById: (id: string) => axiosInstance.get<UserType>(`/users/${id}`),
  update: (id: string, userData: Partial<UserType>) => axiosInstance.put<UserType>(`/users/${id}`, userData),
  delete: (id: string) => axiosInstance.delete(`/users/${id}`),
};

// Products API
export const productsAPI = {
  getAll: () => fakeStoreInstance.get<ProductType[]>('/products'),
  getById: (id: number) => fakeStoreInstance.get<ProductType>(`/products/${id}`),
  getCategories: () => fakeStoreInstance.get<string[]>('/products/categories'),
  getByCategory: (category: string) => fakeStoreInstance.get<ProductType[]>(`/products/category/${category}`),
  getLimited: (limit: number) => fakeStoreInstance.get<ProductType[]>(`/products?limit=${limit}`),
};
