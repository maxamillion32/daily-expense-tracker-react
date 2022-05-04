import {createSlice} from "@reduxjs/toolkit";

export const navigationSlice = createSlice({
  name: "navigation",
  initialState: {
    isAddButtonClick: false,
    isButtonShow: false,
    IsTransactionTypeClick: false,
  },
  reducers: {
    setIsButtonShow: (state, action) => {
      return {
        ...state,
        isButtonShow: action.payload === "" ? !state.isButtonShow : action.payload,
      };
    },
    setIsAddButtonClick: (state, action) => {
      return {
        ...state,
        isAddButtonClick: action.payload === "" ? !state.isAddButtonClick : action.payload,
      };
    },
    setIsTransactionTypeClick: (state) => {
      return {
        ...state,
        IsTransactionTypeClick: !state.IsTransactionTypeClick,
      };
    },
  },
});

export const selectIsAddButtonClick = (state) => state.navigation.isAddButtonClick;
export const selectIsButtonShow = (state) => state.navigation.isButtonShow;
export const selectIsTransactionTypeClick = (state) => state.navigation.IsTransactionTypeClick;

export const {
  setIsAddButtonClick,
  setIsButtonShow,
  setIsTransactionTypeClick
} = navigationSlice.actions;
export default navigationSlice.reducer;
