import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../request";
import type { RootState } from "../../store";

// Define a type for the slice state
interface ChannelState {
  status: "idle" | "loading" | "failed" | "success";
  error: any | undefined;
  data: any | undefined;
}

// Define the initial state using that type
const initialState: ChannelState = {
  status: "idle",
  error: undefined,
  data: undefined,
};

export const channel = createAsyncThunk(
  "channel",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/users/${id}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const channelSlice = createSlice({
  name: "user/admin",
  initialState,
  reducers: {
    clearChannelState: (state: ChannelState) => {
      state.status = "idle";
      state.error = undefined;
      state.data = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(channel.pending, (state) => {
        state.error = undefined;
        state.status = "loading";
      })
      .addCase(channel.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(channel.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addDefaultCase((state) => {
        state.status = "idle";
        state.error = undefined;
      });
  },
});

export const { clearChannelState } = channelSlice.actions;

export const selectChannelStatus = (state: RootState) => state.channel.status;
export const selectChannelError = (state: RootState) => state.channel.error;
export const selectChannelData = (state: RootState) => state.channel.data;

export default channelSlice.reducer;
