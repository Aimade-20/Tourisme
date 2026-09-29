import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/axios";

// ================= CREATE CATEGORY =================

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/categories", data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to create category"
      );
    }
  }
);

// ================= GET ALL CATEGORIES =================

export const getAllCategory = createAsyncThunk(
  "category/getAllCategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/categories");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to get categories"
      );
    }
  }
);

// ================= UPDATE CATEGORY =================

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/categories/${id}`,
        data
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update category"
      );
    }
  }
);

// ================= DELETE CATEGORY =================

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `/categories/${id}`
      );

      return {
        id,
        ...response.data,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to delete category"
      );
    }
  }
);

// ================= INITIAL STATE =================

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

// ================= SLICE =================

const categorySlice = createSlice({
  name: "category",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ================= GET =================

      .addCase(getAllCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.loading = false;

        state.categories =
          action.payload.categorys || [];
      })

      .addCase(getAllCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= CREATE =================

      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;

        state.categories.push(
          action.payload.category
        );
      })

      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= UPDATE =================

      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;

        const updatedCategory =
          action.payload.newCategory;

        state.categories = state.categories.map(
          (category) =>
            category._id === updatedCategory._id
              ? updatedCategory
              : category
        );
      })

      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= DELETE =================

      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;

        state.categories = state.categories.filter(
          (category) =>
            category._id !== action.payload.id
        );
      })

      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;