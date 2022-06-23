import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {getAll, create, update, deleteId} from "../../services/transaction-service";
import {selectSearchTerm} from "../search/search-slice";
import {formatMonth, formatYear} from "../../modules/common/utils/utils";

export const loadTransactions = createAsyncThunk(
  "transactions/loadData",
  async (userId) => {
    return await getAll(userId);
  }
);

export const postTransaction = createAsyncThunk(
  "transactions/postData",
  async (data) => {
    return await create(data);
  }
);

export const updateTransaction = createAsyncThunk(
  "transactions/updateData",
  async (data) => {
    return await update(data);
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteData",
  async (transactionId) => {
    return await deleteId(transactionId);
  }
);

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    allTransactions: [],
    updatingTransaction: {
      id: "",
      sum: "",
      date: "",
      expense: "",
      categoryTitle: "",
      accountTitle: "",
      showInBalance: ""
    },
    isEditing: false,
    isLoading: false,
    currentMonth: formatMonth(new Date()),
    currentYear: formatYear(new Date()),
    isExpense: true,
    isTransfer: false,

  },
  reducers: {
    updatingTransaction: (state, action) => {
      return {
        ...state,
        updatingTransaction: action.payload,
      };
    },
    updateMonth: (state, action) => {
      return {
        ...state,
        currentMonth: action.payload,
      };
    },
    updateYear: (state, action) => {
      return {
        ...state,
        currentYear: action.payload,
      };
    },
    setIsEditing: (state, action) => {
      return {
        ...state,
        isEditing: action.payload,
      };
    },
    setIsExpense: (state, action) => {
      return {
        ...state,
        isExpense: action.payload
      };
    },
    setIsTransfer: (state, action) => {
      return {
        ...state,
        isTransfer: action.payload
      };
    },
  },
  extraReducers: {
    [loadTransactions.pending]: (state) => {
      state.isLoading = true;
    },
    [loadTransactions.fulfilled]: (state, action) => {
      state.allTransactions = action.payload;
      state.isLoading = false;
      state.showDelete = false;
    },
    [loadTransactions.rejected]: (state) => {
      state.isLoading = false;
    },
    [updateTransaction.pending]: (state) => {
      state.isLoading = true;
    },
    [updateTransaction.fulfilled]: (state) => {
      state.isLoading = false;
      state.showDelete = false;
    },
    [updateTransaction.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const selectAllTransactionsState = (state) => state.transactions.allTransactions;
export const selectUpdatingTransactionState = (state) => state.transactions.updatingTransaction;
export const selectIsLoading = (state) => state.transactions.isLoading;
export const selectIsEditing = (state) => state.transactions.isEditing;
export const selectCurrentMonth = (state) => state.transactions.currentMonth;
export const selectCurrentYear = (state) => state.transactions.currentYear;
export const selectIsExpense = (state) => state.transactions.isExpense;
export const selectIsTransfer = (state) => state.transactions.isTransfer;

export const selectFilteredTransactions = (state) => {
  const allTransactions = selectAllTransactionsState(state);
  const searchTerm = selectSearchTerm(state);

  return allTransactions
          .filter((transaction) => transaction.showInBalance !== false)
          .filter((transaction) => transaction.category.title.toLowerCase().includes(searchTerm.toLowerCase()))
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const selectCurrentBalance = (state) => {
  const allTransactions = selectAllTransactionsState(state);

  const getCurrentBalance = (allTransactions) => {
    const incomes = allTransactions
    .filter((transaction) => transaction.expense === false)
    .map((transaction) => transaction.sum)
    .reduce((a, b) => a + b, 0);

    const expenses = allTransactions
    .filter((transaction) => transaction.expense === true)
    .map((transaction) => transaction.sum)
    .reduce((a, b) => a + b, 0);

    return incomes - expenses;
  };

  return getCurrentBalance(allTransactions);
};

export const selectYears = ((state) => [...new Set(selectFilteredTransactions(state)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(date => formatYear(date.date)))]);

export const {
  setTransactionId,
  addTransaction,
  updateMonth,
  updateYear,
  updatingTransaction,
  setIsEditing,
  setIsExpense,
  setIsTransfer
} = transactionsSlice.actions;
export default transactionsSlice.reducer;
