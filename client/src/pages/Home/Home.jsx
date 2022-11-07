import React from "react";

// Components imports
import Posts from '../../components/Posts/Posts'
import LoadingText from '../../components/Loaders/LoadingText'
import PostModal from "../../components/Modals/PostModal";

// Redux Hooks
import { useSelector } from "react-redux";
// Query for getting Redux State
import { postModalStatus } from "../../redux/reducers/displaySlice";
import { selectAllPosts } from "../../redux/reducers/postsSlice";
// CSS Module classes
import classes from "./Home.module.scss";
const { underlay, app_body } = classes;

const Home = () => {
  const isPosting = useSelector(postModalStatus);
  const posts = useSelector(selectAllPosts);
  return (
    <>
      {isPosting && (
        <div className={underlay}>
          <PostModal />
        </div>
      )}
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
