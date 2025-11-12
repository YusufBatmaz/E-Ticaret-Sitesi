import { usersAPI } from '../config/AxiosConfig';
import type { UserType, LoginFormType, ApiResponse } from '../types/Types';

// Kullanıcı giriş fonksiyonu
export const loginUser = async (formData: LoginFormType): Promise<ApiResponse<UserType>> => {
  try {
    const response = await usersAPI.getAll();
    const users: UserType[] = response.data;

    // E-posta ve şifre kontrolü
    const user = users.find(
      (u: UserType) => u.email === formData.email && u.password === formData.password
    );

    if (user) {
      // Kullanıcı bulundu, localStorage'a kaydet
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', user.id); // Token olarak user id kullanıyoruz
      
      return {
        success: true,
        data: user,
        status: 200
      };
    } else {
      return {
        success: false,
        error: 'E-posta veya şifre hatalı!',
        status: 401
      };
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || 'Giriş sırasında bir hata oluştu',
      status: error.response?.status
    };
  }
};

// Kullanıcı çıkış fonksiyonu
export const logoutUser = (): void => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

// Giriş yapılmış mı kontrolü
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  return !!token;
};

// Giriş yapmış kullanıcıyı getir
export const getCurrentUser = (): UserType | null => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch (error) {
      return null;
    }
  }
  return null;
}; 