import React from "react";
import classes from "./LoadingText.module.scss";

const { header } = classes;

const LoadingText = ({message}) => {
  return <h2 className={header}>{message}</h2>;
};

export default LoadingText;
