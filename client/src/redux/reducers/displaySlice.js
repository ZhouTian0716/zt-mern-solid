import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postModal: false,
  isLoggedIn: false,
};

export const displaySlice = createSlice({
  name: "display",
  initialState,
  reducers: {
    postModalToggle: (state) => {
      state.postModal = !state.postModal;
    },
    isLoggedInToggle: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
});

// exported for easier useSelector call from components
export const postModalStatus = (state) => state.display.postModal;
export const LoggedInStatus = (state) => state.display.isLoggedIn;
// Action creators are generated for each case reducer function
export const { postModalToggle, isLoggedInToggle } = displaySlice.actions;

export default displaySlice.reducer;
