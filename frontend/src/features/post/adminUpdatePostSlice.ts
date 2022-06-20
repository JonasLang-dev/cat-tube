import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../request";
import type { RootState } from "../../store";

// Define a type for the slice state
interface AdminUpdatePostState {
  status: "idle" | "loading" | "failed" | "success";
  error: any | undefined;
}

// Define the initial state using that type
const initialState: AdminUpdatePostState = {
  status: "idle",
  error: undefined,
};

export const adminUpdatePost = createAsyncThunk(
  "post/admin/update",
  async (params: { id: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/admin/post/${params.id}`);
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const adminUpdatePostSlice = createSlice({
  name: "post/admin/update",
  initialState,
  reducers: {
    clearAdminPostState: (state: AdminUpdatePostState) => {
      state.status = "idle";
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminUpdatePost.pending, (state) => {
        state.error = undefined;
        state.status = "loading";
      })
      .addCase(adminUpdatePost.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(adminUpdatePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addDefaultCase((state) => {
        state.status = "idle";
        state.error = undefined;
      });
  },
});

export const { clearAdminPostState } = adminUpdatePostSlice.actions;

export const selectAdminUpdatePostStatus = (state: RootState) =>
  state.adminUpdatePost.status;
export const selectAdminUpdatePostError = (state: RootState) =>
  state.adminUpdatePost.error;

export default adminUpdatePostSlice.reducer;
