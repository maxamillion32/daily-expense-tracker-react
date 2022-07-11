import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../store/store";

interface UserState {
  userId: string,
  isDemoAccount: boolean
}

const initialState: UserState = {
  userId: "",
  isDemoAccount: false
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        userId: action.payload,
      };
    },
    setIsDemoAccount: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isDemoAccount: action.payload,
      };
    },
  },
  extraReducers: {},
});

export const selectUserId = (state: RootState) => state.user.userId;
export const selectIsDemoAccount = (state: RootState) => state.user.isDemoAccount;

export const {setUserId, setIsDemoAccount} = userSlice.actions;
export default userSlice.reducer;
