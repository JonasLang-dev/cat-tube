import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../request";
import type { RootState } from "../../store";

// Define a type for the slice state
interface PostsState {
  status: "idle" | "loading" | "failed" | "success";
  error: any | undefined;
  data: Array<any> | undefined;
}

// Define the initial state using that type
const initialState: PostsState = {
  status: "idle",
  error: undefined,
  data: [],
};

export const posts = createAsyncThunk(
  "posts",
  async (data, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/posts`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearPostsState: (state) => {
      state.status = "idle";
      state.error = undefined;
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(posts.pending, (state) => {
        state.error = undefined;
        state.status = "loading";
      })
      .addCase(posts.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload.data;
      })
      .addCase(posts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addDefaultCase((state) => {
        state.status = "idle";
        state.error = [];
      });
  },
});

export const { clearPostsState } = postsSlice.actions;

export const selectPostsStatus = (state: RootState) => state.posts.status;
export const selectPostsError = (state: RootState) => state.posts.error;
export const selectPostsData = (state: RootState) => state.posts.data;

export default postsSlice.reducer;
