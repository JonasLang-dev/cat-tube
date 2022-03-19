import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import currentUserReduce from "./features/auth/currentUserSlice";
import signUpReducer from "./features/auth/signUpSlice";
import restEmailReducer from "./features/email/restSlice";
import resetPasswordReducer from "./features/users/resetPasswordSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    signUp: signUpReducer,
    currentUser: currentUserReduce,
    emailForPass: restEmailReducer,
    resetPassword: resetPasswordReducer
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
