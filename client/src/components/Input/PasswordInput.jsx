import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import classes from "./PasswordInput.module.scss";
const { auth_input, password_container, password_toggle_btn } = classes;

const PasswordInput = ({
  passwordState,
  setPasswordState,
  isRepeat,
  repeatPwdState,
  setRepeatPwdState,
}) => {
  const isRepeatPassword = isRepeat;
  const [inputType, setInputType] = useState("password");
  const [passwordReveal, setPasswordReveal] = useState(false);

  return (
    <div className={password_container}>
      {isRepeatPassword ? (
        <input
          className={auth_input}
          placeholder="Password"
          value={repeatPwdState}
          type={inputType}
          onChange={(e) => {
            setRepeatPwdState(e.target.value);
          }}
          required
        />
      ) : (
        <input
          className={auth_input}
          placeholder="Password"
          value={passwordState.password}
          type={inputType}
          onChange={(e) => {
            setPasswordState({ ...passwordState, password: e.target.value });
          }}
          required
        />
      )}

      {passwordReveal ? (
        <AiOutlineEyeInvisible
          className={password_toggle_btn}
          onClick={() => {
            setInputType("password");
            setPasswordReveal((prev) => !prev);
          }}
        />
      ) : (
        <AiOutlineEye
          className={password_toggle_btn}
          onClick={() => {
            setInputType("text");
            setPasswordReveal((prev) => !prev);
          }}
        />
      )}
    </div>
  );
};

export default PasswordInput;
