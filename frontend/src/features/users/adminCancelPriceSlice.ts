import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../request";
import type { RootState } from "../../store";

// Define a type for the slice state
interface AdminInactivePreState {
  status: "idle" | "loading" | "failed" | "success";
  error: any | undefined;
}

// Define the initial state using that type
const initialState: AdminInactivePreState = {
  status: "idle",
  error: undefined,
};

export const adminInactivePre = createAsyncThunk(
  "user/premuim/inactive",
  async (params: { id: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `/api/admin/user/${params.id}/premium`
      );
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const adminInactivePreSlice = createSlice({
  name: "user/premuim/inactive",
  initialState,
  reducers: {
    clearAdminInactivePreState: (state) => {
      state.status = "idle";
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminInactivePre.pending, (state) => {
        state.error = undefined;
        state.status = "loading";
      })
      .addCase(adminInactivePre.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(adminInactivePre.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addDefaultCase((state) => {
        state.status = "idle";
        state.error = undefined;
      });
  },
});

export const { clearAdminInactivePreState } = adminInactivePreSlice.actions;

export const selectAdminInactivePreStatus = (state: RootState) =>
  state.adminInactivePre.status;
export const selectAdminInactivePreError = (state: RootState) =>
  state.adminInactivePre.error;

export default adminInactivePreSlice.reducer;
