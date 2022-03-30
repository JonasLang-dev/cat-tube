import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../request";
import type { RootState } from "../../store";

// Define a type for the slice state
interface AuthState {
  status: "idle" | "loading" | "failed" | "success";
  error: Array<any> | { message: string } | undefined;
  token: {} | null | undefined;
}

// Define the initial state using that type
const initialState: AuthState = {
  status: "idle",
  error: undefined,
  token: undefined,
};

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (
    user: { email: string | null; password: string | null },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(`/api/session`, user);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.accessToken}`;
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response.data || [{ message: "Unknown error" }]
      );
    }
  }
);

export const authSlice = createSlice({
  name: "auth/signIn",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.status = "idle";
      state.error = undefined;
      state.token = undefined;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.error = undefined;
        state.token = undefined;
        state.status = "loading";
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = "success";
        state.token = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as Array<any>;
        state.token = undefined;
      })
      .addDefaultCase((state) => {
        state.status = "idle";
        state.error = undefined;
        state.token = undefined;
      });
  },
});

export const { clearAuthState } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
