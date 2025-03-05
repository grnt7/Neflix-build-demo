// src/features/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Adjust the path if needed

const rootReducer = combineReducers({
  user: userReducer,
  // Add other reducers here if you have them
});

export default rootReducer;