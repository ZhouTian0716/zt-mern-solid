import React, { useEffect, useState } from "react";
import { MdOutlinePostAdd } from "react-icons/md";
import { AiOutlineLogin } from "react-icons/ai";
import logo from "../../images/logo.png";

import { Link, useNavigate, useLocation } from "react-router-dom";
import decode from "jwt-decode";

// Redux
import { useDispatch, useSelector } from "react-redux";
// Action for updating Redux State
import { postModalToggle } from "../../redux/reducers/displaySlice";
// Query for getting Redux State
import { getCurrentAccount } from "../../redux/reducers/accountsSlice";

// hook
import { useLogout } from "../../hooks/useLogout";

import classes from "./Navbar.module.scss";

const { app_bar, btn, name, logoImg, avatarImg, userInfo, auth_btn, link } =
  classes;

const Navbar = () => {
  const dispatch = useDispatch();
  const currentAccount = useSelector(getCurrentAccount);
  const navigate = useNavigate();
  const logout = useLogout();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className={app_bar}>
      {currentAccount?.login_account && (
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
      {currentAccount?.login_account ? (
        <>
          <Link
            to={`/dashboard/${currentAccount.login_account._id}`}
            className={`${userInfo} ${link}`}
          >
            <img
              src={`https://zt-image-storage.s3.ap-southeast-2.amazonaws.com/users/${currentAccount.login_account.avatar}.JPG`}
              alt={currentAccount.login_account.first_name}
              className={avatarImg}
            />
            <span>{currentAccount.login_account.first_name}</span>
          </Link>

          <Link to="/" className={link}>
            <div
              className={auth_btn}
              onClick={handleLogout}
            >
              <AiOutlineLogin /> <span>Log out</span>
            </div>
          </Link>
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
