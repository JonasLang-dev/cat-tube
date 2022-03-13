import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import authReducer from './features/auth/authSlice';
import currentUserReduce from "./features/auth/currentUserSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        currentUser: currentUserReduce
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>