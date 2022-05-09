import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../request";
import type { RootState } from "../../store";

// Define a type for the slice state
interface AdminUserState {
  status: "idle" | "loading" | "failed" | "success";
  error: any | undefined;
  data: any | undefined;
}

// Define the initial state using that type
const initialState: AdminUserState = {
  status: "idle",
  error: undefined,
  data: undefined,
};

export const adminUser = createAsyncThunk(
  "user/admin",
  async (data, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/admin/user`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const adminUserSlice = createSlice({
  name: "user/admin",
  initialState,
  reducers: {
    clearAdminUserState: (state) => {
      state.status = "idle";
      state.error = undefined;
      state.data = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminUser.pending, (state) => {
        state.error = undefined;
        state.status = "loading";
      })
      .addCase(adminUser.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(adminUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addDefaultCase((state) => {
        state.status = "idle";
        state.error = undefined;
      });
  },
});

export const { clearAdminUserState } = adminUserSlice.actions;

export const selectAdminUserStatus = (state: RootState) =>
  state.adminPost.status;
export const selectAdminUserError = (state: RootState) => state.adminUser.error;
export const selectAdminUserData = (state: RootState) => state.adminUser.data;

export default adminUserSlice.reducer;
