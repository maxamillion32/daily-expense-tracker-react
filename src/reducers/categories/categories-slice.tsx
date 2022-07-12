import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";

import {getAll, create, deleteId, update} from "../../services/category-service";
import {ICategory} from "../../models/models";
import {RootState} from "../../store/store";

export const loadCategories = createAsyncThunk(
  "categories/loadData",
  async (userId: string) => {
    return await getAll(userId);
  }
);

export const postCategory = createAsyncThunk(
  "categories/addData",
  async (newCategory: ICategory) => {
    return await create(newCategory);
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateData",
  async (data: ICategory) => {
    const {id} = data;
    return await update(id, data);
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteData",
  async (categoryId: string) => {
    return await deleteId(categoryId);
  }
);

interface CategoryState {
  allCategories: ICategory[],
  newCategory: {
    title: string,
  },
  popupItem: ICategory[],
  popupPrevItem: ICategory[],
  isLoading: boolean,
}

const initialState: CategoryState = {
  allCategories: [],
  newCategory: {
    title: "",
  },
  popupItem: [],
  popupPrevItem: [],
  isLoading: false,
};

  export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: {
    [loadCategories.pending.type]: (state) => {
      state.isLoading = true;
    },
    [loadCategories.fulfilled.type]: (state, action: PayloadAction<ICategory[]>) => {
      state.allCategories = action.payload;
      state.isLoading = false;
    },
    [loadCategories.rejected.type]: (state) => {
      state.isLoading = false;
    },
  },
});

export const selectAllCategories = (state: RootState) => state.categories.allCategories;
export const selectNewCategoryState = (state: RootState) => state.categories.newCategory;
export const selectIsLoading = (state: RootState) => state.categories.isLoading;

export const selectFilteredCategories = (state: RootState) => {
  const allCategories = [...selectAllCategories(state)];

  return allCategories
    .filter((category) => category.hidden !== true)
    .sort((a, b) => b.title.toLowerCase() > a.title.toLowerCase() ? -1 : 1);
};

export const findIncomesBalanceCategory = (state: RootState) => {
  const allCategories = [...selectAllCategories(state)];

  return allCategories.find((category) => category.title === "Balance" && category.incomes === true);
};

export const findExpensesBalanceCategory = (state: RootState) => {
  const allCategories = [...selectAllCategories(state)];

  return allCategories.find((category) => category.title === "Balance" && category.incomes === true);
};

export const findTransferCategory = (state: RootState) => {
  const allCategories = [...selectAllCategories(state)];

  return allCategories.find((category) => category.title === "Transfer");
};

export default categoriesSlice.reducer;
