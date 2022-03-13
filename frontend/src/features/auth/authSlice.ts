import { AsyncThunk, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import Axios from 'axios'
import type { RootState } from '../../store'

// Define a type for the slice state
interface AuthState {
    status: 'idle' | 'loading' | 'failed';
    error: Array<object> | null
    token: {} | null
}

// Define the initial state using that type
const initialState: AuthState = {
    status: "idle",
    error: [],
    token: {}

}

export const signIn = createAsyncThunk(
    "auth/signIn",
    async (user: { email: string | null, password: string | null }, { rejectWithValue }) => {
        try {
            const { data } = await Axios.post("/api/session", user)
            return data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const authSlice = createSlice({
    name: 'counter',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {

        // Use the PayloadAction type to declare the contents of `action.payload`
    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state) => {
                state.error = null
                state.token = null
                state.status = "loading"
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.status = 'idle';
                state.token = action.payload;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as Array<object>;
                state.token = null
            })
            .addDefaultCase((state) => {
                state.status = "idle";
                state.error = [];
                state.token = {};
            })
    }
})


// export const { signIn, refreshToken } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAuthStatus = (state: RootState) => state.auth.status

export default authSlice.reducer