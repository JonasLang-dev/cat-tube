import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../request";
import type { RootState } from "../../store";

// Define a type for the slice state
interface SearchState {
  status: "idle" | "loading" | "failed" | "success";
  error: any | undefined;
  data: { channels: Array<any>; posts: Array<any> } | undefined;
}

// Define the initial state using that type
const initialState: SearchState = {
  status: "idle",
  error: undefined,
  data: undefined,
};

export const search = createAsyncThunk(
  "search",
  async (search: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/search/${search}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearchState: (state: SearchState) => {
      state.status = "idle";
      state.error = undefined;
      state.data = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(search.pending, (state) => {
        state.error = undefined;
        state.status = "loading";
      })
      .addCase(search.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload.data;
      })
      .addCase(search.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addDefaultCase((state) => {
        state.status = "idle";
        state.error = undefined;
      });
  },
});

export const { clearSearchState } = searchSlice.actions;

export const selectSearchStatus = (state: RootState) => state.search.status;
export const selectSearchError = (state: RootState) => state.search.error;
export const selectSearchData = (state: RootState) => state.search.data;

export default searchSlice.reducer;
