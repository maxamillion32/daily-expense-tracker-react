import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getAll, update} from '../../services/budget.service';

const getOverall = (budget, type, month, year) => {
    if (Object.keys(budget[year][month][type]).length === 0) {
      return;
    };
    const upperCase = type[0].toUpperCase() + type.slice(1);
    const balanceTotal = budget[year][month][type][upperCase];
    const balanceBudget = Object.values(budget[year][month][type]).reduce((a, b) => +a + +b);

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
      const value = +action.payload.value;
      const month = action.payload.month;
      const year = action.payload.year;
      let budget = action.payload.updatedBudget;

      let current = {};

      if (!budget) {
        console.log('1');
        current[year] = {[month]: {expenses: {}, incomes: {}}};

        let currentYear = {...current[year]};
        let currentMonth = {...currentYear[month]};
        currentMonth = {[type]: {}};
        let currentType = {...currentMonth[type]};
        currentType[name] = value;
        currentMonth[type] = currentType;
        currentYear[month] = {...current[year][month], ...currentMonth};

        current[year] = {...currentYear};

        const overall = getOverall(current, type, month, year);
        currentType[nameUpperCase] = overall;
        currentMonth[type] = currentType;
        currentYear[month] = {...current[year][month], ...currentMonth};
        current[year] = {...budget[month], ...currentYear};
      }

      if (budget && (!budget[year] || !budget[year][month])) {
        console.log('2');
        current[year] = {[month]: {expenses: {}, incomes: {}}};

        let currentYear = {...current[year]};
        let currentMonth = {...currentYear[month]};
        currentMonth = {[type]: {}};
        let currentType = {...currentMonth[type]};
        currentType[name] = value;
        currentMonth[type] = currentType;
        currentYear[month] = {...current[year][month], ...currentMonth};

        current[year] = {...budget[year], ...currentYear};
        current = {...budget, ...current}

        const overall = getOverall(current, type, month, year);
        currentType[nameUpperCase] = overall;
        currentMonth[type] = currentType;
        currentYear[month] ={...current[year][month], ...currentMonth};
        current[year] = {...budget[year], ...currentYear};
        current = {...budget, ...current}
      }


      if (budget && budget[year] && budget[year][month]) {
        console.log('3');

        current = {...JSON.parse(JSON.stringify(budget))};
        let currentYear = current[year];
        let currentMonth = {...currentYear[month]};
        currentMonth = {[type]: {}};
        let currentType = {...currentMonth[type]};
        currentType[name] = value;
        currentMonth[type] = {...budget[year][month][type], ...currentType};
        currentYear[month] = {...budget[year][month], ...currentMonth};
        current[year] = {...budget[month], ...currentYear};

        const overall = getOverall(current, type, month, year);
        currentType[nameUpperCase] = overall;
        currentMonth[type] = {...budget[year][month][type], ...currentType};
        currentYear[month] = {...budget[year][month], ...currentMonth};
        current[year] = {...budget[month], ...currentYear};
      }

      // currentMonth = {...budget[month]};
      // currentType = {...currentMonth[type]};
      // currentType[nameUpperCase] = overall;
      // currentMonth[type] = currentType;

      // let currentYear = current[year];
      // let currentMonth = {...currentYear[month]};
      // let currentType = {...currentMonth[type]};
      // currentType[nameUpperCase] = overall;
      // currentMonth[type] = {...budget[year][month][type], ...currentType};
      // currentYear[month] = {...budget[year][month], ...currentMonth};
      // current[year] = {...budget[month], ...currentYear};
      // console.log(`🚀 ~ file: budget-slice.js ~ line 108 ~ current`, current);


      // budget[year][month][type] = {...{[name]: value}}


      // let currentYear = budget[year];
      // console.log(`🚀 ~ file: budget-slice.js ~ line 55 ~ currentYear`, currentYear);
      // let currentMonth = currentYear[month];
      // currentMonth = {[type]: {}};
      // let currentType = currentMonth[type];
      // currentType[name] = value;
      // currentMonth[type] = currentType;
      // currentYear[month] = currentMonth;

      // budget[year] = {...budget[year], ...currentYear};
      // console.log(`🚀 ~ file: budget-slice.js ~ line 63 ~ budget`, budget);


      // let currentYear = {...budget[year]};
      // let currentMonth = {...currentYear[month]};
      // currentMonth = {[type]: {}};
      // let currentType = {...currentMonth[type]};
      // currentType[name] = value;
      // currentMonth[type] = currentType;
      // currentYear[month] = currentMonth;

      // budget[year] = {...currentYear};

      // const overall = getOverall(budget, type, month);

      // currentMonth = {...budget[month]};
      // currentType = {...currentMonth[type]};
      // currentType[nameUpperCase] = overall;
      // currentMonth[type] = currentType;

      // budget[month] = currentMonth;

      return {
        ...state,
        budgetUpdated: {...current}
      };
    },

    // {
    //   const type = action.payload.type;
    //   const name = action.payload.name;
    //   const nameUpperCase = type[0].toUpperCase() + type.slice(1);
    //   const value = action.payload.value;
    //   const month = action.payload.month;
    //   const year = action.payload.year;
    //   // const budget =  {...state.budgetUpdated};
    //   const budget =  {};

    //   let currentMonth = {...budget[month]};
    //   let currentType = {...currentMonth[type]};
    //   currentType[name] = value;
    //   currentMonth[type] = currentType;

    //   budget[month] = currentMonth;

    //   const overall = getOverall(budget, type, month);

    //   currentMonth = {...budget[month]};
    //   currentType = {...currentMonth[type]};
    //   currentType[nameUpperCase] = overall;
    //   currentMonth[type] = currentType;

    //   budget[month] = currentMonth;

    //   return {
    //     ...state,
    //     budgetUpdated: {...budget}
    //   };
    // },
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
