import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: localStorage.getItem("theme") || "light", // Yerel depolamadan temayı al
  reducers: {
    toggleTheme: (state) => {
      const newTheme = state === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme); // Temayı yerel depolamaya kaydet
      return newTheme;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
