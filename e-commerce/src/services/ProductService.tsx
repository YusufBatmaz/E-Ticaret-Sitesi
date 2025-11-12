import { productsAPI } from '../config/AxiosConfig';
import type { ProductType, ApiResponse } from '../types/Types';

// Tüm ürünleri getir
export const getAllProducts = async (): Promise<ApiResponse<ProductType[]>> => {
  try {
    const response = await productsAPI.getAll();
    return {
      success: true,
      data: response.data,
      status: response.status
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || 'Ürünler yüklenirken bir hata oluştu',
      status: error.response?.status
    };
  }
};

// ID'ye göre ürün getir
export const getProductById = async (id: number): Promise<ApiResponse<ProductType>> => {
  try {
    const response = await productsAPI.getById(id);
    return {
      success: true,
      data: response.data,
      status: response.status
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || 'Ürün yüklenirken bir hata oluştu',
      status: error.response?.status
    };
  }
};

// Kategorileri getir
export const getCategories = async (): Promise<ApiResponse<string[]>> => {
  try {
    const response = await productsAPI.getCategories();
    return {
      success: true,
      data: response.data,
      status: response.status
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || 'Kategoriler yüklenirken bir hata oluştu',
      status: error.response?.status
    };
  }
};

// Kategoriye göre ürünleri getir
export const getProductsByCategory = async (category: string): Promise<ApiResponse<ProductType[]>> => {
  try {
    const response = await productsAPI.getByCategory(category);
    return {
      success: true,
      data: response.data,
      status: response.status
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || 'Ürünler yüklenirken bir hata oluştu',
      status: error.response?.status
    };
  }
};

// Sınırlı sayıda ürün getir
export const getLimitedProducts = async (limit: number): Promise<ApiResponse<ProductType[]>> => {
  try {
    const response = await productsAPI.getLimited(limit);
    return {
      success: true,
      data: response.data,
      status: response.status
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || 'Ürünler yüklenirken bir hata oluştu',
      status: error.response?.status
    };
  }
};
