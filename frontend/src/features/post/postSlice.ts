import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../request";
import type { RootState } from "../../store";

// Define a type for the slice state
interface SignUpState {
  status: "idle" | "loading" | "failed" | "success";
  error: any | undefined;
  data: object | undefined;
}

// Define the initial state using that type
const initialState: SignUpState = {
  status: "idle",
  error: undefined,
  data: undefined,
};

export const post = createAsyncThunk(
  "post",
  async (
    post: {
      title: string;
      description: string;
      postUrl: string;
      videoUrl: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.put(`/api/posts`, post);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    clearPostState: (state) => {
      state.status = "idle";
      state.error = undefined;
      state.data = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(post.pending, (state) => {
        state.error = undefined;
        state.status = "loading";
      })
      .addCase(post.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload.data;
      })
      .addCase(post.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addDefaultCase((state) => {
        state.status = "idle";
        state.error = undefined;
      });
  },
});

export const { clearPostState } = postSlice.actions;

export const selectPostStatus = (state: RootState) => state.post.status;
export const selectPostError = (state: RootState) => state.post.error;
export const selectPostData = (state: RootState) => state.post.data;

export default postSlice.reducer;
