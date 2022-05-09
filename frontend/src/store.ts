import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import currentUserReduce from "./features/auth/currentUserSlice";
import signUpReducer from "./features/auth/signUpSlice";
import restEmailReducer from "./features/email/restSlice";
import resetPasswordReducer from "./features/users/resetPasswordSlice";
import postReducer from "./features/post/postSlice";
import userPostReducer from "./features/post/userPostSlice";
import adminPostReducer from "./features/post/adminPostSlice";
import adminUserReducer from "./features/users/adminUserSlice";
import adminAuthReducer from "./features/auth/adminAuthSlice";
import removePostReducer from "./features/post/removePostSlice";
import adsReducer from "./features/ads/adsSlice";
import adminRemovePostReducer from "./features/post/adminRemovePostSlice";
import adminUpdatePostReducer from "./features/post/adminUpdatePostSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    signUp: signUpReducer,
    currentUser: currentUserReduce,
    emailForPass: restEmailReducer,
    resetPassword: resetPasswordReducer,
    adminPost: adminPostReducer,
    userPost: userPostReducer,
    post: postReducer,
    adminUser: adminUserReducer,
    adminAuth: adminAuthReducer,
    removePost: removePostReducer,
    ads: adsReducer,
    adminRemovePost: adminRemovePostReducer,
    adminUpdatePost: adminUpdatePostReducer,
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
