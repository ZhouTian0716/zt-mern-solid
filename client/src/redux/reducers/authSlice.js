import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSignUp: false,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    isSignUpToggle: (state) => {
      state.isSignUp = !state.isSignUp;
    },
    isLoggedInToggle: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
});

// exported for easier useSelector call from components
export const SignUpStatus = (state) => state.auth.isSignUp;
export const LoggedInStatus = (state) => state.auth.isLoggedIn;

// Action creators are generated for each case reducer function
export const { isSignUpToggle, isLoggedInToggle } = authSlice.actions;

export default authSlice.reducer;
