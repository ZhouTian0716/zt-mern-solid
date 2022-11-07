import React from "react";
import { MdOutlinePostAdd } from "react-icons/md";
import { AiOutlineLogin } from "react-icons/ai";
import logo from "../../images/logo.png";

// Redux
import { useDispatch } from "react-redux";
// Action for updating Redux State
import { postModalToggle } from "../../redux/reducers/displaySlice";

import classes from "./Navbar.module.scss";

const { app_bar, btn, name, logoImg } = classes;

const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <div className={app_bar}>
      <MdOutlinePostAdd
        className={btn}
        onClick={() => {
          dispatch(postModalToggle());
        }}
      />
      <span className={name}>
        Memories <img className={logoImg} src={logo} alt="logo" />
      </span>
      <AiOutlineLogin className={btn} />
    </div>
  );
};

export default Navbar;
