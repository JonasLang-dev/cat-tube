import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../request";
import type { RootState } from "../../store";

// Define a type for the slice state
interface AdminActiveState {
  status: "idle" | "loading" | "failed" | "success";
  error: any | undefined;
}

// Define the initial state using that type
const initialState: AdminActiveState = {
  status: "idle",
  error: undefined,
};

export const adminActive = createAsyncThunk(
  "user/active",
  async (params: { id: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/admin/user/${params.id}`);
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const adminActiveSlice = createSlice({
  name: "user/active",
  initialState,
  reducers: {
    clearAdminActiveState: (state: AdminActiveState) => {
      state.status = "idle";
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminActive.pending, (state) => {
        state.error = undefined;
        state.status = "loading";
      })
      .addCase(adminActive.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(adminActive.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addDefaultCase((state) => {
        state.status = "idle";
        state.error = undefined;
      });
  },
});

export const { clearAdminActiveState } = adminActiveSlice.actions;

export const selectAdminActiveStatus = (state: RootState) =>
  state.adminActive.status;
export const selectAdminActiveError = (state: RootState) =>
  state.adminActive.error;

export default adminActiveSlice.reducer;
