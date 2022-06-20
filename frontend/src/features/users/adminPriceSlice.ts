import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../request";
import type { RootState } from "../../store";

// Define a type for the slice state
interface AdminActivePreState {
  status: "idle" | "loading" | "failed" | "success";
  error: any | undefined;
}

// Define the initial state using that type
const initialState: AdminActivePreState = {
  status: "idle",
  error: undefined,
};

export const adminActivePre = createAsyncThunk(
  "user/premuim/active",
  async (params: { id: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/admin/user/${params.id}/premium`);
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const adminActivePreSlice = createSlice({
  name: "user/premuim/active",
  initialState,
  reducers: {
    clearAdminActivePreState: (state: AdminActivePreState) => {
      state.status = "idle";
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminActivePre.pending, (state) => {
        state.error = undefined;
        state.status = "loading";
      })
      .addCase(adminActivePre.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(adminActivePre.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addDefaultCase((state) => {
        state.status = "idle";
        state.error = undefined;
      });
  },
});

export const { clearAdminActivePreState } = adminActivePreSlice.actions;

export const selectAdminActivePreStatus = (state: RootState) =>
  state.adminActivePre.status;
export const selectAdminActivePreError = (state: RootState) =>
  state.adminActivePre.error;

export default adminActivePreSlice.reducer;
