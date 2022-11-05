import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./reducers/counter";
import postsReducer from "./reducers/postsSlice";

export const store = configureStore({
  reducer: { counter: counterReducer, posts: postsReducer },
});
