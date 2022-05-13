import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../request";
import { RootState } from "../../store";

interface UserAdsState {
  status: "idle" | "loading" | "failed" | "success";
  error: string | undefined;
  ads: Array<any>;
}

const initialState: UserAdsState = {
  status: "idle",
  error: undefined,
  ads: [],
};

export const userAds = createAsyncThunk(
  "ads/user",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/api/ads`);
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const userAdsSlice = createSlice({
  name: "ads/user",
  initialState,
  reducers: {
    clearUserAdsState: (state: UserAdsState) => {
      state.status = "idle";
      state.error = undefined;
      state.ads = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userAds.pending, (state) => {
        state.error = undefined;
        state.ads = [];
        state.status = "loading";
      })
      .addCase(userAds.fulfilled, (state, action) => {
        state.status = "success";
        state.ads = action.payload;
      })
      .addCase(userAds.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { clearUserAdsState } = userAdsSlice.actions;

export const selectUserAdsStatus = (state: RootState) => state.userAds.status;
export const selectUserAdsError = (state: RootState) => state.userAds.error;
export const selectUserAdsData = (state: RootState) => state.userAds.ads;

export default userAdsSlice.reducer;
