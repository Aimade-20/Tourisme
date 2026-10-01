import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../services/axios";

// ================= post guide =================
export const createGuide = createAsyncThunk(
  "guide/createGuide",
  async(dataGuide , {rejectWithValue}) =>{
    try {
      const response = await api.post("/admin/guides",dataGuide)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to create guide"
      );
    }
  }
)

// ================= GET USERS =================

export const getAllUsers = createAsyncThunk(
  "users/getAllusers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/users");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to get users"
      );
    }
  }
);

// ================= GET GUIDES =================

export const getAllGuide = createAsyncThunk(
  "guide/getAllGuide",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/guides");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to get guides"
      );
    }
  }
);

// ================= UPDATE GUIDE =================

export const updateGuide = createAsyncThunk(
  "admin/updateGuide",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/admin/guides/${id}`,
        data
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update guide"
      );
    }
  }
);

// ================= DELETE GUIDE =================

export const deleteGuide = createAsyncThunk(
  "admin/deleteGuide",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `/admin/guides/${id}`
      );

      return {
        id,
        ...response.data,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to delete guide"
      );
    }
  }
);

// ================= GET RESERVATIONS =================

export const getAllReservations = createAsyncThunk(
  "guide/getAllReservations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        "/admin/reservations"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to get reservations"
      );
    }
  }
);

// ================= INITIAL STATE =================

const initialState = {
  users: [],
  guides: [],
  reservations: [],
  loading: false,
  error: null,
};

// ================= SLICE =================

const adminSlice = createSlice({
  name: "admin",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

          .addCase(createGuide.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createGuide.fulfilled, (state, action) => {
        state.loading = false;
        state.guides.push(action.payload.guides)
      })

      .addCase(createGuide.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= USERS =================

      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users || [];
      })

      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= GUIDES =================

      .addCase(getAllGuide.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAllGuide.fulfilled, (state, action) => {
        state.loading = false;
        state.guides = action.payload.guides || [];
      })

      .addCase(getAllGuide.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= UPDATE GUIDE =================

      .addCase(updateGuide.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateGuide.fulfilled, (state, action) => {
        state.loading = false;

        const updatedGuide = action.payload.guide;

        state.guides = state.guides.map((guide) =>
          guide._id === updatedGuide._id
            ? updatedGuide
            : guide
        );
      })

      .addCase(updateGuide.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= DELETE GUIDE =================

      .addCase(deleteGuide.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteGuide.fulfilled, (state, action) => {
        state.loading = false;

        state.guides = state.guides.filter(
          (guide) =>
            guide._id !== action.payload.id
        );
      })

      .addCase(deleteGuide.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= RESERVATIONS =================

      .addCase(getAllReservations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        getAllReservations.fulfilled,
        (state, action) => {
          state.loading = false;

          state.reservations =
            action.payload.reservations || [];
        }
      )

      .addCase(
        getAllReservations.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default adminSlice.reducer;