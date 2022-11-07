import React, { useState } from "react";
import moment from "moment";
import { IoCloseOutline } from "react-icons/io5";
import { MdEditNote } from "react-icons/md";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";

import classes from "./Post.module.scss";

// Redux
import { useDispatch } from "react-redux";
// Action for updating Redux State
import { deleteOne, deletePost } from "../../../redux/reducers/postsSlice";

const { post_card, close_btn, edit_btn, like_btn, details } = classes;

const Post = ({ post }) => {
  const [postLiked, setPostLiked] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const dispatch = useDispatch();

  const onDeletePostClicked = () => {
    if (window.confirm("Sure to Delete this post?") == true) {
      // 笔记：需要做两件事
      const selectedId = post._id;
      // 1. delete from redux store, update the global state. Synchronously
      // 这里面deleteOne(action.payload)
      dispatch(deleteOne(selectedId));
      // 2. delete from database, Asynchronously
      const requestBody = { postId: selectedId };
      dispatch(deletePost(requestBody)).unwrap();
    } else {
      return;
    }
  };

  const onEditPostClicked = () => {};

  return (
    <div
      className={post_card}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isHover && (
        <MdEditNote className={edit_btn} onClick={onEditPostClicked} />
      )}
      {isHover && (
        <IoCloseOutline className={close_btn} onClick={onDeletePostClicked} />
      )}

      <img src={post.selectedFile} alt="post.selectedFile" />
      <div className={details}>
        <h3>{post.title}</h3>
        <p>
          {post.content?.slice(0, 40)}
          {post.content?.length > 40 && "..."}
        </p>
        <p>{post._id}</p>
        <span>
          By : {post.creator}, {moment(post.createdAt).fromNow()}
        </span>
        <p>
          {postLiked ? (
            <AiFillLike
              className={like_btn}
              onClick={() => setPostLiked((prev) => !prev)}
            />
          ) : (
            <AiOutlineLike
              className={like_btn}
              onClick={() => setPostLiked((prev) => !prev)}
            />
          )}
          : {post.likeCount}
        </p>
      </div>
    </div>
  );
};

export default Post;
