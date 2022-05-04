import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

import {getAll, create, update, deleteId} from "../../services/account-service";

export const loadAccounts = createAsyncThunk(
  "accounts/loadData",
  async (userId) => {
    return await getAll(userId);
  }
);

export const postAccount = createAsyncThunk(
  "accounts/addData",
  async (newAccount) => {
    return await create(newAccount);
  }
);

export const updateAccount = createAsyncThunk(
  "accounts/updateData",
  async ({id, title, userId, startBalance, balance}) => {
    return await update(id, title, userId, startBalance, balance);
  }
);

export const deleteAccount = createAsyncThunk(
  "accounts/deleteData",
  async (accountId) => {
    return await deleteId(accountId);
  }
);

export const accountsSlice = createSlice({
  name: "accounts",
  initialState: {
    allAccounts: [],
    newAccount: {
      title: "",
      balance: 0,
      startBalance: 0,
      archive: false
    },
    isLoading: false,
    hasError: false,
    isPending: false,
    isFailedToCreate: false,
  },
  reducers: {},
  extraReducers: {
    [loadAccounts.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [loadAccounts.fulfilled]: (state, action) => {
      state.allAccounts = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [loadAccounts.rejected]: (state) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

export const selectAllAccountsState = (state) => state.accounts.allAccounts;
export const selectNewAccountsState = (state) => state.accounts.newAccount;
export const isAccountsLoading = (state) => state.accounts.isLoading;
export const isPending = (state) => state.accounts.isPending;

export const selectFilteredAccounts = (state) => {
  const allAccounts = [...selectAllAccountsState(state)];

  return allAccounts
    .sort((a, b) => b.title.toLowerCase() > a.title.toLowerCase() ? -1 : 1);
};

export const selectAccountBalance = (state) => {
  const allCategories = selectAllAccountsState(state);

  const getStartBalance = (allCategories) => {
    return [...new Set(allCategories
    .map((account) => +account.startBalance))]
    .reduce((a, b) => a + b, 0);
  };

  return getStartBalance(allCategories);
};

export const {addAccount, editAccount, createAccount} = accountsSlice.actions;
export default accountsSlice.reducer;
