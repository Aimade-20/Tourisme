import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import api from "../../services/axios";

// ================= GET MY ACTIVITIES =================

export const getMyActivities = createAsyncThunk(
  "guideActivity/getMyActivities",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        "/activitys/guide/my"
      );

      return response.data.activities;

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to get your activities"
      );
    }
  }
);

// ================= CREATE ACTIVITY =================

export const createGuideActivity = createAsyncThunk(
  "guideActivity/create",
  async (activityData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/activitys",
        activityData
      );

      return response.data.activity;

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to create activity"
      );
    }
  }
);

// ================= UPDATE ACTIVITY =================

export const updateGuideActivity = createAsyncThunk(
  "guideActivity/update",
  async ({ id, activityData }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/activitys/${id}`,
        activityData
      );

      return response.data.activity;

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to update activity"
      );
    }
  }
);

// ================= DELETE ACTIVITY =================

export const deleteGuideActivity = createAsyncThunk(
  "guideActivity/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/activitys/${id}`);

      return id;

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to delete activity"
      );
    }
  }
);

// ================= INITIAL STATE =================

const initialState = {
  activities: [],
  currentActivity: null,

  loading: false,
  error: null,
};

// ================= SLICE =================

const guideActivitySlice = createSlice({
  name: "guideActivity",

  initialState,

  reducers: {
    clearGuideActivityError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {

    // ================= GET =================

    builder
      .addCase(getMyActivities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getMyActivities.fulfilled, (state, action) => {
        state.loading = false;
        state.activities = action.payload;
      })

      .addCase(getMyActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ================= CREATE =================

    builder
      .addCase(createGuideActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createGuideActivity.fulfilled, (state, action) => {
        state.loading = false;

        state.activities.unshift(action.payload);
      })

      .addCase(createGuideActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ================= UPDATE =================

    builder
      .addCase(updateGuideActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateGuideActivity.fulfilled, (state, action) => {
        state.loading = false;

        state.activities = state.activities.map(
          (activity) =>
            activity._id === action.payload._id
              ? action.payload
              : activity
        );
      })

      .addCase(updateGuideActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ================= DELETE =================

    builder
      .addCase(deleteGuideActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteGuideActivity.fulfilled, (state, action) => {
        state.loading = false;

        state.activities = state.activities.filter(
          (activity) =>
            activity._id !== action.payload
        );
      })

      .addCase(deleteGuideActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearGuideActivityError,
} = guideActivitySlice.actions;

export default guideActivitySlice.reducer;