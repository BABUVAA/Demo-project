import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosApi";

// Async thunk for user login
export const login = createAsyncThunk(
  "/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/login", credentials, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
// Async thunk for user login
export const logout = createAsyncThunk(
  "/logout",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.get("/logout", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: null,
    error: null,
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const authAction = authSlice.actions;
export default authSlice;
