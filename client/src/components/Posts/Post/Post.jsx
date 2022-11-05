import React from "react";
import classes from "./Post.module.scss";
import moment from 'moment';

const {
  post_card
} = classes;

const Post = ({ post }) => {
  const postMessage=post.content
  
  return (
    <div className={post_card}>
      <img src={post.selectedFile} alt="post.selectedFile" />
      <h3>{post.title}</h3>
      <p>{postMessage}</p>
      <span>By : {post.creator}, {moment(post.createdAt).fromNow()}</span>
     
      
    </div>
  );
};

export default Post;
