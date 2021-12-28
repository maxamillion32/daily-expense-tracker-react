import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getAll, update} from '../../services/budget.service';

const getOverall = (budget, type, currentMonth) => {
    if (Object.keys(budget[currentMonth][type]).length === 0) {
      return;
    };
    const upperCase = type[0].toUpperCase() + type.slice(1);
    const balanceTotal = budget[currentMonth][type][upperCase];
    const balanceBudget = Object.values(budget[currentMonth][type]).reduce((a, b) => +a + +b);

    const overall = Math.abs((!balanceTotal ? 0 : balanceTotal) - balanceBudget);

    return overall;
  }

export const loadBudgets = createAsyncThunk(
  'budgets/loadData',
  async (userId) => {
    return await getAll(userId);
  }
)

export const postBudget = createAsyncThunk(
  'budgets/addData',
  async ({updatedBudget, userId}) => {

    return await update(userId, updatedBudget);
  }
)

export const budgetSlice = createSlice({
  name: "budget",
  initialState: {
    budget: {},
    budgetUpdated: {},
  },
  reducers: {
    updateBudget: (state, action) => {
      const type = action.payload.type;
      const name = action.payload.name;
      const nameUpperCase = type[0].toUpperCase() + type.slice(1);
      const value = action.payload.value;
      const month = action.payload.month;
      const budget =  {...state.budgetUpdated};

      let currentMonth = {...budget[month]};
      let currentType = {...currentMonth[type]};
      currentType[name] = value;
      currentMonth[type] = currentType;

      budget[month] = currentMonth;

      const overall = getOverall(budget, type, month);

      currentMonth = {...budget[month]};
      currentType = {...currentMonth[type]};
      currentType[nameUpperCase] = overall;
      currentMonth[type] = currentType;

      budget[month] = currentMonth;

      return {
        ...state,
        budgetUpdated: {...budget}
      };
    },
  },

  extraReducers: {
    [loadBudgets.pending]: (state) => {
    },
    [loadBudgets.fulfilled]: (state, action) => {
      state.budget = action.payload;
      state.budgetUpdated = action.payload;
    },
    [loadBudgets.rejected]: (state) => {
    },
  },
});

export const selectAllBudgetState = (state) => state.budget.budget;
export const selectUpdatedBudgetState = (state) => state.budget.budgetUpdated;

export const {updateBudget} = budgetSlice.actions;
export default budgetSlice.reducer;
