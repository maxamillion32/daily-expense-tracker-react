import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {getAll, create, deleteId} from '../../services/account.service';
// import {accounts} from '../../services/mocks/mocks';

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
  reducers: {
    addAccount: (state, action) => {
      return {
        ...state,
        newAccount: {
          ...state.newAccount,
          title: action.payload,
        }
      };
    },
    editAccount: (state, action) => {
      const accounts = [...state.allAccounts];
      const newAccounts = accounts.map(account => {
          if (account.id === action.payload.id) {
            return action.payload;
          }
          return account;
        })

      return {
        ...state,
        allAccounts: newAccounts
      };
    },
    createAccount: (state, action) => {
      return {
        ...state,
        allAccounts: [
          ...state.allAccounts,
          ...action.payload
        ]
      };
    },
    // deleteAccount: (state, action) => {
    //   const id = action.payload;
    //   const newAccounts = [...state.allAccounts].filter((item) => item.id !== id)
    //   return {
    //     ...state,
    //     allAccounts: [
    //       ...newAccounts
    //     ]
    //   };
    // },
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

    [postAccount.pending]: (state) => {
      state.isPending = true;
      state.isFailedToCreate = false;
    },
    [postAccount.fulfilled]: (state) => {
      state.newAccount = {
        title: ``,
        balance: 0,
        startBalance: 0,
        archive: false
      }
      state.isPending = false;
      state.isFailedToCreate = false;
    },
    [postAccount.rejected]: (state) => {
      state.isPending = false;
      state.isFailedToCreate = true;
    },

    [deleteAccount.pending]: (state) => {
      state.isPending = true;
      state.isFailedToCreate = false;
    },
    [deleteAccount.fulfilled]: (state) => {
      state.isPending = false;
      state.isFailedToCreate = false;
    },
    [deleteAccount.rejected]: (state) => {
      state.isPending = false;
      state.isFailedToCreate = true;
    }
  },
});

export const selectAllAccountsState = (state) => state.accounts.allAccounts;
export const selectNewAccountsState = (state) => state.accounts.newAccount;
export const isLoading = (state) => state.accounts.isLoading;
export const isPending = (state) => state.accounts.isPending;

export const {addAccount, editAccount, createAccount} = accountsSlice.actions;
export default accountsSlice.reducer;
