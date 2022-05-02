import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {getAll, update} from "../../services/budget.service";

const getOverall = (budget, type, month, year) => {
    if (Object.keys(budget[year][month][type]).length === 0) {
      return;
    }
    const upperCase = type[0].toUpperCase() + type.slice(1);
    const balanceTotal = budget[year][month][type][upperCase];
    const balanceBudget = Object.values(budget[year][month][type]).reduce((a, b) => +a + +b);

    const overall = Math.abs((!balanceTotal ? 0 : balanceTotal) - balanceBudget);

    return overall;
  };

export const loadBudgets = createAsyncThunk(
  "budgets/loadData",
  async (userId) => {
    return await getAll(userId);
  }
);

export const postBudget = createAsyncThunk(
  "budgets/addData",
  async ({updatedBudget, userId}) => {

    return await update(userId, updatedBudget);
  }
);

export const budgetSlice = createSlice({
  name: "budget",
  initialState: {
    budget: {},
    budgetUpdated: {},
  },
  reducers: {
    //TODO: need refactoring
    updateBudget: (state, action) => {
      const type = action.payload.type;
      const name = action.payload.id;
      const nameUpperCase = type[0].toUpperCase() + type.slice(1);
      const value = +action.payload.value;
      const month = action.payload.month;
      const year = action.payload.year;
      let budget = action.payload.updatedBudget;

      let current = {};

      current[year] = {[month]: {expenses: {}, incomes: {}}};
      let currentYear = {...current[year]};
      let currentMonth = {...currentYear[month]};
      currentMonth = {[type]: {}};
      let currentType = {...currentMonth[type]};
      currentType[name] = value;
      currentMonth[type] = currentType;
      currentYear[month] = {...current[year][month], ...currentMonth};

      if (!budget) {
        current[year] = {...currentYear};

        const overall = getOverall(current, type, month, year).toFixed(2);
        currentType[nameUpperCase] = overall;
        currentMonth[type] = currentType;
        currentYear[month] = {...currentMonth};
      }

      if (budget && (!budget[year] || !budget[year][month])) {
        current[year] = {...budget[year], ...currentYear};
        current = {...budget, ...current};

        const overall = getOverall(current, type, month, year).toFixed(2);
        currentType[nameUpperCase] = overall;
        currentMonth[type] = currentType;
        currentYear[month] ={...current[year][month], ...currentMonth};
        current[year] = {...budget[year], ...currentYear};
        current = {...budget, ...current};
      }


      if (budget && budget[year] && budget[year][month]) {
        current = {...JSON.parse(JSON.stringify(budget))};
        let currentYear = current[year];
        let currentMonth = {...currentYear[month]};
        currentMonth = {[type]: {}};
        let currentType = {...currentMonth[type]};
        currentType[name] = value;
        currentMonth[type] = {...budget[year][month][type], ...currentType};
        currentYear[month] = {...budget[year][month], ...currentMonth};
        current[year] = {...budget[month], ...currentYear};

        const overall = getOverall(current, type, month, year).toFixed(2);
        currentType[nameUpperCase] = overall;
        currentMonth[type] = {...budget[year][month][type], ...currentType};
        currentYear[month] = {...budget[year][month], ...currentMonth};
        current[year] = {...budget[month], ...currentYear};
      }

      return {
        ...state,
        budgetUpdated: {...current}
      };
    },
  },

  extraReducers: {
    [loadBudgets.pending]: (state) => {
      state.isLoading = true;
    },
    [loadBudgets.fulfilled]: (state, action) => {
      state.budget = action.payload;
      state.budgetUpdated = action.payload;
      state.isLoading = false;
    },
    [loadBudgets.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const selectAllBudgetState = (state) => state.budget.budget;
export const selectUpdatedBudgetState = (state) => state.budget.budgetUpdated;
// export const isLoading = (state) => state.budget.isLoading;

export const {updateBudget} = budgetSlice.actions;
export default budgetSlice.reducer;
