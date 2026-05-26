import { createSlice } from '@reduxjs/toolkit';
import initialProducts from '../utils/productList';

const storedProducts = localStorage.getItem('products');
const defaultProductImage =
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80';

const initialState = {
  products: storedProducts ? JSON.parse(storedProducts) : initialProducts,
};

const saveProductsToStorage = (products) => {
  localStorage.setItem('products', JSON.stringify(products));
};

const createAdminProduct = (productData) => ({
  ...productData,
  _id: Date.now().toString(),
  rating: 0,
  numReviews: 0,
  countInStock: Number(productData.countInStock),
  price: Number(productData.price),
  image: productData.image || defaultProductImage,
});

const createUpdatedAdminProduct = (productData) => ({
  ...productData,
  countInStock: Number(productData.countInStock),
  price: Number(productData.price),
  image: productData.image || defaultProductImage,
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addAdminProduct: (state, action) => {
      const product = createAdminProduct(action.payload);
      state.products = [product, ...state.products];
      saveProductsToStorage(state.products);
    },
    updateAdminProduct: (state, action) => {
      const updatedProduct = createUpdatedAdminProduct(action.payload);

      state.products = state.products.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      );
      saveProductsToStorage(state.products);
    },
    removeAdminProduct: (state, action) => {
      state.products = state.products.filter((product) => product._id !== action.payload);
      saveProductsToStorage(state.products);
    },
  },
});

export const { addAdminProduct, removeAdminProduct, updateAdminProduct } = productSlice.actions;

export default productSlice.reducer;
