import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";

import {getAll, create, update, deleteId} from "../../services/account-service";
import {IAccount} from "../../models/models";
import {RootState} from "../../store/store";

export const loadAccounts = createAsyncThunk(
  "accounts/loadData",
  async (userId: string) => {
    return await getAll(userId);
  }
);

export const postAccount = createAsyncThunk(
  "accounts/addData",
  async (newAccount: IAccount) => {
    return await create(newAccount);
  }
);

export const updateAccount = createAsyncThunk(
  "accounts/updateData",
  async ({id, title, userId, startBalance, balance}: IAccount) => {
    return await update(id, title, userId, startBalance, balance);
  }
);

export const deleteAccount = createAsyncThunk(
  "accounts/deleteData",
  async (accountId: string) => {
    return await deleteId(accountId);
  }
);

interface AccountsState {
  allAccounts: IAccount[],
  newAccount: {
    title: string,
    balance: number,
    startBalance: number,
    archive: boolean
  },
  isLoading: boolean
}

const initialState: AccountsState = {
  allAccounts: [],
  newAccount: {
    title: "",
    balance: 0,
    startBalance: 0,
    archive: false
  },
  isLoading: false,
};

export const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {},
  extraReducers: {
    [loadAccounts.pending.type]: (state) => {
      state.isLoading = true;
    },
    [loadAccounts.fulfilled.type]: (state, action: PayloadAction<IAccount[]>) => {
      state.allAccounts = action.payload;
      state.isLoading = false;
    },
    [loadAccounts.rejected.type]: (state) => {
      state.isLoading = false;
    },
  },
});

export const selectAllAccountsState = (state: RootState) => state.accounts.allAccounts;
export const selectNewAccountsState = (state: RootState) => state.accounts.newAccount;
export const selectIsLoading = (state: RootState) => state.accounts.isLoading;

export const selectFilteredAccounts = (state: RootState) => {
  const allAccounts = [...selectAllAccountsState(state)];

  return allAccounts
    .sort((a, b) => b.title.toLowerCase() > a.title.toLowerCase() ? -1 : 1);
};

export const selectAccountBalance = (state: RootState) => {
  const allAccounts = selectAllAccountsState(state);

  const getStartBalance = (allAccounts: IAccount[]) => {
    return [...new Set(allAccounts
    .map((account) => +account.startBalance))]
    .reduce((a, b) => a + b, 0);
  };

  return getStartBalance(allAccounts);
};

// export const {addAccount, editAccount, createAccount} = accountsSlice.actions;
export default accountsSlice.reducer;
