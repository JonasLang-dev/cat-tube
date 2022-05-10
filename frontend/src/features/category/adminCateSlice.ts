import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../request";
import type { RootState } from "../../store";

// Define a type for the slice state
interface AdminCategoryState {
  status: "idle" | "loading" | "failed" | "success";
  error: any | undefined;
  data: any | undefined;
}

// Define the initial state using that type
const initialState: AdminCategoryState = {
  status: "idle",
  error: undefined,
  data: undefined,
};

export const adminCategory = createAsyncThunk(
  "category/admin",
  async (data, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/admin/category`);
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const adminCateSlice = createSlice({
  name: "category/admin",
  initialState,
  reducers: {
    clearAdminCateState: (state) => {
      state.status = "idle";
      state.error = undefined;
      state.data = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminCategory.pending, (state) => {
        state.error = undefined;
        state.status = "loading";
      })
      .addCase(adminCategory.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(adminCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addDefaultCase((state) => {
        state.status = "idle";
        state.error = undefined;
      });
  },
});

export const { clearAdminCateState } = adminCateSlice.actions;

export const selectAdminCateStatus = (state: RootState) =>
  state.adminCategory.status;
export const selectAdminCateError = (state: RootState) =>
  state.adminCategory.error;
export const selectAdminCateData = (state: RootState) =>
  state.adminCategory.data;

export default adminCateSlice.reducer;
