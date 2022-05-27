import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../request";
import type { RootState } from "../../store";

// Define a type for the slice state
interface AdminAuthState {
  status: "idle" | "loading" | "failed" | "success";
  error: any | undefined;
  data: any | undefined;
}

// Define the initial state using that type
const initialState: AdminAuthState = {
  status: "idle",
  error: undefined,
  data: undefined,
};

export const adminAuth = createAsyncThunk(
  "auth/admin",
  async (data, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/admin/session`);
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const adminAuthSlice = createSlice({
  name: "auth/admin",
  initialState,
  reducers: {
    clearAdminAuthState: (state: AdminAuthState) => {
      state.status = "idle";
      state.error = undefined;
      state.data = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminAuth.pending, (state) => {
        state.error = undefined;
        state.status = "loading";
      })
      .addCase(adminAuth.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(adminAuth.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addDefaultCase((state) => {
        state.status = "idle";
        state.error = undefined;
      });
  },
});

export const { clearAdminAuthState } = adminAuthSlice.actions;

export const selectAdminAuthStatus = (state: RootState) =>
  state.adminAuth.status;
export const selectAdminAuthError = (state: RootState) => state.adminAuth.error;
export const selectAdminAuthData = (state: RootState) => state.adminAuth.data;

export default adminAuthSlice.reducer;
