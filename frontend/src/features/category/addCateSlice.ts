import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../request";
import type { RootState } from "../../store";

// Define a type for the slice state
interface AddCategoryState {
  status: "idle" | "loading" | "failed" | "success";
  error: any | undefined;
}

// Define the initial state using that type
const initialState: AddCategoryState = {
  status: "idle",
  error: undefined,
};

export const addCategory = createAsyncThunk(
  "category/add",
  async (data: { title: string; description: string }, { rejectWithValue }) => {
    try {
      await axios.post(`/api/admin/category`, {
        title: data.title,
        description: data.description,
      });
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addCateSlice = createSlice({
  name: "category/add",
  initialState,
  reducers: {
    clearAddCateState: (state: AddCategoryState) => {
      state.status = "idle";
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCategory.pending, (state) => {
        state.error = undefined;
        state.status = "loading";
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addDefaultCase((state) => {
        state.status = "idle";
        state.error = undefined;
      });
  },
});

export const { clearAddCateState } = addCateSlice.actions;

export const selectAddCateStatus = (state: RootState) => state.addCate.status;
export const selectAddCateError = (state: RootState) => state.addCate.error;

export default addCateSlice.reducer;
