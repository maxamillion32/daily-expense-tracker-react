import {configureStore} from "@reduxjs/toolkit";

import transactionsReducer from "../reducers/transactions/transactions-slice";
import categoriesReducer from "../reducers/categories/categories-slice";
import accountsReducer from "../reducers/accounts/accounts-slice";
import searchTermReducer from "../reducers/search/search-slice";
import navigationReducer from "../reducers/navigation/navigation-slice";
import budgetReducer from "../reducers/budget/budget-slice";
import userReducer from "../reducers/user/user-slice";

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    categories: categoriesReducer,
    accounts: accountsReducer,
    searchTerm: searchTermReducer,
    navigation: navigationReducer,
    budget: budgetReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
