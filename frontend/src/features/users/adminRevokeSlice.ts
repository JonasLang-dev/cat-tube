import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../request";
import type { RootState } from "../../store";

// Define a type for the slice state
interface AdminRevokeState {
  status: "idle" | "loading" | "failed" | "success";
  error: any | undefined;
}

// Define the initial state using that type
const initialState: AdminRevokeState = {
  status: "idle",
  error: undefined,
};

export const adminRevoke = createAsyncThunk(
  "user/revoke",
  async (params: { id: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/admin/user/${params.id}/admin`);
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const adminRevokeSlice = createSlice({
  name: "user/revoke",
  initialState,
  reducers: {
    clearAdminRevokeState: (state) => {
      state.status = "idle";
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminRevoke.pending, (state) => {
        state.error = undefined;
        state.status = "loading";
      })
      .addCase(adminRevoke.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(adminRevoke.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addDefaultCase((state) => {
        state.status = "idle";
        state.error = undefined;
      });
  },
});

export const { clearAdminRevokeState } = adminRevokeSlice.actions;

export const selectAdminRevokeStatus = (state: RootState) =>
  state.adminRevoke.status;
export const selectAdminRevokeError = (state: RootState) =>
  state.adminRevoke.error;

export default adminRevokeSlice.reducer;
