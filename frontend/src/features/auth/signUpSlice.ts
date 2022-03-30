import {
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios from "../../request";
import type { RootState } from "../../store";

// Define a type for the slice state
interface SignUpState {
  status: "idle" | "loading" | "failed" | "success";
  error: any | undefined;
}

// Define the initial state using that type
const initialState: SignUpState = {
  status: "idle",
  error: undefined,
};

export const signUp = createAsyncThunk(
  "user/signUp",
  async (
    user: {
      name: any;
      email: any;
      password: any;
      passwordConfirmation: any;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(`/api/users`, user);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signUpSlice = createSlice({
  name: "user/signUp",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    clearSignUpState: (state) => {
      state.status = "idle";
      state.error = undefined;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.error = undefined;
        state.status = "loading";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addDefaultCase((state) => {
        state.status = "idle";
        state.error = undefined;
      });
  },
});

export const { clearSignUpState } = signUpSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSignUpStatus = (state: RootState) => state.signUp.status;
export const selectSignUpError = (state: RootState) => state.signUp.error;

export default signUpSlice.reducer;
