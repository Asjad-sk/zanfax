// cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Initial state with an empty array of items
const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingProductIndex = state.items.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingProductIndex >= 0) {
        // Increase quantity of the existing product
        state.items[existingProductIndex].quantity += action.payload.quantity;
      } else {
        // Add new product with default quantity if missing
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,  // Ensure quantity is at least 1
        });
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item._id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ id: string, quantity: number }>) => {
      const { id, quantity } = action.payload;
      const product = state.items.find(item => item._id === id);

      if (product) {
        // Ensure quantity cannot be less than 1
        product.quantity = quantity > 0 ? quantity : 1;
      }
    },
    updateSize: (state, action: PayloadAction<{ id: string, size: string }>) => {
      const { id, size } = action.payload;
      const product = state.items.find(item => item._id === id);

      if (product) {
        product.size = size;
      }
    },
  },
});

// Exporting actions
export const { addItem, removeItem, updateQuantity, updateSize } = cartSlice.actions;
export default cartSlice.reducer;

// Selectors (You can place these in a separate file if you prefer)
export const selectCartItems = (state => state.cart.items);
export const selectCartItemCount = (state) => 
  state.cart.items.reduce((total, item) => total + item.quantity, 0);  // Sum of quantities
