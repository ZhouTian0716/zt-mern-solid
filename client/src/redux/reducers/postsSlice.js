import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { API } from "../../api/index";


const Posts_Route = "/posts";

const initialState = {
  posts: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Take away: Learn how to use createAsyncThunk!!!!
// first arg: the prefix string for the generated action type
// second arg: payload creator call back
// 💥💥payload returned and created for updating redux state at fetchPosts.fullfilled 💥💥
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  
  const response = await API.get(Posts_Route);
  return response.data;
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (postData) => {
    const response = await API.post(Posts_Route, postData);
    // console.log(response.data);
    return response.data;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (requestBody) => {
    // console.log(requestBody);
    // 笔记：axios delete method, requestBody needs to be set like this
    const response = await API.delete(Posts_Route, { data: requestBody });
    console.log(response.data);
  }
);
//////////////////////////////////////////////////////////////////////////////////

// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes
// ONLY WORKS INSIDE OF createSlice
export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    createOne: (state, action) => {
      console.log(action.payload);
      state.posts.push(action.payload);
    },
    deleteOne: (state, action) => {
      const filteredPosts = state.posts.filter(
        (post) => post._id !== action.payload
      );
      state.posts = filteredPosts;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "fetching";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        const loadedPosts = action.payload;
        // console.log(loadedPosts);

        state.posts = loadedPosts;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(addNewPost.pending, (state, action) => {
        state.status = "uploading";
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.posts.push(action.payload);
        state.posts.unshift(action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const id = action.payload;
        const posts = state.posts.filter((post) => post._id !== id);
        state.posts = posts;
      });
  },
});

// Action creators are generated for each case of reducers
export const { createOne, deleteOne } = postsSlice.actions;

// This is easier for component to call useSelector, if our state shape change in the future
export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;

export default postsSlice.reducer;
