import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Layout from '../src/hoc/Layout/Layout'

import {loadTransactions, selectFilteredTransactions, selectAllTransactionsState} from './reducers/transactions/transactions-slice'
import {loadCategories, selectAllCategoriesState} from './reducers/categories/categories-slice'
import {loadAccounts, selectAllAccountsState} from './reducers/accounts/accounts-slice'

import Search from './components/Search/Search';
import Balance from './components/Balance/Balance';
import TransactionsList from './components/Transactions/List';
import Menu from './components/Navigation/Menu/Menu';

function App() {
  const allTransactions = useSelector(selectAllTransactionsState);
  const filteredTransactions = useSelector(selectFilteredTransactions);
  const allCategories = useSelector(selectAllCategoriesState);
  const allAccounts = useSelector(selectAllAccountsState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTransactions());
    dispatch(loadCategories());
    dispatch(loadAccounts());
  }, [dispatch]);

  return (
    <Layout>
      <Search />
      <Balance transactions={allTransactions} />
      <TransactionsList transactions={filteredTransactions} />
      <Menu
        categories={allCategories}
        accounts={allAccounts}
      />
    </Layout>
  );
}

export default App;
