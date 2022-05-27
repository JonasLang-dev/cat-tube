import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../request";
import type { RootState } from "../../store";

// Define a type for the slice state
interface AdminPostState {
  status: "idle" | "loading" | "failed" | "success";
  error: any | undefined;
  data: any | undefined;
}

// Define the initial state using that type
const initialState: AdminPostState = {
  status: "idle",
  error: undefined,
  data: undefined,
};

export const adminPost = createAsyncThunk(
  "post/admin",
  async (data, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/admin/post`);
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const adminPostSlice = createSlice({
  name: "post/admin",
  initialState,
  reducers: {
    clearAdminPostState: (state: AdminPostState) => {
      state.status = "idle";
      state.error = undefined;
      state.data = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminPost.pending, (state) => {
        state.error = undefined;
        state.status = "loading";
      })
      .addCase(adminPost.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(adminPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addDefaultCase((state) => {
        state.status = "idle";
        state.error = undefined;
      });
  },
});

export const { clearAdminPostState } = adminPostSlice.actions;

export const selectAdminPostStatus = (state: RootState) =>
  state.adminPost.status;
export const selectAdminPostError = (state: RootState) => state.adminPost.error;
export const selectAdminPostData = (state: RootState) => state.adminPost.data;

export default adminPostSlice.reducer;
