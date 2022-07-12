import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getAll, update} from "../../services/budget-service";
import {RootState} from "../../store/store";
import {IBudget} from "../../models/models";

const getOverall = (budget: [], type: string, month: string, year: any): number => {
    if (Object.keys(budget[year][month][type]).length === 0) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return;
    }

    const upperCase = type[0].toUpperCase() + type.slice(1);
    const balanceTotal: number = budget[year][month][type][upperCase];
    const balanceBudget: number = Object.values(budget[year][month][type])
      .reduce((a: any, b: any): any => +a + +b, 0) as number;

  return Math.abs((!balanceTotal ? 0 : balanceTotal) - balanceBudget);
  };

export const loadBudgets = createAsyncThunk(
  "budgets/loadData",
  async (userId: string) => {
    return await getAll(userId);
  }
);

type Data = {
  updatedBudget: IBudget,
  userId: string
}

export const postBudget = createAsyncThunk(
  "budgets/addData",
  async ({updatedBudget, userId}: Data)=> {

    return await update(userId, updatedBudget);
  }
);

type BudgetState = {
  budget: IBudget[],
  budgetUpdated: IBudget[],
  isLoading: boolean
}

const initialState: BudgetState = {
  budget: [],
  budgetUpdated: [],
  isLoading: false
};

export const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    //TODO: need refactoring
    updateBudget: (state, action: PayloadAction<{[key: string]: string}>) => {
      const type = action.payload.type;
      const name = action.payload.id;
      const nameUpperCase = type[0].toUpperCase() + type.slice(1);
      const value = +action.payload.value;
      const month = action.payload.month;
      const year = action.payload.year;
      const budget = action.payload.updatedBudget;

      //TODO: add type
      let current: any = [];

      current[year] = {[month]: {expenses: {}, incomes: {}}};
      const currentYear: any = {...current[year]};
      let currentMonth: any = {...currentYear[month]};
      currentMonth = {[type]: {}};
      const currentType: { [key: string]: number } = {...currentMonth[type]};
      currentType[name] = value;
      currentMonth[type] = currentType;
      currentYear[month] = {...current[year][month], ...currentMonth};

      if (!budget) {
        current[year] = {...currentYear};

        currentType[nameUpperCase] = Number(getOverall(current, type, month, year).toFixed(2));
        currentMonth[type] = currentType;
        currentYear[month] = {...currentMonth};
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (budget && (!budget[year] || !budget[year][month])) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        current[year] = {...budget[year], ...currentYear};
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        current = {...budget, ...current};

        currentType[nameUpperCase] = Number(getOverall(current, type, month, year).toFixed(2));
        currentMonth[type] = currentType;
        currentYear[month] ={...current[year][month], ...currentMonth};
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        current[year] = {...budget[year], ...currentYear};
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        current = {...budget, ...current};
      }


      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (budget && budget[year] && budget[year][month]) {
        current = {...JSON.parse(JSON.stringify(budget))};
        const currentYear = current[year];
        let currentMonth = {...currentYear[month]};
        currentMonth = {[type]: {}};
        const currentType = {...currentMonth[type]};
        currentType[name] = value;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        currentMonth[type] = {...budget[year][month][type], ...currentType};
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        currentYear[month] = {...budget[year][month], ...currentMonth};
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        current[year] = {...budget[month], ...currentYear};

        currentType[nameUpperCase] = Number(getOverall(current, type, month, year).toFixed(2));
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        currentMonth[type] = {...budget[year][month][type], ...currentType};
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        currentYear[month] = {...budget[year][month], ...currentMonth};
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        current[year] = {...budget[month], ...currentYear};
      }

      return {
        ...state,
        budgetUpdated: {...current}
      };
    },
  },

  extraReducers: {
    [loadBudgets.pending.type]: (state) => {
      state.isLoading = true;
    },
    [loadBudgets.fulfilled.type]: (state, action) => {
      state.budget = action.payload;
      state.budgetUpdated = action.payload;
      state.isLoading = false;
    },
    [loadBudgets.rejected.type]: (state) => {
      state.isLoading = false;
    },
  },
});

export const selectAllBudgetState = (state: RootState) => state.budget.budget;
export const selectUpdatedBudgetState = (state: RootState) => state.budget.budgetUpdated;
// export const isLoading = (state) => state.budget.isLoading;

export const {updateBudget} = budgetSlice.actions;
export default budgetSlice.reducer;
