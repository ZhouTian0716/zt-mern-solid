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
// Action for updating Redux State
import { postModalToggle } from "./redux/reducers/displaySlice";

const App = () => {
  const dispatch = useDispatch();
  const isPosting = useSelector(postModalStatus);

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
        {isPosting && <PostModal className="post_modal" />}
        <div className="app_body">
          <Posts />
        </div>
      </div>
    </>
  );
};

export default App;
