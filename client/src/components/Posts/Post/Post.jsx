import React from "react";
import classes from "./Post.module.scss";

const Post = ({ post }) => {
  return (
    <>
      <div>title : {post.title}</div>
      <div>content : {post.content}</div>
      <div>creator : {post.creator}</div>
      <div>{post.public ? "public" : "private"}</div>
      <div>file : {post.selectedFile}</div>
    </>
  );
};

export default Post;
