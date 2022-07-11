import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../store/store";

interface NavigationState {
  isAddButtonClick: boolean,
  isButtonShow: boolean,
  IsTransactionTypeClick: boolean,
}

const initialState: NavigationState = {
  isAddButtonClick: false,
  isButtonShow: false,
  IsTransactionTypeClick: false,
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setIsButtonShow: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isButtonShow: action.payload,
      };
    },
    setIsAddButtonClick: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isAddButtonClick: action.payload,
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

export const selectIsAddButtonClick = (state: RootState) => state.navigation.isAddButtonClick;
export const selectIsButtonShow = (state: RootState) => state.navigation.isButtonShow;
export const selectIsTransactionTypeClick = (state: RootState) => state.navigation.IsTransactionTypeClick;

export const {
  setIsAddButtonClick,
  setIsButtonShow,
  setIsTransactionTypeClick
} = navigationSlice.actions;
export default navigationSlice.reducer;
