import React, { useState } from "react";
import { FaUserLock } from "react-icons/fa";

import PasswordInput from "../../components/Input/PasswordInput";

import classes from "./AuthForm.module.scss";
const { flex_row, sign, auth_input } = classes;

const AuthForm = () => {
  const signUpDataInitial = {
    first_name: "demo",
    last_name: "demo",
    email: "SignUp@example.com",
    password: "123456",
  };

  const signInDataInitial = {
    email: "Signin@example.com",
    password: "",
  };

  const [hasAccount, setHasAccount] = useState(false);
  const [signUpData, setSignUpData] = useState(signUpDataInitial);
  const [signInData, setSignInData] = useState(signInDataInitial);
  const [repeatPassword, setRepeatPassword] = useState("123456");

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log(signInData);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    // console.log(signUpData);
    if (signUpData.password === repeatPassword) {
      console.log("match");
    } else {
      console.log("not match");
    }
  };

  const signUpNames = (
    <div className={flex_row}>
      <input
        className={auth_input}
        placeholder="First Name"
        value={signUpData.first_name}
        onChange={(e) => {
          setSignUpData({ ...signUpData, first_name: e.target.value });
        }}
        required
      />
      <input
        className={auth_input}
        placeholder="Last Name"
        value={signUpData.last_name}
        onChange={(e) => {
          setSignUpData({ ...signUpData, last_name: e.target.value });
        }}
        required
      />
    </div>
  );

  const emailSignUpInput = (
    <input
      className={auth_input}
      placeholder="Email"
      value={signUpData.email}
      onChange={(e) => {
        setSignUpData({ ...signUpData, email: e.target.value });
      }}
      required
    />
  );

  const emailSignInInput = (
    <input
      className={auth_input}
      placeholder="Email"
      value={signInData.email}
      onChange={(e) => {
        setSignInData({ ...signInData, email: e.target.value });
      }}
      required
    />
  );

  return (
    <form onSubmit={hasAccount ? handleSignIn : handleSignUp}>
      <FaUserLock className={sign} />
      <h2>{hasAccount ? "Sign In" : "Sign Up"}</h2>
      {!hasAccount && signUpNames}
      {hasAccount ? emailSignInInput : emailSignUpInput}
      {hasAccount ? (
        <PasswordInput
          isRepeat={false}
          passwordState={signInData}
          setPasswordState={setSignInData}
        />
      ) : (
        <PasswordInput
          isRepeat={false}
          passwordState={signUpData}
          setPasswordState={setSignUpData}
        />
      )}

      {!hasAccount && (
        <PasswordInput
          isRepeat={true}
          repeatPwdState={repeatPassword}
          setRepeatPwdState={setRepeatPassword}
        />
      )}
      <button type="submit" className="confirm_btn">
        {hasAccount ? "Sign In" : "Sign Up"}
      </button>
      <button
        type="button"
        className="secondary_btn"
        onClick={() => {
          setHasAccount((prev) => !prev);
        }}
      >
        {hasAccount ? "Create New Account" : "Sign in with existing account"}
      </button>
    </form>
  );
};

export default AuthForm;
