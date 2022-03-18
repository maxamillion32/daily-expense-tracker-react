import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {getAll, create, deleteId} from "../../services/transaction.service";
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
    isLoading: false,
    hasError: false,
    currentMonth: formatMonth(new Date()),
    currentYear: formatYear(new Date()),
    isAddButtonClick: false,
    isButtonShow: false
  },
  reducers: {
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
    setIsButtonShow: (state, action) => {
      return {
        ...state,
        isButtonShow: action.payload === "" ? !state.isButtonShow : action.payload,
      };
    },
    setIsAddButtonClick: (state) => {
      return {
        ...state,
        isAddButtonClick: !state.isAddButtonClick,
      };
    },
  },
  extraReducers: {
    [loadTransactions.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [loadTransactions.fulfilled]: (state, action) => {
      state.allTransactions = action.payload;
      state.isLoading = false;
      state.hasError = false;
      state.showDelete = false;
    },
    [loadTransactions.rejected]: (state) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

export const selectAllTransactionsState = (state) => state.transactions.allTransactions;
export const isLoading = (state) => state.transactions.isLoading;
export const hasError = (state) => state.transactions.hasError;
export const currentMonth = (state) => state.transactions.currentMonth;
export const currentYear = (state) => state.transactions.currentYear;
export const isAddButtonClick = (state) => state.transactions.isAddButtonClick;
export const isButtonShow = (state) => state.transactions.isButtonShow;

export const selectFilteredTransactions = (state) => {
  const allTransactions = selectAllTransactionsState(state);
  const searchTerm = selectSearchTerm(state);

  return allTransactions
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

export const {
  setTransactionId,
  addTransaction,
  updateMonth,
  updateYear,
  setIsAddButtonClick,
  setIsButtonShow,
} = transactionsSlice.actions;
export default transactionsSlice.reducer;
