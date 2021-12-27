import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {selectUserId} from '../user/user-slice';
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
  async (userId) => {
    return await getAll(userId);
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
    const id = action.userId;

    const budget = {};
    // let currentUser = {...budget[id]};
    const currentMonth = {...budget[month]};
    const currentType = {...currentMonth[type]};
    currentType[name] = value;
    currentMonth[type] = currentType;

    budget[month] = currentMonth;
    console.log(`🚀 ~ file: budget-slice.js ~ line 60 ~ budget`, budget);

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

    return await update(id, budget);
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
      // const nameUpperCase = action.payload.nameUpperCase;
      const value = action.payload.value;
      const month = action.payload.month;
      const id =  action.payload.userId;
      const budget =  action.payload.budget;

      const allBudget = {...budget};
      const currentMonth = {...allBudget[month]};
      const currentType = {...currentMonth[type]};
      currentType[name] = value;
      currentMonth[type] = currentType;

      allBudget[month] = currentMonth;

      // const overall = getOverall(budget, type, month);
      // const balance = getBalance(budget, type, month);

      // if (overall > balance) {
      //   const currentMonth = {...currentUser[month]};
      //   const currentType = {...currentMonth[type]};
      //   currentType[nameUpperCase] = overall;
      //   currentMonth[type] = currentType;

      //   currentUser[month] = currentMonth;
      // }
      // currentUser = {[id]: currentUser};
      // console.log(`🚀 ~ file: budget-slice.js ~ line 115 ~ currentUser`, currentUser);
      // const newBudget = {...state.budget};
      // console.log(`🚀 ~ file: budget-slice.js ~ line 117 ~ newBudget`, newBudget[id]);
      return {
        ...state,
        budgetUpdated: {...allBudget}
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

export const selectAllBudgetState = (state) => state.budget.budget;
export const selectUpdatedBudgetState = (state) => state.budget.budgetUpdated;

// export const selectAllBudgetState = (state) => {
//   const allBudget = allBudgetState(state);
//   // console.log(`🚀 ~ file: budget-slice.js ~ line 156 ~ selectAllBudgetState ~ allBudget`, allBudget);
//   const userId = selectUserId(state);

//   return allBudget
//           .find((item) => item[userId])
// };

export const {
  updateBudget,
} = budgetSlice.actions;

export default budgetSlice.reducer;
