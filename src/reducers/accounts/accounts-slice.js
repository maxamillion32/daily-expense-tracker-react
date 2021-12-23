import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {getAll, create, update, deleteId} from '../../services/account.service';
import {selectUserId} from '../user/user-slice';

export const loadAccounts = createAsyncThunk(
  'accounts/loadData',
  async () => {
    return await getAll();
  }
)

export const postAccount = createAsyncThunk(
  'accounts/addData',
  async (newAccount) => {
    return await create(newAccount);
  }
)

export const updateAccount = createAsyncThunk(
  'accounts/updateData',
  async ({id, title}) => {
    return await update(id, title);
  }
)

export const deleteAccount = createAsyncThunk(
  'accounts/deleteData',
  async (accountId) => {
    return await deleteId(accountId);
  }
)

export const accountsSlice = createSlice({
  name: "accounts",
  initialState: {
    allAccounts: [],
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

export const allAccountsState = (state) => state.accounts.allAccounts;
export const selectNewAccountsState = (state) => state.accounts.newAccount;
export const isLoading = (state) => state.accounts.isLoading;
export const isPending = (state) => state.accounts.isPending;

export const selectAllAccountsState = (state) => {
  const allAccounts = allAccountsState(state);
  const userId = selectUserId(state);

  return allAccounts
          .filter((transaction) => transaction.userId === userId)
};

export const {addAccount, editAccount, createAccount} = accountsSlice.actions;
export default accountsSlice.reducer;
