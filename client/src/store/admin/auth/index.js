import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: !!localStorage.getItem("tokenAdmin"),
  isLoading: false,
  user: JSON.parse(localStorage.getItem("userAdmin")) || null,
  token: localStorage.getItem("tokenAdmin") || null,
};

const authAdminSlice = createSlice({
  name: "authAdmin",
  initialState,
  reducers: {
    setUserAdmin: (state, action) => {
      const { _id, name, email, role, active, addresses, token } = action.payload;
      state.user = { _id, name, email, role, active, addresses };
      state.token = token;
      state.isAuthenticated = true; 
      state.isLoading = false;
    },
    logoutAdmin: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem("userAdmin");
      localStorage.removeItem("tokenAdmin");
    },
    setLoadingAdmin: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUserAdmin, logoutAdmin, setLoadingAdmin } = authAdminSlice.actions;
export default authAdminSlice.reducer;
