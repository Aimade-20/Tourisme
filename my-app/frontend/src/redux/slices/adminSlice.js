import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../services/axios";

export const getAllUsers = createAsyncThunk(
  "users/getAllusers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/users");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get users",
      );
    }
  },
);

export const getAllGuide = createAsyncThunk(
  "guide/getAllGuide",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/guides");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get users",
      );
    }
  },
);
export const getAllReservations = createAsyncThunk(
  "guide/getAllReservations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/reservations");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get users",
      );
    }
  },
);

const initialState = {
  users: [],
  guides : [],
  reservations : [],
  loading: false,
  error: null,
};

const usersSilice = createSlice({
  name: "admin",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
        // users
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true 
        state.error = null
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload.users
        state.error = null;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    //   guides
      .addCase(getAllGuide.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getAllGuide.fulfilled, (state, action) => {
        state.loading = false
         state.guides = action.payload.guides
        state.error = null
      })
      .addCase(getAllGuide.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    //   reservation
          .addCase(getAllReservations.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getAllReservations.fulfilled, (state, action) => {
        state.loading = false
         state.reservations = action.payload.reservations
        state.error = null
      })
      .addCase(getAllReservations.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      });
  },
});
export default usersSilice.reducer;
