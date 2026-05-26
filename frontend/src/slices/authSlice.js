import { createSlice } from '@reduxjs/toolkit';

const storedUser = localStorage.getItem('userInfo');

const initialState = {
  userInfo: storedUser ? JSON.parse(storedUser) : null,
};

const createUserInfo = ({ name, email }) => {
  const fallbackName = email.split('@')[0];
  const displayName = name || fallbackName.charAt(0).toUpperCase() + fallbackName.slice(1);

  return {
    name: displayName,
    email,
    isAdmin: email.toLowerCase() === 'admin@jewelry.com',
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.userInfo = createUserInfo(action.payload);
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
});

export const selectUserInfo = (state) => state.auth.userInfo;

export const selectIsAdminUser = (state) => {
  const userInfo = selectUserInfo(state);

  return Boolean(
    userInfo?.isAdmin ||
      userInfo?.email?.toLowerCase() === 'admin@jewelry.com' ||
      userInfo?.name?.toLowerCase() === 'admin'
  );
};

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
