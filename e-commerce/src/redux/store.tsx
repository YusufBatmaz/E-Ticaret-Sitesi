import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import basketReducer from './slices/basketSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    basket: basketReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
