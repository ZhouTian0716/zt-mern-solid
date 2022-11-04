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
  "https://zt-image-storage.s3.ap-southeast-2.amazonaws.com/users/18.JPG?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLXNvdXRoZWFzdC0yIkgwRgIhAPG8aidfKwXsVUbxp0UW2PYHzJk7N34iHS6uV1FxZOkbAiEAhQGMK2%2FbeVLrCoGygRM0ogg07g2FBJVccDTfjJqWO3gq7QIIyf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwyNDIxMjQ1MjY3MzkiDJPpE0QxnqZaZ0rCvCrBAiuRTEy8TyApQOJvmF0FnxSHEUN%2FsNvavwDWGwkS85e6GGTVSr%2B2PVl90eNYrPYCXuARcHr29nkPdqsGtI3eerOGOSJiarJIq%2BeJiKLb5YkjnmcTEexKNzFa0TGpUBJ1Qb2Lwr07WdHf4ZEg2I3L9sVtmA18A3My2BH5hyyi9hYRUPmtTpADt9RvdIH4UjpdK4%2F2FlhB%2F%2BF791Y9K0uO9xCqHSLoRqZOA2FytL1EqIn7ct2wNdG0KWPEiw7WcEixJ%2FQDA0T6kcZJYg%2FjOutMas66fTam0J9xgOVUnlaBnIGjp6%2BKS81m2AD1Sg0gqUAO%2F%2F0MsuaGq20eblvBwEpCoK6DqOE8dnykE1dvH3B%2FCQRFr1bC3DjRKUjKLqXl7uuhIPVO6A2RgCKItXPNPqynVGfW%2Bf7WW99UuNWmsKJnWkr8iTCUsJGbBjqyAqFCF%2FY0Hqh96J48uSVbys0V7GOgEHMe98z4QUHIfoBdkIDYRUKzodrR%2F144qgrEF3HPCGUJ7zP%2FGkRjrt8%2FK%2Byb1N7EpgozSFNRebdABaBY4AuRAEspim1m6EabS5sf24b5cBU9y4aTPObow0J4hYeUP%2BTTu%2BmD%2Bc6fP3TVFoho20XoKWJMCyhP87lrgTke3pKjh1VO98LQwTCjACENzHaheGGAlV66ikSdFX3%2F0Q8hzGxaOPgU141BjtNy6dZbFGUs4XzMISwqCyu8s8ofS5bYjcqHoTbwqEG0k2Aam%2FrZ9sYduNQu6RAr9Iw6RNwTyTYP9N8bd9oF%2BAgDE%2BT6YcNe6Hy7H8J0KixRVI1SLtXr0DSpYWwXPABpwYXmFN5crc4%2BUHE2WLOme%2Fjij4sPMkqBQQ%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20221104T000924Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIATQX57CSJS75MSYM3%2F20221104%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Signature=93036fdf0aa9bf39587e135e5365554450274da0bb75b6007916496e7c9bce24";

const PostModal = () => {
  const [isAddingPhoto, setIsAddingPhoto] = useState(true);
  const [postData, setPostData] = useState({
    creator: "Joe Tian",
    title: "",
    content: "",
    public: true,
    selectedFile: "",
  });

  const clearInputs = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hi");
    console.log(postData);
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
            <option value={true}>Public</option>
            <option value={false}>Private</option>
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
          </div>
          <FileBase
            type="file"
            multiple={false}
            onDone={(base64) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
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
