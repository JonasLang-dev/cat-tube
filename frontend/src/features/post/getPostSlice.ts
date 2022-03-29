import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../request";
import type { RootState } from "../../store";

// Define a type for the slice state
interface SignUpState {
  status: "idle" | "loading" | "failed" | "success";
  error: any | undefined;
  data: any | undefined;
}

// Define the initial state using that type
const initialState: SignUpState = {
  status: "idle",
  error: undefined,
  data: undefined,
};

export const getPost = createAsyncThunk(
  "post",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/posts/${id}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPostSlice = createSlice({
  name: "posts/user",
  initialState,
  reducers: {
    clearGetPostState: (state) => {
      state.status = "idle";
      state.error = undefined;
      state.data = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPost.pending, (state) => {
        state.error = undefined;
        state.status = "loading";
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addDefaultCase((state) => {
        state.status = "idle";
        state.error = undefined;
      });
  },
});

export const { clearGetPostState } = getPostSlice.actions;

export const selectGetPostStatus = (state: RootState) => state.getPost.status;
export const selectGetPostError = (state: RootState) => state.getPost.error;
export const selectGetPostData = (state: RootState) => state.getPost.data;

export default getPostSlice.reducer;
