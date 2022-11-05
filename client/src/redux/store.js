import { configureStore } from "@reduxjs/toolkit";
import displayReducer from "./reducers/displaySlice";
import postsReducer from "./reducers/postsSlice";

export const store = configureStore({
  reducer: { display: displayReducer, posts: postsReducer },
});
