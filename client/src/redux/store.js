import { configureStore } from "@reduxjs/toolkit";
import displayReducer from "./reducers/displaySlice";
import postsReducer from "./reducers/postsSlice";
import authReducer from "./reducers/authSlice";

export const store = configureStore({
  reducer: { display: displayReducer, posts: postsReducer, auth: authReducer },
});
