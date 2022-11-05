import React from "react";
import classes from "./Posts.module.scss";
import Post from "./Post/Post";

// Redux
import { useSelector } from "react-redux";
import {
  selectAllPosts,
  getPostsStatus,
} from "../../redux/reducers/postsSlice";

const Posts = () => {

  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  // console.log(postStatus);

  return (
    <div>
      {postStatus === "loading" ? (
        <h1 className={classes.header}>Posts loading</h1>
      ) : (
       posts.map((post, index) => <Post post={post} key={index} />)
      )}
      
    </div>
  );
};

export default Posts;
