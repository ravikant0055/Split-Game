// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import stickersReducer from '../store/stickersSlice';
import apiSlice from './apiSlice';

const store = configureStore({
    reducer: {
      stickers : stickersReducer,
      apidata  : apiSlice 
    },
});
export default store;
