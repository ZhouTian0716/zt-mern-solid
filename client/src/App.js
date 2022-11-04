import React, { useState, useEffect } from "react";
import Posts from "./components/Posts/Posts";
import PostModal from "./components/Modals/PostModal";
import "./App.scss";
import logo from "./images/logo.png";

// Redux
import { useSelector, useDispatch } from "react-redux";


const App = () => {
  const { posts } = useSelector((state) => state.posts);
  // const [posts, setPosts] = useState([]);

  return (
    <>
      <div className="flex-col">
        <div className="app_bar">
          <h1 className="name">Memories</h1>
          <img className="logo" src={logo} alt="logo" />
        </div>

        <div className="flex">
          <PostModal />
          <Posts />
        </div>
      </div>
    </>
  );
};

export default App;
