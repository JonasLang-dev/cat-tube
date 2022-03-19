import {
  createAsyncThunk,
  createSlice
} from "@reduxjs/toolkit";
import axiosInstance from "../../request";
import { RootState } from "../../store";

// Define a type for the slice state
interface ResetPasswordState {
  status: "idle" | "loading" | "failed" | "success";
  error: Array<any> | { message: string } | undefined;
}

// Define the initial state using that type
const initialState: ResetPasswordState = {
  status: "idle",
  error: undefined
};

export const resetPassword = createAsyncThunk(
  "email/password/new",
  async (
    value: { id: string, passwordResetCode: string, password: string, passwordConfirmation: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosInstance.post(`/api/users/resetpassword/${value.id}/${value.passwordResetCode}`, {
        password: value.password,
        passwordConfirmation: value.passwordConfirmation
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetPasswordSlice = createSlice({
  name: "resetPassword",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    clearResetPasswordState: (state) => {
      state.status = "idle";
      state.error = undefined;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.error = undefined;
        state.status = "loading";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as Array<any>;
      })
      .addDefaultCase((state) => {
        state.status = "idle";
        state.error = undefined;
      });
  },
});

export const { clearResetPasswordState } = resetPasswordSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectResetPasswordStatus = (state: RootState) => state.resetPassword.status;
export const selectResetPasswordErrors = (state: RootState) => state.resetPassword.error;

export default resetPasswordSlice.reducer;
