import React from "react";
import moment from "moment";
import { IoCloseOutline } from "react-icons/io5";

import classes from "./Post.module.scss";

// Redux
import { useDispatch } from "react-redux";
// Action for updating Redux State
import { deleteOne, deletePost } from "../../../redux/reducers/postsSlice";

const { post_card, close_btn } = classes;

const Post = ({ post }) => {
  const dispatch = useDispatch();

  const onDeletePostClicked = () => {
    // 笔记：需要做两件事
    const selectedId = post._id;
    // 1. delete from redux store, update the global state. Synchronously
    // 这里面deleteOne(action.payload)
    dispatch(deleteOne(selectedId));
    // 2. delete from database, Asynchronously
    const requestBody = { postId: selectedId };
    dispatch(deletePost(requestBody)).unwrap();
  };

  return (
    <div className={post_card}>
      <IoCloseOutline className={close_btn} onClick={onDeletePostClicked} />
      <img src={post.selectedFile} alt="post.selectedFile" />
      <h3>{post.title}</h3>
      <p>
        {post.content?.slice(0, 40)}
        {post.content?.length > 40 && "..."}
      </p>

      <span>
        By : {post.creator}, {moment(post.createdAt).fromNow()}
      </span>
      <p>{post._id}</p>
    </div>
  );
};

export default Post;
