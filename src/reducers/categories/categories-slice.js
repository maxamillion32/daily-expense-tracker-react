import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {getAll, create, deleteId, update} from '../../services/category.service';
// import {categories} from '../../services/mocks/mocks';l

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
  reducers: {
    // addCategory: (state, action) => {
    //   return {
    //     ...state,
    //     newCategory: {
    //       ...state.newCategory,
    //       title: action.payload,
    //     }
    //   };
    // },
    // editCategory: (state, action) => {
    //   const categories = [...state.allCategories];
    //   const newCategories = categories.map(category => {
    //       if (category.id === action.payload.id) {
    //         return action.payload;
    //       }
    //       return category;
    //     })

    //   return {
    //     ...state,
    //     allCategories: newCategories
    //   };
    // },
    // createCategory: (state, action) => {
    //   return {
    //     ...state,
    //     allCategories: [
    //       ...state.allCategories,
    //       ...action.payload
    //     ]
    //   };
    // },
    // deleteCategory: (state, action) => {
    //   const id = action.payload;
    //   const newCategories = [...state.allCategories].filter((item) => item.id !== id)
    //   return {
    //     ...state,
    //     allCategories: [
    //       ...newCategories
    //     ]
    //   };
    // },
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

    [postCategory.pending]: (state) => {
      state.isPending = true;
      state.isFailedToCreate = false;
    },
    [postCategory.fulfilled]: (state) => {
      state.newCategory = {
        title: ``,
      }
      state.isPending = false;
      state.isFailedToCreate = false;
    },
    [postCategory.rejected]: (state) => {
      state.isPending = false;
      state.isFailedToCreate = true;
    },

    [updateCategory.pending]: (state) => {
      state.isPending = true;
      state.isFailedToCreate = false;
    },
    [updateCategory.fulfilled]: (state) => {
      state.newCategory = {
        title: ``,
      }
      state.isPending = false;
      state.isFailedToCreate = false;
    },
    [updateCategory.rejected]: (state) => {
      state.isPending = false;
      state.isFailedToCreate = true;
    },

    [deleteCategory.pending]: (state) => {
      state.isPending = true;
      state.isFailedToCreate = false;
    },
    [deleteCategory.fulfilled]: (state) => {
      // state.newCategory = {
      //   title: ``,
      // }
      state.isPending = false;
      state.isFailedToCreate = false;
    },
    [deleteCategory.rejected]: (state) => {
      state.isPending = false;
      state.isFailedToCreate = true;
    }
  },
});

export const selectAllCategoriesState = (state) => state.categories.allCategories;
export const selectNewCategoryState = (state) => state.categories.newCategory;
export const isLoading = (state) => state.categories.isLoading;
export const isPending = (state) => state.categories.isPending;

export const {addCategory, editCategory, createCategory} = categoriesSlice.actions;
export default categoriesSlice.reducer;
