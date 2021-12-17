import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import CategoryDataService from '../../services/category.service';
import {categories} from '../../services/mocks/mocks';

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
    allCategories: categories,
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
    },
    editCategory: (state, action) => {
      const categories = [...state.allCategories];
      const newCategories = categories.map(category => {
          if (category.id === action.payload.id) {
            return action.payload;
          }
          return category;
        })

      return {
        ...state,
        allCategories: newCategories
      };
    },
    createCategory: (state, action) => {
      return {
        ...state,
        allCategories: [
          ...state.allCategories,
          ...action.payload
        ]
      };
    },
    deleteCategory: (state, action) => {
      const id = action.payload;
      const newCategories = [...state.allCategories].filter((item) => item.id !== id)
      return {
        ...state,
        allCategories: [
          ...newCategories
        ]
      };
    },
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

export const {addCategory, editCategory, createCategory, deleteCategory} = categoriesSlice.actions;
export default categoriesSlice.reducer;
