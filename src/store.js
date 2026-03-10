// store.js

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './features/rootReducer';

const store = configureStore({
  reducer: rootReducer, // No curly braces, no spreading, just the root!
});

export default store;