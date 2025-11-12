import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { UserType } from '../types/Types';

// App State Interface
interface AppState {
  // Auth State
  user: UserType | null;
  token: string | null;
  isAuthenticated: boolean;
  
  // Loading State
  isLoading: boolean;
  
  // Theme State (opsiyonel)
  theme: 'light' | 'dark';
  
  // Language State (opsiyonel)
  language: 'tr' | 'en';
}

// Initial State
const initialState: AppState = {
  // Auth
  user: null,
  token: null,
  isAuthenticated: false,
  
  // Loading
  isLoading: false,
  
  // Theme
  theme: 'light',
  
  // Language
  language: 'tr',
};

// App Slice
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // Auth Actions
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
      state.token = action.payload.id;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload));
      localStorage.setItem('token', action.payload.id);
    },
    
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    
    loadUserFromStorage: (state) => {
      const userStr = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      if (userStr && token) {
        try {
          state.user = JSON.parse(userStr);
          state.token = token;
          state.isAuthenticated = true;
        } catch (error) {
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
        }
      }
    },
    
    // Loading Actions
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    
    // Theme Actions
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
    
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
    },
    
    // Language Actions
    setLanguage: (state, action: PayloadAction<'tr' | 'en'>) => {
      state.language = action.payload;
      localStorage.setItem('language', action.payload);
    },
    
    // Budget Actions
    updateBudget: (state, action: PayloadAction<number>) => {
      if (state.user) {
        state.user.budget = action.payload;
        localStorage.setItem('user', JSON.stringify(state.user));
        console.log('Bütçe güncellendi:', {
          kullanıcı: state.user.fullName,
          yeniBütçe: action.payload,
          tarih: new Date().toLocaleString('tr-TR')
        });
      }
    },
    
    decreaseBudget: (state, action: PayloadAction<number>) => {
      if (state.user) {
        state.user.budget -= action.payload;
        localStorage.setItem('user', JSON.stringify(state.user));
        console.log('Bütçe azaltıldı:', {
          kullanıcı: state.user.fullName,
          harcananMiktar: action.payload,
          kalanBütçe: state.user.budget,
          tarih: new Date().toLocaleString('tr-TR')
        });
      }
    },
    
    increaseBudget: (state, action: PayloadAction<number>) => {
      if (state.user) {
        state.user.budget += action.payload;
        localStorage.setItem('user', JSON.stringify(state.user));
        console.log('Bütçe artırıldı:', {
          kullanıcı: state.user.fullName,
          eklenenMiktar: action.payload,
          yeniBütçe: state.user.budget,
          tarih: new Date().toLocaleString('tr-TR')
        });
      }
    },
  },
});

// Export Actions
export const {
  setUser,
  logout,
  loadUserFromStorage,
  setLoading,
  setTheme,
  toggleTheme,
  setLanguage,
  updateBudget,
  decreaseBudget,
  increaseBudget,
} = appSlice.actions;

// Export Reducer
export default appSlice.reducer;
