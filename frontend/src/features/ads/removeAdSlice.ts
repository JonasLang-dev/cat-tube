import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../request";
import { RootState } from "../../store";

interface RemoveAdState {
  status: "idle" | "loading" | "failed" | "success";
  error: string | undefined;
}

const initialState: RemoveAdState = {
  status: "idle",
  error: undefined,
};

export const removeAd = createAsyncThunk(
  "ads/remove",
  async (data: { id: string }, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/admin/ads/${data.id}`);
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const removeAdSlice = createSlice({
  name: "ads/remove",
  initialState,
  reducers: {
    clearRemoveAdState: (state: RemoveAdState) => {
      state.status = "idle";
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeAd.pending, (state) => {
        state.error = undefined;
        state.status = "loading";
      })
      .addCase(removeAd.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(removeAd.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { clearRemoveAdState } = removeAdSlice.actions;

export const selectRemoveAdStatus = (state: RootState) => state.removeAd.status;
export const selectRemoveAdError = (state: RootState) => state.removeAd.error;

export default removeAdSlice.reducer;
