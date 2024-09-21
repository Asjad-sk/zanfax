// redux/slices/orderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    products: [], // Ensure this is the default value
    totalAmount: 0,
    shippingAddress: {},
    phoneNumber: '',
  },
  reducers: {
    setOrderItems(state, action) {
      state.products = action.payload.products || []; // Safe check for undefined
      state.totalAmount = action.payload.totalAmount || 0;
    },
    setShippingAddress(state, action) {
      state.shippingAddress = action.payload || {}; // Safe check for undefined
    },
    setPhoneNumber(state, action) {
      state.phoneNumber = action.payload || ''; // Safe check for undefined
    },
    clearOrder(state) {
      state.products = [];
      state.totalAmount = 0;
      state.shippingAddress = {};
      state.phoneNumber = '';
    },
  },
});


export const { setOrderItems, setShippingAddress, setPhoneNumber, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
