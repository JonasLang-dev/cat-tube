import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../request";
import type { RootState } from "../../store";

// Define a type for the slice state
interface CreateCommentState {
  status: "idle" | "loading" | "failed" | "success";
  error: any | undefined;
}

// Define the initial state using that type
const initialState: CreateCommentState = {
  status: "idle",
  error: undefined,
};

export const createComment = createAsyncThunk(
  "comment",
  async (params: { post: string; content: any }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/api/comment`, {
        post: params.post,
        content: params.content,
      });
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const createCommentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    clearCreateCommentState: (state) => {
      state.status = "idle";
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.error = undefined;
        state.status = "loading";
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(createComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addDefaultCase((state) => {
        state.status = "idle";
        state.error = undefined;
      });
  },
});

export const { clearCreateCommentState } = createCommentSlice.actions;

export const selectCreateCommentStatus = (state: RootState) =>
  state.createComment.status;
export const selectCreateCommentError = (state: RootState) =>
  state.createComment.error;

export default createCommentSlice.reducer;
