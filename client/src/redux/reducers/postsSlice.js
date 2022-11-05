import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
const Posts_Route = "http://localhost:4000/posts";

const initialState = {
  // posts: ['idle','idle'],
  posts: null,
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// first arg: the prefix string for the generated action type
// second arg: payload creator call back
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(Posts_Route);
  return response.data;
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost) => {
    const response = await axios.post(Posts_Route, initialPost);
    console.log(response.data);
    return response.data;
  }
);
//////////////////////////////////////////////////////////////////////////////////

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    // ONLY WORKS INSIDE OF createSlice
    createOne: (state, action) => {
      state.posts.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        const loadedPosts = action.payload;
        console.log(loadedPosts);
        // Add any fetched posts to the array
        state.posts = loadedPosts;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.pending, (state, action) => {
        state.status = "uploading";
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      });
  },
});

// Action creators are generated for each case of reducers
export const { createOne } = postsSlice.actions;

// This is easier for component to call useSelector, if our state shape change in the future
export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;

export default postsSlice.reducer;
