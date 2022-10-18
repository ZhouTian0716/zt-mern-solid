import React from "react";
import classes from "./Posts.module.scss";
import Post from "./Post/Post";

const Posts = () => {
  return (
    <div>
      <h1 className={classes.header}>Posts header</h1>
      <Post />
    </div>
  );
};

export default Posts;
