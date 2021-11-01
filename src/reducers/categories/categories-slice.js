import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import CategoryDataService from '../../services/category.service';

export const loadCategories = createAsyncThunk(
  'categories/loadData',
  async () => {
    const data = await CategoryDataService.getAll();
    const json = await data;
    return json;
  }
)

export const postCategories = createAsyncThunk(
  'categories/addData',
  async (newCategory) => {
    const data = await CategoryDataService.create(newCategory);
    const json = await data;
    return json;
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
  reducers: {
    addCategory: (state, action) => {
      return {
        ...state,
        newCategory: {
          ...state.newCategory,
          title: action.payload,
        }
      };
    }
  },
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

    [postCategories.pending]: (state) => {
      state.isPending = true;
      state.isFailedToCreate = false;
    },
    [postCategories.fulfilled]: (state) => {
      state.newCategory = {
        title: ``,
      }
      state.isPending = false;
      state.isFailedToCreate = false;
    },
    [postCategories.rejected]: (state) => {
      state.isPending = false;
      state.isFailedToCreate = true;
    }
  },
});

export const selectAllCategoriesState = (state) => state.categories.allCategories;
export const selectNewCategoryState = (state) => state.categories.newCategory;
export const isLoading = (state) => state.categories.isLoading;
export const isPending = (state) => state.categories.isPending;

export const {addCategory} = categoriesSlice.actions;
export default categoriesSlice.reducer;
