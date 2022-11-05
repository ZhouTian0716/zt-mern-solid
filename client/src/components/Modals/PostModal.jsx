import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { FaMobileAlt } from "react-icons/fa";
import {
  MdAddPhotoAlternate,
  MdOutlineEmojiEmotions,
  MdLocationOn,
} from "react-icons/md";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { BsFillFileImageFill } from "react-icons/bs";
import { TiUserAdd } from "react-icons/ti";
import FileBase from "react-file-base64";

// Redux
import {createOne, addNewPost} from '../../redux/reducers/postsSlice'
import { useDispatch } from "react-redux";

// CSS Module classes
import classes from "./PostModal.module.scss";
const {
  title,
  form,
  background_gray,
  close_btn,
  userImg,
  profile,
  select,
  post_input,
  img_dialog,
  functions,
  addOns,
  post_btn,
  add_from_device,
  photo_area,
  cancel_btn,
  upload_btn,
} = classes;

const userImageUrl =
  "https://zt-image-storage.s3.ap-southeast-2.amazonaws.com/users/18.JPG";
const PostModal = () => {
  const [isAddingPhoto, setIsAddingPhoto] = useState(true);
  const [postData, setPostData] = useState({
    creator: "Joe Tian",
    title: "",
    content: "",
    public: "true",
    selectedFile: "",
  });

  const dispatch=useDispatch()

  const clearInputs = () => {};

  const handleSubmit = (e) => {
    // 笔记：需要做两件事
    // 1. post to redux store, update the global state. Synchronously
    e.preventDefault();
    console.log("hi");
    console.log(postData);
    dispatch(createOne(postData))
    // 2. post to database, Asynchronously
    dispatch(addNewPost(postData)).unwrap()
  };

  return (
    <form className={form} onSubmit={handleSubmit}>
      <IoCloseOutline className={close_btn} />
      <div className={title}>Create Post</div>
      <div className={profile}>
        <img src={userImageUrl} alt={"me"} className={userImg} />
        <div>
          <div>Joe Tian</div>
          <select
            name=""
            id=""
            className={select}
            value={postData.private}
            onChange={(e) => {
              setPostData({ ...postData, public: e.target.value });
            }}
          >
            <option value="true">Public</option>
            <option value="false">Private</option>
          </select>
        </div>
      </div>
      <input
        className={post_input}
        placeholder="Your post title"
        value={postData.title}
        // Learn the way to set a state object correctly
        onChange={(e) => {
          setPostData({ ...postData, title: e.target.value });
        }}
      />
      <textarea
        className={post_input}
        rows="5"
        placeholder="What's on your mind?"
        value={postData.content}
        // Learn the way to set a state object correctly
        onChange={(e) => {
          setPostData({ ...postData, content: e.target.value });
        }}
      />
      {isAddingPhoto && (
        <div className={img_dialog}>
          <div className={`${background_gray} ${photo_area}`}>
            <IoCloseOutline
              className={cancel_btn}
              onClick={() => {
                setIsAddingPhoto(false);
              }}
            />
            <MdAddPhotoAlternate className={upload_btn} />
            <p>Add photos</p>
            <FileBase
              type="file"
              multiple={false}
              // To Notice here need to Destructure base64, in order to save the correct detail into selectedFile
              onDone={({base64}) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
          </div>
          <div className={`${background_gray} ${add_from_device}`}>
            <FaMobileAlt />
            <span>Add from your mobile</span>
            <button>Add</button>
          </div>
        </div>
      )}

      <div className={addOns}>
        <span>Add to your post</span>
        <span className={functions}>
          <BsFillFileImageFill
            color="green"
            onClick={() => {
              setIsAddingPhoto(true);
            }}
          />
          <TiUserAdd color="blue" />
          <MdOutlineEmojiEmotions color="orange" />
          <MdLocationOn color="red" />
          <HiOutlineDotsHorizontal />
        </span>
      </div>
      <button className={post_btn} type="submit">
        Post
      </button>
      {/* <button type="button" disabled>Click Me!</button> */}
    </form>
  );
};

export default PostModal;
