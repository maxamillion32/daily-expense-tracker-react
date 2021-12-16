import {createSlice} from '@reduxjs/toolkit';

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

  const getBalance = (budget, type, currentMonth) => {
    if (Object.keys(budget[currentMonth][type]).length === 0) {
      return;
    };
    const upperCase = type[0].toUpperCase() + type.slice(1);
    const balanceTotal = budget[currentMonth][type][upperCase];

    return !balanceTotal ? 0 : balanceTotal;
  }

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
      const nameUpperCase = action.payload.nameUpperCase;
      const value = action.payload.value;
      const month = action.payload.month;

      const budget = {...state};
      const currentMonth = {...budget[month]};
      const currentType = {...currentMonth[type]};
      currentType[name] = value;
      currentMonth[type] = currentType;

      budget[month] = currentMonth;

      const overall = getOverall(budget, type, month);
      const balance = getBalance(budget, type, month);

      if (overall > balance) {
        const currentMonth = {...budget[month]};
        const currentType = {...currentMonth[type]};
        currentType[nameUpperCase] = overall;
        currentMonth[type] = currentType;

        budget[month] = currentMonth;
      }

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
