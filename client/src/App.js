import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";

// Component imports
import Navbar from "./components/Navbar/Navbar";
// Page inports
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="app">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
