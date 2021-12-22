import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import {useSelector} from 'react-redux';
import {
  getAll,
  // create, deleteId,
  update
} from '../../services/budget.service';

// const getOverall = (budget, type, currentMonth) => {
//     if (Object.keys(budget[currentMonth][type]).length === 0) {
//       return;
//     };
//     const upperCase = type[0].toUpperCase() + type.slice(1);
//     const balanceTotal = budget[currentMonth][type][upperCase];
//     const balanceBudget = Object.values(budget[currentMonth][type]).reduce((a, b) => +a + +b);

//     const overall = Math.abs((!balanceTotal ? 0 : balanceTotal) - balanceBudget);

//     return overall;
//   }

//   const getBalance = (budget, type, currentMonth) => {
//     if (Object.keys(budget[currentMonth][type]).length === 0) {
//       return;
//     };
//     const upperCase = type[0].toUpperCase() + type.slice(1);
//     const balanceTotal = budget[currentMonth][type][upperCase];

//     return !balanceTotal ? 0 : balanceTotal;
//   }

export const loadBudgets = createAsyncThunk(
  'budgets/loadData',
  async () => {
    return await getAll();
  }
)
// const userId = 'userId';

export const postBudget = createAsyncThunk(
  'budgets/addData',
  async (action) => {
    const type = action.type;
    const name = action.name;
    // const nameUpperCase = action.nameUpperCase;
    const value = action.value;
    const month = action.month;
    // const budget = action.budget;
    const id = 'userId';

    const budget = {};
    let currentUser = {...budget[id]};
    const currentMonth = {...currentUser[month]};
    const currentType = {...currentMonth[type]};
    currentType[name] = value;
    currentMonth[type] = currentType;

    currentUser[month] = currentMonth;

    // const overall = getOverall(budget, type, month);
    // console.log(`🚀 ~ file: budget-slice.js ~ line 58 ~ overall`, overall);
    // const balance = getBalance(budget, type, month);
    // console.log(`🚀 ~ file: budget-slice.js ~ line 60 ~ balance`, balance);

    // if (overall > balance) {
    //   const currentMonth = {...currentUser[month]};
    //   const currentType = {...currentMonth[type]};
    //   currentType[nameUpperCase] = overall;
    //   currentMonth[type] = currentType;

    //   currentUser[month] = currentMonth;
    // }

    return await update(id, currentUser);
  }
)

export const budgetSlice = createSlice({
  name: "budget",
  initialState: {
    budget: []
  },
  reducers: {
    updateBudget: (state, action) => {
      const type = action.payload.type;
      const name = action.payload.name;
      // const nameUpperCase = action.payload.nameUpperCase;
      const value = action.payload.value;
      const month = action.payload.month;
      const id = 'userId';

      const budget = {...state};
      let currentUser = {...budget[id]};
      const currentMonth = {...currentUser[month]};
      const currentType = {...currentMonth[type]};
      currentType[name] = value;
      currentMonth[type] = currentType;

      currentUser[month] = currentMonth;

      // const overall = getOverall(budget, type, month);
      // const balance = getBalance(budget, type, month);

      // if (overall > balance) {
      //   const currentMonth = {...currentUser[month]};
      //   const currentType = {...currentMonth[type]};
      //   currentType[nameUpperCase] = overall;
      //   currentMonth[type] = currentType;

      //   currentUser[month] = currentMonth;
      // }
      currentUser = {[id]: currentUser};
      return {
        ...currentUser,
      };
    },
  },

  extraReducers: {
    [loadBudgets.pending]: (state) => {
    },
    [loadBudgets.fulfilled]: (state, action) => {
      state.budget = action.payload;
    },
    [loadBudgets.rejected]: (state) => {
    },

    // [postBudget.pending]: (state) => {
    //   state.isLoading = true;
    //   state.hasError = false;
    // },
    // [postBudget.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    //   state.hasError = false;
    // },
    // [postBudget.rejected]: (state) => {
    //   state.isLoading = false;
    //   state.hasError = true;
    // },
  },
});

export const selectBudgetState = (state) => state.budget.budget;
export const selectAllBudgetState = (state) => state.budget.allBudgets;

export const {
  updateBudget,
} = budgetSlice.actions;

export default budgetSlice.reducer;
