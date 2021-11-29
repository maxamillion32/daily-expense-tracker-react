import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {nanoid} from 'nanoid';
import TransactionDataService from '../../services/transaction.service';
import {selectSearchTerm} from '../search/search-slice';

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
    allTransactions: [],
    newTransaction: {
      id: nanoid(MAX_ID_LENGTH),
      sum: ``,
      date: new Date().toISOString().slice(0, -14),
      // date: '',
      outcome: true,
      account: [],
      category: [],
    },
    isLoading: false,
    hasError: false,
  },
  reducers: {
    setUserInput: (state, action) => {
      let {name, value} = action.payload;
      if (name === `outcome`) {
        value = !state.newTransaction.outcome;
      }
      if (name === `sum`) {
        value = +value;
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
          id: new Date().getTime(),
          sum: ``,
          date: new Date().toISOString().slice(0, -14),
          outcome: true,
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
} = transactionsSlice.actions;
export default transactionsSlice.reducer;
