import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {getAll, create, update, deleteId} from "../../services/transaction-service";
import {selectSearchTerm} from "../search/search-slice";
import {formatMonth, formatYear} from "../../modules/common/utils/utils";
import {ITransaction} from "../../models/models";
import {RootState} from "../../store/store";

export const loadTransactions = createAsyncThunk(
  "transactions/loadData",
  async (userId: string) => {
    return await getAll(userId);
  }
);

export const postTransaction = createAsyncThunk(
  "transactions/postData",
  async (data: ITransaction) => {
    return await create(data);
  }
);

export const updateTransaction = createAsyncThunk(
  "transactions/updateData",
  async (data: ITransaction) => {
    return await update(data);
  }
);

interface deleteTransaction {
  id: string
  transferId: boolean
}

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteData",
  async ({id, transferId = false}: deleteTransaction) => {
    return await deleteId({id, transferId});
  }
);

interface TransactionState {
  allTransactions: ITransaction[],
  updatingTransaction: ITransaction[],
  isEditing: boolean,
  isLoading: boolean,
  currentMonth: string,
  currentYear: string,
  isExpense: boolean,
  isTransfer: boolean,
}

const initialState: TransactionState = {
  allTransactions: [],
  updatingTransaction: [],
  isEditing: false,
  isLoading: false,
  currentMonth: formatMonth(new Date()),
  currentYear: formatYear(new Date()),
  isExpense: true,
  isTransfer: false,
};

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    updatingTransaction: (state, action: PayloadAction<ITransaction[]>) => {
      return {
        ...state,
        updatingTransaction: action.payload,
      };
    },
    updateMonth: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        currentMonth: action.payload,
      };
    },
    updateYear: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        currentYear: action.payload,
      };
    },
    setIsEditing: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isEditing: action.payload,
      };
    },
    setIsExpense: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isExpense: action.payload
      };
    },
    setIsTransfer: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isTransfer: action.payload
      };
    },
  },
  extraReducers: {
    [loadTransactions.pending.type]: (state) => {
      state.isLoading = true;
    },
    [loadTransactions.fulfilled.type]: (state, action) => {
      state.allTransactions = action.payload;
      state.isLoading = false;
    },
    [loadTransactions.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [updateTransaction.pending.type]: (state) => {
      state.isLoading = true;
    },
    [updateTransaction.fulfilled.type]: (state) => {
      state.isLoading = false;
    },
    [updateTransaction.rejected.type]: (state) => {
      state.isLoading = false;
    },
  },
});

export const selectAllTransactionsState = (state: RootState) => state.transactions.allTransactions;
export const selectUpdatingTransactionState = (state: RootState) => state.transactions.updatingTransaction;
export const selectIsLoading = (state: RootState) => state.transactions.isLoading;
export const selectIsEditing = (state: RootState) => state.transactions.isEditing;
export const selectCurrentMonth = (state: RootState) => state.transactions.currentMonth;
export const selectCurrentYear = (state: RootState) => state.transactions.currentYear;
export const selectIsExpense = (state: RootState) => state.transactions.isExpense;
export const selectIsTransfer = (state: RootState) => state.transactions.isTransfer;

export const selectFilteredTransactions = (state: RootState) => {
  const allTransactions = selectAllTransactionsState(state);
  const searchTerm = selectSearchTerm(state);

  return allTransactions
          .filter((transaction) => transaction.showInBalance !== false)
          .filter((transaction) => transaction.category.title.toLowerCase().includes(searchTerm.toLowerCase()))
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const selectCurrentBalance = (state: RootState) => {
  const allTransactions = selectAllTransactionsState(state);

  const getCurrentBalance = (allTransactions: ITransaction[]) => {
    const incomes = allTransactions
      .filter((transaction) => !transaction.expense)
      .filter((transaction) => !transaction.transfer)
      .map((transaction) => transaction.sum)
      .reduce((a, b) => a + b, 0);

    const expenses = allTransactions
      .filter((transaction) => transaction.expense)
      .filter((transaction) => !transaction.transfer)
      .map((transaction) => transaction.sum)
      .reduce((a, b) => a + b, 0);

    return incomes - expenses;
  };

  return getCurrentBalance(allTransactions);
};

export const selectYears = ((state: RootState) => [...new Set(selectFilteredTransactions(state)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(date => formatYear(date.date)))]);

export const {
  updateMonth,
  updateYear,
  updatingTransaction,
  setIsEditing,
  setIsExpense,
  setIsTransfer
} = transactionsSlice.actions;
export default transactionsSlice.reducer;
