import React, { useState } from "react";
import { FaUserLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import PasswordInput from "../../components/Input/PasswordInput";

// Redux
import { useDispatch } from "react-redux";
// Action for updating Redux State
import { addNewAccount,signInAccount } from "../../redux/reducers/accountsSlice";
import { isLoggedInToggle } from "../../redux/reducers/displaySlice";

import classes from "./AuthForm.module.scss";
const { flex_row, sign, auth_input, small_link } = classes;

const AuthForm = () => {
  const signUpDataInitial = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  };

  const signInDataInitial = {
    email: "",
    password: "",
  };

  const [hasAccount, setHasAccount] = useState(true);
  const [signUpData, setSignUpData] = useState(signUpDataInitial);
  const [signInData, setSignInData] = useState(signInDataInitial);
  const [repeatPassword, setRepeatPassword] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = (e) => {
    e.preventDefault();
    // console.log(signInData);
    // pass signInData to backend here
    dispatch(signInAccount(signInData)).unwrap();
    dispatch(isLoggedInToggle());
    // Reset State
    clearSignInForm();
    navigate("/");
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    // console.log(signUpData);
    if (signUpData.password === repeatPassword) {
      console.log("match");
      // console.log(signUpData);
      // pass signUpData to backend here
      dispatch(addNewAccount(signUpData)).unwrap();
      dispatch(isLoggedInToggle());
      // Reset State
      clearSignUpForm();
      navigate("/");
    } else {
      setHasError(true);
      setErrorMessage("Confirm Password Not Matching");
      // Clean up error state
      setTimeout(() => {
        setHasError(false);
        setErrorMessage("");
      }, 2000);
    }
  };

  const clearSignInForm = () => {
    setSignInData(signInDataInitial);
  };

  const clearSignUpForm = () => {
    setSignUpData(signUpDataInitial);
    setRepeatPassword("");
  };
  const goSignIn = () => {
    clearSignInForm();
    setHasAccount((prev) => !prev);
  };

  const goSignUp = () => {
    clearSignUpForm();
    setHasAccount((prev) => !prev);
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
      {hasError && <p>{errorMessage}</p>}
      {hasAccount && (
        <Link
          to={`/account/reset/password?email=${signInData.email}`}
          className={small_link}
        >
          Forgot Password?
        </Link>
      )}

      <button type="submit" className="confirm_btn">
        {hasAccount ? "Sign In" : "Sign Up"}
      </button>
      <button
        type="button"
        className="secondary_btn"
        onClick={hasAccount ? goSignIn : goSignUp}
      >
        {hasAccount ? "Create New Account" : "Sign in with existing account"}
      </button>
    </form>
  );
};

export default AuthForm;
