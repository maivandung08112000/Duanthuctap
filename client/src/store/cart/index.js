import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Gọi API lấy danh sách category
export const fetchCartDetailByUserID = createAsyncThunk(
  'cart/fetchCartDetailByUserID',
  async ({ token, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5555/api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token for authentication
        },
      });
      return response.data; // Return the data from the API
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle error
    }
  }
);

// Gọi API lấy danh sách order
export const fetchAllOrderByUserId = createAsyncThunk(
  'cart/orders',
  async ({ token, userId }, { rejectWithValue }) => {
    console.log("1111");
    
    try {
      const response = await axios.get(`http://localhost:5555/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token for authentication
        },
      });
      return response.data; // Return the data from the API
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle error
    }
  }
);

const initialState = {
  cartData: [],
  total_price: 0,
  orderData: []
};

const cartProductSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCartStore: (state) => {
      state.cartData = [];
      state.total_price = 0;
      state.orderData = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartDetailByUserID.fulfilled, (state, action) => {
      state.cartData = action.payload.cart;
      state.total_price = action.payload.total_price;
    });
    // 
    builder.addCase(fetchAllOrderByUserId.fulfilled, (state, action) => {
      state.orderData = action.payload.orders;
    });
  },
});

export const { clearCartStore } = cartProductSlice.actions;
export default cartProductSlice.reducer;
