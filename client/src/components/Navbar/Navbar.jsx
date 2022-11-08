import React from "react";
import { Link } from "react-router-dom";
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
      <Link to="/" style={{ textDecoration: "none" }}>
        <span className={name}>
          Memories <img className={logoImg} src={logo} alt="logo" />
        </span>
      </Link>
      <Link to="/auth">
        <AiOutlineLogin className={btn} />
      </Link>
    </div>
  );
};

export default Navbar;
