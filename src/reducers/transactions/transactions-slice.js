import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {nanoid} from 'nanoid';
import TransactionDataService from '../../services/transaction.service';
import {selectSearchTerm} from '../search/search-slice';
import {formatMonth} from '../../utils/utils'
import {transactions} from '../../services/mocks/mocks';

const MAX_ID_LENGTH = 6;

export const loadTransactions = createAsyncThunk(
  'transactions/loadData',
  async () => {
    const data = await TransactionDataService.getAll();
    const json = await data;
    return json;
  }
)

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    allTransactions: transactions,
    newTransaction: {
      id: nanoid(MAX_ID_LENGTH),
      sum: '',
      date: new Date().toISOString().slice(0, -14),
      // date: '',
      expense: true,
      account: [],
      category: [],
    },
    isLoading: false,
    hasError: false,
    currentMonth: formatMonth(new Date()),
    isButtonClick: false,
    isButtonShow: false
  },
  reducers: {
    setUserInput: (state, action) => {
      let {name, value} = action.payload;
      if (name === `expense`) {
        value = !state.newTransaction.expense;
      }
      if (name === `sum`) {
        value = +value === 0 ? '' : +value;
      }
      return {
        ...state,
        newTransaction: {
          ...state.newTransaction,
          [name]: value
        }
      };
    },
    setCategory: (state, action) => {
      return {
        ...state,
        newTransaction: {
          ...state.newTransaction,
          category: action.payload,
        }
      };
    },
    setAccount: (state, action) => {
      return {
        ...state,
        newTransaction: {
          ...state.newTransaction,
          account: action.payload,
        }
      };
    },
    addTransaction: (state, action) => {
      return {
        ...state,
        allTransactions: [
          ...state.allTransactions,
          ...action.payload,
        ],
      };
    },
    resetState: (state, action) => {
      return {
        ...state,
        newTransaction: {
          id: nanoid(MAX_ID_LENGTH),
          sum: '',
          date: new Date().toISOString().slice(0, -14),
          expense: true,
          account: [],
          category: [],
        },
      };
    },
    deleteTransaction: (state, action) => {
      const id = action.payload;
      const newTransactions = state.allTransactions.filter(transaction => transaction.id !== id)
      return {
        ...state,
        allTransactions: newTransactions,
      };
    },
    updateMonth: (state, action) => {
      return {
        ...state,
        currentMonth: action.payload,
      };
    },
    showButton: (state, action) => {
      return {
        ...state,
        isButtonShow: !state.isButtonShow,
      };
    },
    clickButton: (state, action) => {
      return {
        ...state,
        isButtonClick: !state.isButtonClick,
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
      state.newTransaction = {
        ...state.newTransaction,
      }
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
export const selectNewTransactionState = (state) => state.transactions.newTransaction;
export const isLoading = (state) => state.transactions.isLoading;
export const hasError = (state) => state.transactions.hasError;
export const currentMonth = (state) => state.transactions.currentMonth;
export const isButtonClick = (state) => state.transactions.isButtonClick;
export const isButtonShow = (state) => state.transactions.isButtonShow;

export const selectFilteredTransactions = (state) => {
  const allTransactions = selectAllTransactionsState(state);
  const searchTerm = selectSearchTerm(state);

  return allTransactions
          .filter((transaction) => transaction.category.title.toLowerCase().includes(searchTerm.toLowerCase()))
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
};

export const {
  setUserInput,
  setCategory,
  setAccount,
  setTransactionId,
  addTransaction,
  resetState,
  deleteTransaction,
  updateMonth,
  clickButton,
  showButton,
} = transactionsSlice.actions;
export default transactionsSlice.reducer;
