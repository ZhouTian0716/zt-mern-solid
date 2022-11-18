import React, { useEffect, useState } from "react";
import { MdOutlinePostAdd } from "react-icons/md";
import { AiOutlineLogin } from "react-icons/ai";
import logo from "../../images/logo.png";

import { Link, useNavigate, useLocation } from "react-router-dom";
import decode from "jwt-decode";

// Redux
import { useDispatch } from "react-redux";
// Action for updating Redux State
import { postModalToggle } from "../../redux/reducers/displaySlice";

import classes from "./Navbar.module.scss";

const { app_bar, btn, name, logoImg, avatarImg, userInfo, auth_btn, link } =
  classes;

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const logout = () => {
    // dispatch({ type: actionType.LOGOUT });
    setUser(null);
    localStorage.removeItem("profile");
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
    // console.log(user);
  }, []);

  // useEffect(() => {
  //   const token = user?.token;
  //   if (token) {
  //     const decodedToken = decode(token);

  //     if (decodedToken.exp * 1000 < new Date().getTime()) logout();
  //   }

  //   setUser(JSON.parse(localStorage.getItem("profile")));
  // }, [location]);

  return (
    <div className={app_bar}>
      {user?.account && (
        <MdOutlinePostAdd
          className={btn}
          onClick={() => {
            dispatch(postModalToggle());
          }}
        />
      )}

      <Link to="/" className={link}>
        <span className={name}>
          Memories <img className={logoImg} src={logo} alt="logo" />
        </span>
      </Link>
      {user?.account ? (
        <>
          <Link
            to={`/account/${user.account._id}`}
            className={`${userInfo} ${link}`}
          >
            <img
              src={`https://zt-image-storage.s3.ap-southeast-2.amazonaws.com/users/${user.account.avatar}.JPG`}
              alt={user.account.first_name}
              className={avatarImg}
            />
            <span>{user.account.first_name}</span>
          </Link>

          <div className={auth_btn} onClick={logout}>
            <AiOutlineLogin /> <span>Log out</span>
          </div>
        </>
      ) : (
        <Link to="/auth" className={link}>
          <div className={auth_btn}>
            <AiOutlineLogin /> <span>Log In</span>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
