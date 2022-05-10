import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../request";
import type { RootState } from "../../store";

// Define a type for the slice state
interface AdminBanState {
  status: "idle" | "loading" | "failed" | "success";
  error: any | undefined;
}

// Define the initial state using that type
const initialState: AdminBanState = {
  status: "idle",
  error: undefined,
};

export const adminBan = createAsyncThunk(
  "user/ban",
  async (params: { id: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/admin/user/${params.id}`);
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const adminBanSlice = createSlice({
  name: "user/ban",
  initialState,
  reducers: {
    clearAdminBanState: (state) => {
      state.status = "idle";
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminBan.pending, (state) => {
        state.error = undefined;
        state.status = "loading";
      })
      .addCase(adminBan.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(adminBan.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addDefaultCase((state) => {
        state.status = "idle";
        state.error = undefined;
      });
  },
});

export const { clearAdminBanState } = adminBanSlice.actions;

export const selectAdminBanStatus = (state: RootState) => state.adminBan.status;
export const selectAdminBanError = (state: RootState) => state.adminBan.error;

export default adminBanSlice.reducer;
