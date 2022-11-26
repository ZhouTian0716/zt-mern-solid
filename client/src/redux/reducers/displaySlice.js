import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postModal: false,
  persist: JSON.parse(localStorage.getItem("persist")) || false,
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
    persistToggle: (state) => {
      state.persist = !state.persist;
    },
  },
});

// exported for easier useSelector call from components
export const postModalStatus = (state) => state.display.postModal;
export const LoggedInStatus = (state) => state.display.isLoggedIn;
export const persistStatus = (state) => state.display.persist;
// Action creators are generated for each case reducer function
export const { postModalToggle, isLoggedInToggle, persistToggle } =
  displaySlice.actions;

export default displaySlice.reducer;
