// src/store/stickersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Array to hold sticker objects
};

const stickersSlice = createSlice({
  name: 'stickers',
  initialState,
  reducers: {
    addSticker: (state, action) => {
      state.items.push(action.payload);
    },
    removeSticker: (state, action) => {
      state.items = state.items.filter(sticker => sticker.id !== action.payload);
    },
    updateStickerPosition: (state, action) => {
      const { id, x, y } = action.payload;
      const sticker = state.items.find(sticker => sticker.id === id);
      if (sticker) {
        sticker.x = x;
        sticker.y = y;
      }
    },
    updateStickerSize: (state, action) => {
      const { id, width, height } = action.payload;
      const sticker = state.items.find(sticker => sticker.id === id);
      if (sticker) {
        sticker.width = width;
        sticker.height = height;
      }
    },
    clearStickers: (state) => {
      state.items = [];
    },
    // Add more reducers as needed
  },
});

export const {
  addSticker,
  removeSticker,
  updateStickerPosition,
  updateStickerSize,
  clearStickers,
} = stickersSlice.actions;

export default stickersSlice.reducer;
