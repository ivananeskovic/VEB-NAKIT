import { PRODUCT_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({ url: PRODUCT_URL }),
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (productId) => ({ url: `${PRODUCT_URL}/${productId}` }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: (product) => ({
        url: PRODUCT_URL,
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation({
      query: (product) => ({
        url: `${PRODUCT_URL}/${product._id}`,
        method: 'PUT',
        body: product,
      }),
      invalidatesTags: ['Product'],
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductDetailsQuery,
  useGetProductsQuery,
  useUpdateProductMutation,
} = productsApiSlice;
