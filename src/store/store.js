import {configureStore} from "@reduxjs/toolkit";

import transactionsReducer from '../reducers/transactions/transactions-slice';
import categoriesReducer from '../reducers/categories/categories-slice';
import accountsReducer from '../reducers/accounts/accounts-slice';
import searchTermReducer from '../reducers/search/search-slice';
import budgetTermReducer from '../reducers/budget/budget-slice';

export default configureStore({
  reducer: {
    transactions: transactionsReducer,
    categories: categoriesReducer,
    accounts: accountsReducer,
    searchTerm: searchTermReducer,
    budget: budgetTermReducer,
  },
});
