import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import currentUserReduce from "./features/auth/currentUserSlice";
import signUpReducer from "./features/auth/signUpSlice";
import refreshTokenReducer from "./features/auth/refreshTokenSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    signUp: signUpReducer,
    currentUser: currentUserReduce,
    refreshToken: refreshTokenReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
