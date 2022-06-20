import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../request";
import type { RootState } from "../../store";

// Define a type for the slice state
interface AdminRemovePostState {
  status: "idle" | "loading" | "failed" | "success";
  error: any | undefined;
}

// Define the initial state using that type
const initialState: AdminRemovePostState = {
  status: "idle",
  error: undefined,
};

export const adminRemovePost = createAsyncThunk(
  "post/admin/delete",
  async (params: { id: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/admin/post/${params.id}`);
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const adminRemovePostSlice = createSlice({
  name: "post/admin/delete",
  initialState,
  reducers: {
    clearAdminPostState: (state: AdminRemovePostState) => {
      state.status = "idle";
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminRemovePost.pending, (state) => {
        state.error = undefined;
        state.status = "loading";
      })
      .addCase(adminRemovePost.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(adminRemovePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addDefaultCase((state) => {
        state.status = "idle";
        state.error = undefined;
      });
  },
});

export const { clearAdminPostState } = adminRemovePostSlice.actions;

export const selectAdminRemovePostStatus = (state: RootState) =>
  state.adminRemovePost.status;
export const selectAdminRemovePostError = (state: RootState) =>
  state.adminRemovePost.error;

export default adminRemovePostSlice.reducer;
