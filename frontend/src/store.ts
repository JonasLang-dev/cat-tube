import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import currentUserReduce from "./features/auth/currentUserSlice";
import signUpReducer from "./features/auth/signUpSlice";
import restEmailReducer from "./features/email/restSlice";
import resetPasswordReducer from "./features/users/resetPasswordSlice";
import postReducer from "./features/post/postSlice";
import postDetailReducer from "./features/post/postDetailSlice";
import userPostReducer from "./features/post/userPostSlice";
import adminPostReducer from "./features/post/adminPostSlice";
import adminUserReducer from "./features/users/adminUserSlice";
import adminAuthReducer from "./features/auth/adminAuthSlice";
import removePostReducer from "./features/post/removePostSlice";
import adsReducer from "./features/ads/adsSlice";
import adminRemovePostReducer from "./features/post/adminRemovePostSlice";
import adminUpdatePostReducer from "./features/post/adminUpdatePostSlice";
import adminCateReducer from "./features/category/adminCateSlice";
import adminBanReducer from "./features/users/adminBanSlice";
import adminActiveReducer from "./features/users/adminActiveSlice";
import adminDelegateReducer from "./features/users/adminDelegateSlice";
import adminRevokeReducer from "./features/users/adminRevokeSlice";
import adminAuthRemoveReducer from "./features/auth/adminRemoveSlice";
import adminActivePreReducer from "./features/users/adminPriceSlice";
import adminInactivePreReducer from "./features/users/adminCancelPriceSlice";
import removeAdReducer from "./features/ads/removeAdSlice";
import postsReducer from "./features/post/postsSlice";
import addCateReducer from "./features/category/addCateSlice";
import removeCateReducer from "./features/category/removeCateSlice";
import commentReducer from "./features/comment/commentSlice";
import createCommentReducer from "./features/comment/createCommentSlice";

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
    postDetail: postDetailReducer,
    adminUser: adminUserReducer,
    adminAuth: adminAuthReducer,
    removePost: removePostReducer,
    ads: adsReducer,
    adminRemovePost: adminRemovePostReducer,
    adminUpdatePost: adminUpdatePostReducer,
    adminCategory: adminCateReducer,
    adminBan: adminBanReducer,
    adminActive: adminActiveReducer,
    adminRevoke: adminRevokeReducer,
    adminDelegate: adminDelegateReducer,
    adminAuthRemove: adminAuthRemoveReducer,
    adminActivePre: adminActivePreReducer,
    adminInactivePre: adminInactivePreReducer,
    removeAd: removeAdReducer,
    posts: postsReducer,
    addCate: addCateReducer,
    removeCate: removeCateReducer,
    comment: commentReducer,
    createComment: createCommentReducer,
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
