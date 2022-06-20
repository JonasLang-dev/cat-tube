import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../request";
import type { RootState } from "../../store";

// Define a type for the slice state
interface RemoveCategoryState {
  status: "idle" | "loading" | "failed" | "success";
  error: any | undefined;
}

// Define the initial state using that type
const initialState: RemoveCategoryState = {
  status: "idle",
  error: undefined,
};

export const removeCategory = createAsyncThunk(
  "category/remove",
  async (data: { id: string }, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/admin/category/${data.id}`);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeCateSlice = createSlice({
  name: "category/add",
  initialState,
  reducers: {
    clearRemoveCateState: (state: RemoveCategoryState) => {
      state.status = "idle";
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeCategory.pending, (state) => {
        state.error = undefined;
        state.status = "loading";
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(removeCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addDefaultCase((state) => {
        state.status = "idle";
        state.error = undefined;
      });
  },
});

export const { clearRemoveCateState } = removeCateSlice.actions;

export const selectRemoveCateStatus = (state: RootState) =>
  state.removeCate.status;
export const selectRemoveCateError = (state: RootState) =>
  state.removeCate.error;

export default removeCateSlice.reducer;
