import { createSlice } from '@reduxjs/toolkit';

const storedFavorites = localStorage.getItem('favorites');

const initialState = {
  favoriteItems: storedFavorites ? JSON.parse(storedFavorites) : [],
};

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const product = action.payload;
      const exists = state.favoriteItems.some((item) => item._id === product._id);

      state.favoriteItems = exists
        ? state.favoriteItems.filter((item) => item._id !== product._id)
        : [...state.favoriteItems, product];

      localStorage.setItem('favorites', JSON.stringify(state.favoriteItems));
    },
  },
});

export const { toggleFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
