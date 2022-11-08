import React from "react";
import AuthForm from "../../components/Forms/AuthForm";
import classes from "./Auth.module.scss";
const { container } = classes;

const Auth = () => {
  return (
    <div className={container}>
      <AuthForm />
    </div>
  );
};

export default Auth;
