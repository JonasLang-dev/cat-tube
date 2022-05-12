import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../request";
import type { RootState } from "../../store";

// Define a type for the slice state
interface UserPostState {
  status: "idle" | "loading" | "failed" | "success";
  error: any | undefined;
  data: any | undefined;
}

// Define the initial state using that type
const initialState: UserPostState = {
  status: "idle",
  error: undefined,
  data: undefined,
};

export const userPost = createAsyncThunk(
  "post/user",
  async (data, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/posts/private`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userPostSlice = createSlice({
  name: "post/user",
  initialState,
  reducers: {
    clearUserPostState: (state: UserPostState) => {
      state.status = "idle";
      state.error = undefined;
      state.data = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userPost.pending, (state) => {
        state.error = undefined;
        state.status = "loading";
      })
      .addCase(userPost.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload.data;
      })
      .addCase(userPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addDefaultCase((state) => {
        state.status = "idle";
        state.error = undefined;
      });
  },
});

export const { clearUserPostState } = userPostSlice.actions;

export const selectUserPostStatus = (state: RootState) => state.userPost.status;
export const selectUserPostError = (state: RootState) => state.userPost.error;
export const selectUserPostData = (state: RootState) => state.userPost.data;

export default userPostSlice.reducer;
