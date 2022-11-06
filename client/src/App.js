import React, { useState, useEffect } from "react";
import Posts from "./components/Posts/Posts";
import PostModal from "./components/Modals/PostModal";
import "./App.scss";
import logo from "./images/logo.png";
import { MdOutlinePostAdd } from "react-icons/md";
import { AiOutlineLogin } from "react-icons/ai";

// Redux Hooks
import { useSelector, useDispatch } from "react-redux";
// Query for getting Redux State
import { postModalStatus } from "./redux/reducers/displaySlice";
import { selectAllPosts } from "./redux/reducers/postsSlice";
// Action for updating Redux State
import { postModalToggle } from "./redux/reducers/displaySlice";

// Component imports
import LoadingText from "./components/Loaders/LoadingText";

const App = () => {
  const dispatch = useDispatch();
  const isPosting = useSelector(postModalStatus);
  const posts = useSelector(selectAllPosts);
  // console.log(posts);

  return (
    <>
      <div className="app">
        <div className="app_bar">
          <MdOutlinePostAdd
            className="btn"
            onClick={() => {
              dispatch(postModalToggle());
            }}
          />
          <span className="name">
            Memories <img className="logo" src={logo} alt="logo" />
          </span>

          <AiOutlineLogin className="btn" />
        </div>
        {isPosting && <div className="underlay"><PostModal className="post_modal" /></div>}
        <div className="app_body">
          {posts ? (
            <Posts posts={posts} />
          ) : (
            <LoadingText message={"Loading Posts"} />
          )}
        </div>
      </div>
    </>
  );
};

export default App;
