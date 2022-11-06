import React, { useEffect } from "react";
import classes from "./Posts.module.scss";
import Post from "./Post/Post";

// Redux
import { useSelector } from "react-redux";
import {
  selectAllPosts,
  getPostsStatus,
} from "../../redux/reducers/postsSlice";

const Posts = ({ posts }) => {
  return (
    <div className={classes.container}>
      {posts.map((post, index) => (
        <Post post={post} key={index} />
      ))}
    </div>
  );
};

export default Posts;
