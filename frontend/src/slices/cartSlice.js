import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const storedCart = localStorage.getItem('cart');
const parsedCart = storedCart ? JSON.parse(storedCart) : null;

const initialState = Array.isArray(parsedCart)
  ? { cartItems: parsedCart, shippingAddress: {}, paymentMethod: 'Pouzecem' }
  : parsedCart || { cartItems: [], shippingAddress: {}, paymentMethod: 'Pouzecem' };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existItem = state.cartItems.find((item) => item._id === product._id);

      state.cartItems = existItem
        ? state.cartItems.map((item) =>
            item._id === existItem._id ? { ...item, qty: item.qty + 1 } : item
          )
        : [...state.cartItems, { ...product, qty: 1 }];

      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    clearCartItems: (state) => {
      state.cartItems = [];
      return updateCart(state);
    },
  },
});

export const {
  addToCart,
  clearCartItems,
  removeFromCart,
  savePaymentMethod,
  saveShippingAddress,
} = cartSlice.actions;

export default cartSlice.reducer;
