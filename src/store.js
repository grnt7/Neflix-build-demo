// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './features/rootReducer'; // Adjust the path if needed

const store = configureStore({
  reducer: rootReducer,
});

export default store;