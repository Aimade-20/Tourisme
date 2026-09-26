import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import api from "../../services/axios";


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
        error.response?.data ||
        "Something went wrong"
      );
    }
  }
);



const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};



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

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })


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