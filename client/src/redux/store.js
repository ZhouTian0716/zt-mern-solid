import { configureStore } from "@reduxjs/toolkit";
import displayReducer from "./reducers/displaySlice";
import postsReducer from "./reducers/postsSlice";
import accountsReducer from "./reducers/accountsSlice";

export const store = configureStore({
  reducer: {
    display: displayReducer,
    posts: postsReducer,
    accounts: accountsReducer,
  },
});
