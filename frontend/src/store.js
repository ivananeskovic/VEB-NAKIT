import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import authSliceReducer from './slices/authSlice';
import cartSliceReducer from './slices/cartSlice';
import favoriteSliceReducer from './slices/favoriteSlice';
import productSliceReducer from './slices/productSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    cart: cartSliceReducer,
    favorites: favoriteSliceReducer,
    products: productSliceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
