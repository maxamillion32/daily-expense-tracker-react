import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../store/store";


export const searchTermSlice = createSlice({
  name: "searchTerm",
  initialState: "",
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      return action.payload;
      },
    clearSearchTerm: () => {
      return "";
      }
    },
});

export const selectSearchTerm = (state: RootState) => state.searchTerm;

export const {
  setSearchTerm,
  clearSearchTerm
} = searchTermSlice.actions;
export default searchTermSlice.reducer;
