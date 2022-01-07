import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: "",
  },
  reducers: {
    setUserId: (state, action) => {
      return {
        userId: action.payload,
      };
    },
  },
  extraReducers: {},
});

export const selectUserId = (state) => state.user.userId;

export const {setUserId} = userSlice.actions;
export default userSlice.reducer;
