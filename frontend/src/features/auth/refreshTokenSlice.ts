import {
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import Axios from "axios";
import type { RootState } from "../../store";

// Define a type for the slice state
interface RefreshTokenState {
    status: "idle" | "loading" | "failed" | "success";
    error: Array<any> | { message: string } | null;
    token: {} | null;
}

// Define the initial state using that type
const initialState: RefreshTokenState = {
    status: "idle",
    error: [],
    token: {},
};

export const refreshToken = createAsyncThunk(
    "auth/refresh",
    async (
        user,
        { rejectWithValue }
    ) => {
        const refreshToken = localStorage.getItem("refreshToken")
        if (refreshToken) {
            try {
                const { data } = await Axios.post(`/api/session/refresh`, user, {
                    headers: {
                        "x-refresh": localStorage.getItem("refreshToken") as string
                    }
                });
                localStorage.setItem("refreshToken", data.refreshToken);
                return data;
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        } return rejectWithValue([{"message": "Could not refresh token"}])
    }
);

export const refreshTokenSlice = createSlice({
    name: "auth",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        clearRefreshTokenState: (state) => {
            state.status = "idle";
            state.error = null;
            state.token = null;
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
    },
    extraReducers: (builder) => {
        builder
            .addCase(refreshToken.pending, (state) => {
                state.error = null;
                state.token = null;
                state.status = "loading";
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.status = "success";
                state.token = action.payload;
            })
            .addCase(refreshToken.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as Array<any>;
                state.token = null;
            })
            .addDefaultCase((state) => {
                state.status = "idle";
                state.error = [];
                state.token = {};
            });
    },
});

export const { clearRefreshTokenState } = refreshTokenSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectRefreshError = (state: RootState) => state.refreshToken.error;
export const selectRefreshState = (state: RootState) => state.refreshToken.status;

export default refreshTokenSlice.reducer;
