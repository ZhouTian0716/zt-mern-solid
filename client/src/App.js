import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/globals.scss";

// Component imports
import Navbar from "./components/Navbar/Navbar";
import PostModal from "./components/Modals/PostModal";
// Page inports
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import Dashboard from "./pages/Dashboard/Dashboard";

// Redux Hooks
import { useSelector } from "react-redux";
// Query for getting Redux State
import { postModalStatus } from "./redux/reducers/displaySlice";

const App = () => {
  const isPosting = useSelector(postModalStatus);

  return (
    <>
      <BrowserRouter>
       
          <Navbar />

          {isPosting && (
        <div className='underlay'>
          <PostModal />
        </div>
      )}


          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard/:id" element={<Dashboard/>} />
          </Routes>
        
      </BrowserRouter>
    </>
  );
};

export default App;
