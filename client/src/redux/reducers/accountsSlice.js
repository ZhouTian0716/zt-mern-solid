import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import API from "../../api/index";

const Accounts_Route = "/accounts";

const initialState = {
  currentAccount: null,
  status: "idle",
  accounts: [],
};

export const addNewAccount = createAsyncThunk(
  "accounts/signUpAccount",
  async (signUpData) => {
    const response = await API.post(`${Accounts_Route}/signup`, signUpData);
    // console.log(response.data);
    return response.data;
  }
);



export const signInAccount = createAsyncThunk(
    "accounts/signInAccount",
    async (signInData) => {
      const response = await API.post(`${Accounts_Route}/signin`, signInData);
      console.log(response.data);
      return response.data;
    }
  );

export const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addNewAccount.pending, (state, action) => {
        state.status = "signing up";
      })
      .addCase(addNewAccount.fulfilled, (state, action) => {
        state.status = "idle";
        state.currentAccount = action.payload;
        localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      })
      .addCase(signInAccount.pending, (state, action) => {
        state.status = "signing in";
      })
      .addCase(signInAccount.fulfilled, (state, action) => {
        state.status = "idle";
        state.currentAccount = action.payload;
        // No, we dont want localStorage
        // Try redux persist setup
        // localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      })
  },
});

// exported for easier useSelector call from components
export const getCurrentAccount = (state) => state.accounts.currentAccount;

// Action creators are generated for each case reducer function
// export const { } = accountsSlice.actions;

export default accountsSlice.reducer;
