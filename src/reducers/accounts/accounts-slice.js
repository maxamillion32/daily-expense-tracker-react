import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import AccountDataService from '../../services/account.service';
import {accounts} from '../../services/mocks/mocks';

export const loadAccounts = createAsyncThunk(
  'accounts/loadData',
  async () => {
    const data = await AccountDataService.getAll();
    const json = await data;
    return json;
  }
)

export const postAccounts = createAsyncThunk(
  'accounts/addData',
  async (newAccount) => {
    const data = await AccountDataService.create(newAccount);
    const json = await data;
    return json;
  }
)

export const accountsSlice = createSlice({
  name: "accounts",
  initialState: {
    allAccounts: accounts,
    newAccount: {
      title: ``,
      balance: 0,
      startBalance: 0,
      archive: false
    },
    isLoading: false,
    hasError: false,
    isPending: false,
    isFailedToCreate: false,
  },
  reducers: {
    addAccount: (state, action) => {
      return {
        ...state,
        newAccount: {
          ...state.newAccount,
          title: action.payload,
        }
      };
    }
  },
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

    [postAccounts.pending]: (state) => {
      state.isPending = true;
      state.isFailedToCreate = false;
    },
    [postAccounts.fulfilled]: (state) => {
      state.newAccount = {
        title: ``,
        balance: 0,
        startBalance: 0,
        archive: false
      }
      state.isPending = false;
      state.isFailedToCreate = false;
    },
    [postAccounts.rejected]: (state) => {
      state.isPending = false;
      state.isFailedToCreate = true;
    }
  },
});

export const selectAllAccountsState = (state) => state.accounts.allAccounts;
export const selectNewAccountsState = (state) => state.accounts.newAccount;
export const isLoading = (state) => state.accounts.isLoading;
export const isPending = (state) => state.accounts.isPending;

export const {addAccount} = accountsSlice.actions;
export default accountsSlice.reducer;
