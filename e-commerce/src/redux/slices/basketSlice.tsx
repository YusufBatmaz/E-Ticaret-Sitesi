import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ProductType } from '../../types/Types';

// Sepet Ürün Tipi
export interface BasketItemType {
  product: ProductType;
  quantity: number;
}

// Basket State Interface
interface BasketState {
  items: BasketItemType[];
  totalItems: number;
  totalPrice: number;
}

// Initial State
const initialState: BasketState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

// LocalStorage'dan sepeti yükle
const loadBasketFromStorage = (): BasketState => {
  try {
    const basketStr = localStorage.getItem('basket');
    if (basketStr) {
      const parsed = JSON.parse(basketStr);
      // Geçerli bir sepet objesi olduğundan emin ol
      if (parsed && Array.isArray(parsed.items)) {
        return {
          items: parsed.items || [],
          totalItems: parsed.totalItems || 0,
          totalPrice: parsed.totalPrice || 0,
        };
      }
    }
  } catch (error) {
    console.error('Sepet yüklenirken hata:', error);
  }
  return {
    items: [],
    totalItems: 0,
    totalPrice: 0,
  };
};

// LocalStorage'a sepeti kaydet
const saveBasketToStorage = (state: BasketState) => {
  try {
    localStorage.setItem('basket', JSON.stringify(state));
  } catch (error) {
    console.error('Sepet kaydedilirken hata:', error);
  }
};

// Toplam hesaplama fonksiyonu
const calculateTotals = (items: BasketItemType[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  return { totalItems, totalPrice };
};

// Basket Slice
const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    // Sepete ürün ekle
    addToBasket: (state, action: PayloadAction<{ product: ProductType; quantity: number }>) => {
      const { product, quantity } = action.payload;
      
      // State'in items array'inin var olduğundan emin ol
      if (!state.items) {
        state.items = [];
      }
      
      const existingItem = state.items.find(item => item.product.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ product, quantity });
      }

      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;
      
      saveBasketToStorage(state);
      
      console.log('Sepete eklendi:', {
        ürün: product.title,
        miktar: quantity,
        toplamÜrünSayısı: state.totalItems,
        sepetToplamı: state.totalPrice.toFixed(2)
      });
    },

    // Sepetten ürün çıkar
    removeFromBasket: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const removedItem = state.items.find(item => item.product.id === productId);
      
      state.items = state.items.filter(item => item.product.id !== productId);
      
      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;
      
      saveBasketToStorage(state);
      
      if (removedItem) {
        console.log('Sepetten çıkarıldı:', {
          ürün: removedItem.product.title,
          miktar: removedItem.quantity
        });
      }
    },

    // Ürün miktarını güncelle
    updateQuantity: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.product.id === productId);

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.product.id !== productId);
        } else {
          item.quantity = quantity;
        }

        const totals = calculateTotals(state.items);
        state.totalItems = totals.totalItems;
        state.totalPrice = totals.totalPrice;
        
        saveBasketToStorage(state);
        
        console.log('Miktar güncellendi:', {
          ürün: item.product.title,
          yeniMiktar: quantity
        });
      }
    },

    // Ürün miktarını artır
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const item = state.items.find(item => item.product.id === productId);

      if (item) {
        item.quantity += 1;
        
        const totals = calculateTotals(state.items);
        state.totalItems = totals.totalItems;
        state.totalPrice = totals.totalPrice;
        
        saveBasketToStorage(state);
      }
    },

    // Ürün miktarını azalt
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const item = state.items.find(item => item.product.id === productId);

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter(item => item.product.id !== productId);
        }

        const totals = calculateTotals(state.items);
        state.totalItems = totals.totalItems;
        state.totalPrice = totals.totalPrice;
        
        saveBasketToStorage(state);
      }
    },

    // Sepeti temizle
    clearBasket: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
      
      saveBasketToStorage(state);
      
      console.log('Sepet temizlendi');
    },

    // LocalStorage'dan sepeti yükle
    loadBasket: () => {
      return loadBasketFromStorage();
    },
  },
});

// Export Actions
export const {
  addToBasket,
  removeFromBasket,
  updateQuantity,
  increaseQuantity,
  decreaseQuantity,
  clearBasket,
  loadBasket,
} = basketSlice.actions;

// Export Reducer
export default basketSlice.reducer;
