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

export const removePost = createAsyncThunk(
  "post/remove",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/posts/${id}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removePostSlice = createSlice({
  name: "post/remove",
  initialState,
  reducers: {
    clearRemovePostState: (state) => {
      state.status = "idle";
      state.error = undefined;
      state.data = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removePost.pending, (state) => {
        state.error = undefined;
        state.status = "loading";
      })
      .addCase(removePost.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload.data;
      })
      .addCase(removePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addDefaultCase((state) => {
        state.status = "idle";
        state.error = undefined;
      });
  },
});

export const { clearRemovePostState } = removePostSlice.actions;

export const selectRemovePostStatus = (state: RootState) =>
  state.removePost.status;
export const selectRemovePostError = (state: RootState) =>
  state.removePost.error;
export const selectRemovePostData = (state: RootState) => state.removePost.data;

export default removePostSlice.reducer;
