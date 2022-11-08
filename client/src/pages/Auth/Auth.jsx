import React from "react";
import { FaUserLock } from "react-icons/fa";


import classes from "./Auth.module.scss";

const { auth_container,sign } = classes;
const Auth = () => {
  return <div className={auth_container}><form action=""><FaUserLock className={classes.sign}/><h2>Sign In</h2></form></div>;
};

export default Auth;
