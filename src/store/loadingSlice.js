import { createSlice } from "@reduxjs/toolkit";
import { login } from "./authSlice";
// Loading slice
const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    globalLoading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.globalLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.globalLoading = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.globalLoading = false;
      })
      .addCase(login.rejected, (state) => {
        state.globalLoading = false;
      });
  },
});

export const loadingActions = loadingSlice.actions;
export default loadingSlice;
