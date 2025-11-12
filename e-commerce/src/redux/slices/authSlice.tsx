import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { UserType } from '../../types/Types';

interface AuthState {
  user: UserType | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
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
  },
});

export const { setUser, logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
