import React from "react";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import "./App.scss";
import logo from "./images/logo.png";

const App = () => {
  return (
    <>
      <div className="container">
        <div className="app_bar">
          <h1 className="name">Memories</h1>
          <img className="logo" src={logo} alt="logo" />
        </div>
        
      </div>
      <Posts />
      <Form />
    </>
  );
};

export default App;
