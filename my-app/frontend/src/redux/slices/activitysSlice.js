import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import api from "../../services/axios";

export const getActivitys = createAsyncThunk(
  "activitys/getActivitys",

  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/activitys");
console.log("response slice" ,response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to get activities"
      );
    }
  }
);

const initialState = {
  activities: [],
  loading: false,
  error: null,
};

const activitySlice = createSlice({
  name: "activitys",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getActivitys.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getActivitys.fulfilled, (state, action) => {
        state.loading = false;
        state.activities = action.payload.activities;
      })

      .addCase(getActivitys.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default activitySlice.reducer;