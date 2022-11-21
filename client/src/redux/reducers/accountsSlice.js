import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { API} from "../../api/index";

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

// This is for testing refreshtoken & retry
export const fetchAccounts = createAsyncThunk(
  "accounts/fetchAccounts",
  async () => {
    const response = await API.get(Accounts_Route);
    return response.data;
  }
);

export const signInAccount = createAsyncThunk(
  "accounts/signInAccount",
  async (signInData) => {
    const response = await API.post(`${Accounts_Route}/signin`, signInData, {
      withCredentials: true,
    });
    // this response is manage by youself how to set the backend
    // console.log(response.data);
    return response.data;
  }
);

export const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    tokenRefresh: (state, action) => {
      console.log(action.payload)
      state.currentAccount.accessToken = action.payload;
    },
  },
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
      .addCase(fetchAccounts.pending, (state, action) => {
        state.status = "fetching";
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.status = "succeeded";
        const loadedAccounts = action.payload;
        // console.log(loadedAccounts);
        state.accounts = loadedAccounts;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

// exported for easier useSelector call from components
export const getCurrentAccount = (state) => state.accounts.currentAccount;
export const getAllAccounts = (state) => state.accounts.accounts;

// Action creators are generated for each case reducer function
export const { tokenRefresh } = accountsSlice.actions;

export default accountsSlice.reducer;
