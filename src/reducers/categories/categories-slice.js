import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {getAll, create, deleteId, update} from '../../services/category.service';

export const loadCategories = createAsyncThunk(
  'categories/loadData',
  async () => {
    return await getAll();
  }
)

export const postCategory = createAsyncThunk(
  'categories/addData',
  async (newCategory) => {
    return await create(newCategory);
  }
)

export const updateCategory = createAsyncThunk(
  'categories/updateData',
  async ({id, title}) => {
    return await update(id, title);
  }
)

export const deleteCategory = createAsyncThunk(
  'categories/deleteData',
  async (categoryId) => {
    return await deleteId(categoryId);
  }
)

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    allCategories: [],
    newCategory: {
      title: ``,
    },
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

export const selectAllCategoriesState = (state) => state.categories.allCategories;
export const selectNewCategoryState = (state) => state.categories.newCategory;
export const isLoading = (state) => state.categories.isLoading;
export const isPending = (state) => state.categories.isPending;

export const {addCategory, editCategory, createCategory} = categoriesSlice.actions;
export default categoriesSlice.reducer;
