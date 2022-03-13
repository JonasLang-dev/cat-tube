import { AsyncThunk, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import Axios from 'axios'
import type { RootState } from '../../store'

// Define a type for the slice state
interface CurrentUserState {
    status: 'idle' | 'loading' | 'failed' | 'success';
    error: Array<object> | string | null
    user: {} | null
}

// Define the initial state using that type
const initialState: CurrentUserState = {
    status: "idle",
    error: null,
    user: {}
}

export const currentUser = createAsyncThunk(
    "user/current",
    async (data, { rejectWithValue }) => {
        try {
            const { data } = await Axios.get("/api/users/current", {
                headers: {
                    "authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
            return data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const currentUsreSlice = createSlice({
    name: 'currentUser',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        clearCurrentUsrState: (state) => {
            state.status = "idle"
            state.error = null
            state.user = {}
        }
        // Use the PayloadAction type to declare the contents of `action.payload`
    },
    extraReducers: (builder) => {
        builder
            .addCase(currentUser.pending, (state) => {
                state.error = null
                state.status = "loading"
            })
            .addCase(currentUser.fulfilled, (state, action) => {
                state.status = 'success';
                state.user = action.payload;
            })
            .addCase(currentUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as Array<object> | string;
                state.user = {}
            })
    }
})


export const { clearCurrentUsrState } = currentUsreSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCurrentUserStatus = (state: RootState) => state.currentUser.user

export default currentUsreSlice.reducer