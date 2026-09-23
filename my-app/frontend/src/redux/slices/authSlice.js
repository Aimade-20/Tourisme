import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import api from "../../services/axios";

// Register request
export const registerUser = createAsyncThunk(
  "auth/registerUser",

  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/auth/register",
        userData
      );

      return response.data;

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  }
);


// Initial state
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};


// Slice
const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },

  },

  extraReducers: (builder) => {

    builder

      // Request started
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // Request succeeded
      .addCase(
        registerUser.fulfilled,
        (state, action) => {

          state.loading = false;

          state.user = action.payload.user;

          state.token = action.payload.token;

          state.isAuthenticated = true;

          state.error = null;
        }
      )

      // Request failed
      .addCase(
        registerUser.rejected,
        (state, action) => {

          state.loading = false;

          state.error = action.payload;
        }
      );
  },
});


export const { logout } = authSlice.actions;

export default authSlice.reducer;