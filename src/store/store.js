import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import postsReducer from "./slices/postsSlice";
import notificationsReducer from "./slices/notificationsSlice";
import directMessagesReducer from "./slices/directMessagesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    notifications: notificationsReducer,
    directMessages: directMessagesReducer,
  },
});
