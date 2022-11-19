import React from "react";
// Components imports
import Posts from "../../components/Posts/Posts";
import LoadingText from "../../components/Loaders/LoadingText";

// Redux Hooks
import { useSelector } from "react-redux";
// Query for getting Redux State

import { selectAllPosts } from "../../redux/reducers/postsSlice";

// CSS Module classes
import classes from "./Home.module.scss";
const { app_body } = classes;

const Home = () => {
  const posts = useSelector(selectAllPosts);

  return (
    <>
      <div className={app_body}>
        {posts ? (
          <Posts posts={posts} />
        ) : (
          <LoadingText message={"Loading Posts"} />
        )}
      </div>
    </>
  );
};

export default Home;
