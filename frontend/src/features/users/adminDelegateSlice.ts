import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../request";
import type { RootState } from "../../store";

// Define a type for the slice state
interface AdminDelegateState {
  status: "idle" | "loading" | "failed" | "success";
  error: any | undefined;
}

// Define the initial state using that type
const initialState: AdminDelegateState = {
  status: "idle",
  error: undefined,
};

export const adminDelegate = createAsyncThunk(
  "user/delegate",
  async (params: { id: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/admin/user/${params.id}/admin`);
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const adminDelegateSlice = createSlice({
  name: "user/delegate",
  initialState,
  reducers: {
    clearAdminDelegateState: (state: AdminDelegateState) => {
      state.status = "idle";
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminDelegate.pending, (state) => {
        state.error = undefined;
        state.status = "loading";
      })
      .addCase(adminDelegate.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(adminDelegate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addDefaultCase((state) => {
        state.status = "idle";
        state.error = undefined;
      });
  },
});

export const { clearAdminDelegateState } = adminDelegateSlice.actions;

export const selectAdminDelegateStatus = (state: RootState) =>
  state.adminDelegate.status;
export const selectAdminDelegateError = (state: RootState) =>
  state.adminDelegate.error;

export default adminDelegateSlice.reducer;
