import { combineReducers, createSlice } from '@reduxjs/toolkit';
import userReducer from './userSlice';

// 1. Define the Theme logic here to keep it out of the main store.js
const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    themeName: localStorage.getItem('theme') || 'default',
  },
  reducers: {
    toggleTheme: (state) => {
      state.themeName = state.themeName === 'default' ? 'original' : 'default';
      localStorage.setItem('theme', state.themeName);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeSlice.reducer, // 2. Add Theme here!
});

export default rootReducer;