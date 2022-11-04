import React from "react";
import classes from "./Posts.module.scss";
import Post from "./Post/Post";

// Redux
import { useSelector, useDispatch } from "react-redux";


const Posts = () => {

  const { posts } = useSelector((state) => state.posts);
  return (
    <div>
      <h1 className={classes.header}>Posts header</h1>
      {posts && posts.map((post, index) =><Post post={post} key={index}/>)}
      
    </div>
  );
};

export default Posts;
