import {createSlice} from '@reduxjs/toolkit';

export const budgetSlice = createSlice({
  name: "budget",
  initialState: {
    January: {
      expenses: {},
      incomes: {}
    },
    February: {
      expenses: {},
      incomes: {}
    },
    March: {
      expenses: {},
      incomes: {}
    },
    April: {
      expenses: {},
      incomes: {}
    },
    May: {
      expenses: {},
      incomes: {}
    },
    June: {
      expenses: {},
      incomes: {}
    },
    July: {
      expenses: {},
      incomes: {}
    },
    August: {
      expenses: {},
      incomes: {}
    },
    September: {
      expenses: {},
      incomes: {}
    },
    October: {
      expenses: {},
      incomes: {}
    },
    November: {
      expenses: {},
      incomes: {}
    },
    December: {
      expenses: {},
      incomes: {}
    },
  },
  reducers: {
    updateBudget: (state, action) => {
      const type = action.payload.type;
      const name = action.payload.name;
      const value = action.payload.value;
      const month = action.payload.month;

      const budget = {...state};
      const currentMonth = {...budget[month]};
      const currentType = {...currentMonth[type]};
      currentType[name] = value;
      currentMonth[type] = currentType;

      budget[month] = currentMonth;

      return {
        ...budget,
      };
    },
  },
});

export const selectBudgetState = (state) => state.budget;

export const {
  updateBudget,
} = budgetSlice.actions;

export default budgetSlice.reducer;
