import React, {createContext, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {selectUserId} from "../reducers/user/user-slice";
import {loadTransactions, selectAllTransactionsState, selectFilteredTransactions} from "../reducers/transactions/transactions-slice";
import {loadCategories, selectAllCategoriesState} from "../reducers/categories/categories-slice";
import {loadAccounts, selectAllAccountsState} from "../reducers/accounts/accounts-slice";

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTransactions(userId));
    dispatch(loadCategories(userId));
    dispatch(loadAccounts(userId));
  }, [userId]);

  const getCategories = useSelector(selectAllCategoriesState);
  const getAccounts = useSelector(selectAllAccountsState);
  const getTransactions = useSelector(selectAllTransactionsState);
  const getFilteredTransactions = useSelector(selectFilteredTransactions);
  const transactions = [...getTransactions];
  const filteredTransactions = [...getFilteredTransactions];
  const categories = [...getCategories];
  const accounts = [...getAccounts];

  const state = {transactions, filteredTransactions, categories, accounts};

  return (
    <AppContext.Provider value={state}>
      {children}
    </AppContext.Provider>
  );
};
