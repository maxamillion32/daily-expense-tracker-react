import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

import {getAll, create, deleteId, update} from "../../services/category-service";

export const loadCategories = createAsyncThunk(
  "categories/loadData",
  async (userId) => {
    return await getAll(userId);
  }
);

export const postCategory = createAsyncThunk(
  "categories/addData",
  async (newCategory) => {
    return await create(newCategory);
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateData",
  async (data) => {
    const {id} = data;
    return await update(id, data);
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteData",
  async (categoryId) => {
    return await deleteId(categoryId);
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    allCategories: [],
    newCategory: {
      title: "",
    },
    popupItem: {},
    popupPrevItem: {},
    isLoading: false,
    hasError: false,
    isPending: false,
    isFailedToCreate: false,
  },
  reducers: {},
  extraReducers: {
    [loadCategories.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [loadCategories.fulfilled]: (state, action) => {
      state.allCategories = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [loadCategories.rejected]: (state) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

export const selectAllCategories = (state) => state.categories.allCategories;
export const selectNewCategoryState = (state) => state.categories.newCategory;
export const isCategoriesLoading = (state) => state.categories.isLoading;
export const isPending = (state) => state.categories.isPending;

export const selectFilteredCategories = (state) => {
  const allCategories = [...selectAllCategories(state)];

  return allCategories
    .filter((category) => category.hidden !== true)
    .sort((a, b) => b.title.toLowerCase() > a.title.toLowerCase() ? -1 : 1);
};

export const getBalanceIncomesId = (state) => {
  const allCategories = [...selectAllCategories(state)];

  return allCategories.find((category) => category.title === "Balance" && category.incomes === true);
};

export const getBalanceExpensesId = (state) => {
  const allCategories = [...selectAllCategories(state)];

  return allCategories.find((category) => category.title === "Balance" && category.incomes === true);
};

export default categoriesSlice.reducer;
