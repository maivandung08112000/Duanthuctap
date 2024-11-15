import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Gọi API lấy danh sách category
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await axios.get("http://localhost:5555/api/categories");
    return response.data;
  }
);

const initialState = {
  listCategory: []
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    // setListCategory: (state, action) => {
    //   state.listCategory = action.payload
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.listCategory = action.payload;
    });
  },
});

export const { setListCategory } = categorySlice.actions;
export default categorySlice.reducer;
