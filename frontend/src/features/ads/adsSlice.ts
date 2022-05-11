import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../request";
import { RootState } from "../../store";

interface AdsState {
  status: "idle" | "loading" | "failed" | "success";
  error: string | undefined;
  ads: any | undefined;
}

const initialState: AdsState = {
  status: "idle",
  error: undefined,
  ads: undefined,
};

export const getAds = createAsyncThunk(
  "ads/getAds",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/api/admin/ads`);
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const adsSlice = createSlice({
  name: "ads/getAds",
  initialState,
  reducers: {
    clearAdsState: (state) => {
      state.status = "idle";
      state.error = undefined;
      state.ads = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAds.pending, (state) => {
        state.error = undefined;
        state.ads = undefined;
        state.status = "loading";
      })
      .addCase(getAds.fulfilled, (state, action) => {
        state.status = "success";
        state.ads = action.payload;
      })
      .addCase(getAds.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { clearAdsState } = adsSlice.actions;

export const selectAdsStatus = (state: RootState) => state.ads.status;
export const selectAdsError = (state: RootState) => state.ads.error;
export const selectAds = (state: RootState) => state.ads.ads;

export default adsSlice.reducer;
