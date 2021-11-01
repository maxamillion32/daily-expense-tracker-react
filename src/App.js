import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {loadTransactions, selectFilteredTransactions, selectAllTransactionsState} from './reducers/transactions/transactions-slice'
import {loadCategories, selectAllCategoriesState} from './reducers/categories/categories-slice'
import {loadAccounts, selectAllAccountsState} from './reducers/accounts/accounts-slice'

import Search from './components/Search/Search';
import TransactionCreateForm from './components/Transactions/CreateForm/Form';
import Balance from './components/Balance/Balance';
import TransactionsList from './components/Transactions/List';

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
    <div className="container">
      <main className="page-main">
        <Search />
        <TransactionCreateForm
          categories={allCategories}
          accounts={allAccounts}
          />
        <Balance transactions={allTransactions} />
        <TransactionsList transactions={filteredTransactions} />
      </main>
    </div>
  );
}

export default App;
