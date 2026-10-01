import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/axios";

// =========================
// REGISTER
// =========================
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/register", userData);

      return response.data;
    } catch (error) {
      console.log("REGISTER AXIOS ERROR:", error);

      return rejectWithValue(
        error.response?.data || {
          error: {
            message: "Unable to connect to server",
            field: "general",
          },
        },
      );
    }
  },
);

// =========================
// LOGIN
// =========================
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", userData);

      return response.data;
    } catch (error) {
      console.log("LOGIN AXIOS ERROR:", error);

      return rejectWithValue(
        error.response?.data || {
          error: {
            message: "Unable to connect to server",
            field: "general",
          },
        },
      );
    }
  },
);

// =========================
// INITIAL STATE
// =========================
const savedUser = localStorage.getItem("user");
const savedToken = localStorage.getItem("token");

const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  token: savedToken || null,

  isAuthenticated: !!savedToken,

  loading: false,
  error: null,
};
// =========================
// SLICE
// =========================
const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem("token");
    },

    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    // =========================
    // REGISTER
    // =========================

    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.user = action.payload.user || null;
        state.token = action.payload.token || null;
        state.isAuthenticated = !!action.payload.token;

        if (action.payload.token) {
          localStorage.setItem("token", action.payload.token);
        }

        if (action.payload.user) {
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // =========================
    // LOGIN
    // =========================

    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;
