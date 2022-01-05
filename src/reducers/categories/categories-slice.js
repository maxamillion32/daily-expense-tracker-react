import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {getAll, create, deleteId, update} from '../../services/category.service';
import {selectUserId} from '../user/user-slice';

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
  async (data) => {
    const {id} = data;
    return await update(id, data);
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
    popupItem: {},
    popupPrevItem: {},
    isLoading: false,
    hasError: false,
    isPending: false,
    isFailedToCreate: false,
  },
  reducers: {
    setPopupItem: (state, action) => {
      return {
        ...state,
        popupItem: action.payload,
      };
    },
    setPopupPrevItem: (state, action) => {
      return {
        ...state,
        popupPrevItem: action.payload,
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
  },
});

export const allCategoriesState = (state) => state.categories.allCategories;
export const selectNewCategoryState = (state) => state.categories.newCategory;
export const selectPopupItemState = (state) => state.categories.popupItem;
export const selectPopupPrevItemState = (state) => state.categories.popupPrevItem;
export const isLoading = (state) => state.categories.isLoading;
export const isPending = (state) => state.categories.isPending;

export const selectAllCategoriesState = (state) => {
  const allCategories = allCategoriesState(state);
  const userId = selectUserId(state);

  return allCategories
          .filter((transaction) => transaction.userId === userId)
};

export const {setPopupItem, setPopupPrevItem} = categoriesSlice.actions;
export default categoriesSlice.reducer;
