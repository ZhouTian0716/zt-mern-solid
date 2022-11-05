import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postModal: false,
};

export const displaySlice = createSlice({
  name: "display",
  initialState,
  reducers: {
    postModalToggle: (state) => {
      state.postModal = !state.postModal;
    },
  },
});

// exported for easier useSelector call from components
export const postModalStatus = (state) => state.display.postModal;

// Action creators are generated for each case reducer function
export const { postModalToggle } = displaySlice.actions;

export default displaySlice.reducer;
