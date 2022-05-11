import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../request";
import type { RootState } from "../../store";

// Define a type for the slice state
interface CommentState {
  status: "idle" | "loading" | "failed" | "success";
  error: any | undefined;
  data: any | undefined;
}

// Define the initial state using that type
const initialState: CommentState = {
  status: "idle",
  error: undefined,
  data: undefined,
};

export const comment = createAsyncThunk(
  "comment",
  async (param: { id: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/comment/${param.id}/post`);
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    clearCommentState: (state) => {
      state.status = "idle";
      state.error = undefined;
      state.data = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(comment.pending, (state) => {
        state.error = undefined;
        state.status = "loading";
      })
      .addCase(comment.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(comment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addDefaultCase((state) => {
        state.status = "idle";
        state.error = undefined;
      });
  },
});

export const { clearCommentState } = commentSlice.actions;

export const selectCommentStatus = (state: RootState) => state.comment.status;
export const selectCommentError = (state: RootState) => state.comment.error;
export const selectCommentData = (state: RootState) => state.comment.data;

export default commentSlice.reducer;
