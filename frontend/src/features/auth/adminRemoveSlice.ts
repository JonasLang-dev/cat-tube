import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../request";
import type { RootState } from "../../store";

// Define a type for the slice state
interface AdminAuthRemoveState {
  status: "idle" | "loading" | "failed" | "success";
  error: any | undefined;
}

// Define the initial state using that type
const initialState: AdminAuthRemoveState = {
  status: "idle",
  error: undefined,
};

export const adminAuthRemove = createAsyncThunk(
  "auth/remove",
  async (params: { id: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/admin/session/${params.id}`);
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const adminAuthRemoveSlice = createSlice({
  name: "auth/remove",
  initialState,
  reducers: {
    clearAdminAuthRemoveState: (state) => {
      state.status = "idle";
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminAuthRemove.pending, (state) => {
        state.error = undefined;
        state.status = "loading";
      })
      .addCase(adminAuthRemove.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(adminAuthRemove.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addDefaultCase((state) => {
        state.status = "idle";
        state.error = undefined;
      });
  },
});

export const { clearAdminAuthRemoveState } = adminAuthRemoveSlice.actions;

export const selectAdminAuthRemoveStatus = (state: RootState) =>
  state.adminAuthRemove.status;
export const selectAdminAuthRemoveError = (state: RootState) =>
  state.adminAuthRemove.error;

export default adminAuthRemoveSlice.reducer;
