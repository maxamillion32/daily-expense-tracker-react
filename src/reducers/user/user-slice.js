import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: "",
    isDemoAccount: false
  },
  reducers: {
    setUserId: (state, action) => {
      return {
        ...state,
        userId: action.payload,
      };
    },
    setIsDemoAccount: (state, action) => {
      return {
        ...state,
        isDemoAccount: action.payload,
      };
    },
  },
  extraReducers: {},
});

export const selectUserId = (state) => state.user.userId;
export const selectIsDemoAccount = (state) => state.user.isDemoAccount;

export const {setUserId, setIsDemoAccount} = userSlice.actions;
export default userSlice.reducer;
