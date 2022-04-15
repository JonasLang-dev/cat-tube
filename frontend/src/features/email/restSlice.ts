import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../request";
import { RootState } from "../../store";

// Define a type for the slice state
interface EmailState {
  status: "idle" | "loading" | "failed" | "success";
  error: Array<any> | { message: string } | undefined;
}

// Define the initial state using that type
const initialState: EmailState = {
  status: "idle",
  error: undefined,
};

export const emailForPass = createAsyncThunk(
  "email/password/new",
  async (user: { email: string }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        `/api/users/forgotpassword`,
        user
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const emailForPassSlice = createSlice({
  name: "emailForPass",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    clearEmailForPassState: (state) => {
      state.status = "idle";
      state.error = undefined;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
  },
  extraReducers: (builder) => {
    builder
      .addCase(emailForPass.pending, (state) => {
        state.error = undefined;
        state.status = "loading";
      })
      .addCase(emailForPass.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(emailForPass.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as Array<any>;
      })
      .addDefaultCase((state) => {
        state.status = "idle";
        state.error = undefined;
      });
  },
});

export const { clearEmailForPassState } = emailForPassSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectEmailForPassStatus = (state: RootState) =>
  state.emailForPass.status;
export const selectEmailForPassErrors = (state: RootState) =>
  state.emailForPass.error;

export default emailForPassSlice.reducer;
