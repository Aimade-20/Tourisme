import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../services/axios";

// ================= REGISTER =================

export const registerUser = createAsyncThunk(
  "auth/registerUser",

  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/register", userData);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  },
);

// ================= LOGIN =================

export const loginUser = createAsyncThunk(
  "auth/loginUser",

  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", userData);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          error: {
            message: "Something went wrong",
            field: "general",
          },
        },
      );
    }
  },
);

// ================= INITIAL STATE =================
const savedUser = localStorage.getItem("user");
const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
};

// ================= SLICE =================

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },

  extraReducers: (builder) => {
    builder

      // ================= REGISTER =================

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;

        localStorage.setItem("token", action.payload.token);

        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= LOGIN =================

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;

        localStorage.setItem("token", action.payload.token);

        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
