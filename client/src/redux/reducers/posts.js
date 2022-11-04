import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
  posts: ['a','b','c'],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(POSTS_URL);
    return response.data;
  } catch (err) {
    return err.message;
  }
});

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // getAllPosts: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   console.log(state);
    //   return state;
    // },
    createOne: (state, action) => {
      state.posts.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {createOne} = postsSlice.actions;

export default postsSlice.reducer;
