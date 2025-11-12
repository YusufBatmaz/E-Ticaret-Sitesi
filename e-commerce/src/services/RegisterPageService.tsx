import { usersAPI } from '../config/AxiosConfig';
import type { UserType, RegisterFormType, ApiResponse } from '../types/Types';

// UUID oluşturma fonksiyonu
export const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// Kullanıcı kayıt fonksiyonu
export const registerUser = async (formData: RegisterFormType): Promise<ApiResponse<UserType>> => {
  try {
    const { confirmPassword, ...userData } = formData;
    
    const newUser: UserType = {
      id: generateUUID(),
      ...userData,
      budget: 10000, // Varsayılan bütçe: 10,000 TL
      createdAt: new Date().toISOString()
    };

    const response = await usersAPI.register(newUser);
    return {
      success: true,
      data: response.data,
      status: response.status
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || 'Kayıt sırasında bir hata oluştu',
      status: error.response?.status
    };
  }
};

// E-posta kontrolü
export const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    const response = await usersAPI.getAll();
    const users: UserType[] = response.data;
    return users.some((user: UserType) => user.email === email);
  } catch (error) {
    console.error('E-posta kontrol hatası:', error);
    return false;
  }
};

// Telefon kontrolü
export const checkPhoneExists = async (phone: string): Promise<boolean> => {
  try {
    const response = await usersAPI.getAll();
    const users: UserType[] = response.data;
    return users.some((user: UserType) => user.phone === phone);
  } catch (error) {
    console.error('Telefon kontrol hatası:', error);
    return false;
  }
};
