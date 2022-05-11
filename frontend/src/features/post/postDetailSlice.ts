import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../request";
import type { RootState } from "../../store";

// Define a type for the slice state
interface postDetailState {
  status: "idle" | "loading" | "failed" | "success";
  error: any | undefined;
  data: any | undefined;
}

// Define the initial state using that type
const initialState: postDetailState = {
  status: "idle",
  error: undefined,
  data: undefined,
};

export const postDetail = createAsyncThunk(
  "post/detail",
  async (
    post: {
      id: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.get(`/api/posts/${post.id}`);
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const postDetailSlice = createSlice({
  name: "post/detail",
  initialState,
  reducers: {
    clearPostDetailState: (state) => {
      state.status = "idle";
      state.error = undefined;
      state.data = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postDetail.pending, (state) => {
        state.error = undefined;
        state.status = "loading";
      })
      .addCase(postDetail.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(postDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addDefaultCase((state) => {
        state.status = "idle";
        state.error = undefined;
      });
  },
});

export const { clearPostDetailState } = postDetailSlice.actions;

export const selectPostDetailStatus = (state: RootState) =>
  state.postDetail.status;
export const selectPostDetailError = (state: RootState) =>
  state.postDetail.error;
export const selectPostDetailData = (state: RootState) => state.postDetail.data;

export default postDetailSlice.reducer;
