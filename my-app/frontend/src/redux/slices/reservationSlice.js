import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../services/axios";

const initialState = {
  reservation: [],
  currentReservation: null,
  loading: false,
  error: null,
};

export const createReservation = createAsyncThunk(
  "reservation/createReservation",

  async ({ activityId, numberOfPlaces }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/activitys/${activityId}/places`, {
        numberOfPlaces,
      });

      return response.data.reservation;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create reservation",
      );
    }
  },
);

export const getMyreservation = createAsyncThunk(
  "reservation/getMyreservation",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/activitys/reservations/me");
      console.log("My reservations:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get activities",
      );
    }
  },
);

const reservationSlice = createSlice({
  name: "reservation",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(createReservation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createReservation.fulfilled, (state, action) => {
        state.loading = false;
        state.currentReservation = action.payload;
        state.error = null;
      }) 

      .addCase(createReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getMyreservation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyreservation.fulfilled, (state, action) => {
        state.loading = false;
        state.reservation = action.payload.reservations;
        state.error = null;
      })
      .addCase(getMyreservation.rejected, (state, action) => {
        state.loading = false;
        state.reservation = [];
        state.error = action.payload;
      });
  },
});

export default reservationSlice.reducer;
