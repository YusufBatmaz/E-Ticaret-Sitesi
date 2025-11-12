// Kullanıcı tipi
export interface UserType {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  budget: number;
  createdAt: string;
}

// Kayıt formu tipi
export interface RegisterFormType {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

// Login formu tipi
export interface LoginFormType {
  email: string;
  password: string;
}

// API Response tipi
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  status?: number;
}

// Product tipi (FakeStore API)
export interface ProductType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
