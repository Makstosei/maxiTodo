import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../reducers/themeReducer";

const store = configureStore({
  reducer: {
    theme: themeReducer, // "theme" adında anahtarla reducer'ı ekliyoruz
  },
});

export default store;
