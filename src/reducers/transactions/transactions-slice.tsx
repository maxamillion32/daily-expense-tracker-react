import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {getAll, create, update, deleteId} from "../../services/transaction-service";
import {selectSearchTerm} from "../search/search-slice";
import {formatMonth, formatYear, getExpenses, getMaxAmountPerYear} from "../../modules/common/utils/utils";
import {ITransaction} from "../../models/models";
import {RootState} from "../../store/store";
import {MONTH} from "../../modules/common/utils/constant";

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
  chartToggle: boolean,
  charData: any,
  maxMonthExpensePerYear: any,
  maxMonthIncomePerYear: any,
  yearExpenses: any
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
  chartToggle: true,
  charData: [],
  maxMonthExpensePerYear: [],
  maxMonthIncomePerYear: [],
  yearExpenses: []
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
    setChartToggle: (state) => {
      return {
        ...state,
        chartToggle: !state.chartToggle,
        charData: getExpenses(state.currentYear, state.allTransactions, !state.chartToggle)
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
      state.charData = getExpenses(state.currentYear, state.allTransactions, state.chartToggle);
      state.maxMonthExpensePerYear = getMaxAmountPerYear(state.currentYear, "expenses", state.allTransactions);
      state.maxMonthIncomePerYear = getMaxAmountPerYear(state.currentYear, "income", state.allTransactions);

      // const maxMonthTransaction = Math.max(state.maxMonthExpensePerYear, state.maxMonthIncomePerYear);
      //
      // const getPercent = (year: string, month: string, type: string, transactions: any[], maxMonthTransaction: number) => {
      //   const incomes = transactions
      //     .filter((transaction) => formatYear(transaction.date) === year)
      //     .filter((transaction) => formatMonth(transaction.date) === month)
      //     .map((transaction) => (type === "expenses" ? transaction.expense : !transaction.expense)
      //       ? +transaction.sum
      //       : transaction = null)
      //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //     // @ts-ignore
      //     .reduce((acc, sum) => acc + sum, 0);
      //
      //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //   // @ts-ignore
      //   const percent = (incomes / maxMonthTransaction * 100);
      //   return percent >= 100 ? percent : percent;
      // };
      // eslint-disable-next-line @typescript-eslint/ban-types
      // const yearExpenses: { [x: string]: { expenses: number; incomes: number; }; }[] = [];
      // MONTH.map((month, index) => {
      //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //   // @ts-ignore
      //   const result = {
      //       month: month,
      //       expenses: getPercent(state.currentYear, month, "expenses", state.allTransactions, maxMonthTransaction),
      //       incomes: getPercent(state.currentYear, month, "incomes", state.allTransactions, maxMonthTransaction)
      //   };
      //
      //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //   // @ts-ignore
      //   yearExpenses[index] = result;
      //   // yearExpenses = Object.assign(yearExpenses, result);
      // });
      // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // // @ts-ignore
      // state.yearExpenses = yearExpenses;
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
export const selectChartData = (state: RootState) => state.transactions.charData;
export const selectMaxMonthExpensePerYear = (state: RootState) => state.transactions.maxMonthExpensePerYear;
export const selectMaxMonthIncomePerYear = (state: RootState) => state.transactions.maxMonthIncomePerYear;
export const selectChartToggle = (state: RootState) => state.transactions.chartToggle;
export const selectYearExpenses = (state: RootState) => state.transactions.yearExpenses;

export const selectFilteredTransactions = (state: RootState) => {
  const allTransactions = selectAllTransactionsState(state);
  const searchTerm = selectSearchTerm(state);

  return allTransactions
          .filter((transaction) => transaction.showInBalance !== false)
          .filter((transaction) => transaction.category.title.toLowerCase().includes(searchTerm.toLowerCase()));
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
    .map(date => formatYear(date.date)))]);

export const {
  updateMonth,
  updateYear,
  updatingTransaction,
  setIsEditing,
  setIsExpense,
  setIsTransfer,
  setChartToggle
} = transactionsSlice.actions;
export default transactionsSlice.reducer;
