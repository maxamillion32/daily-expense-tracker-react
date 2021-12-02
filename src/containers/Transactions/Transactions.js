import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {loadTransactions, selectFilteredTransactions, selectAllTransactionsState} from '../../reducers/transactions/transactions-slice'
import {loadCategories} from '../../reducers/categories/categories-slice'
import {loadAccounts} from '../../reducers/accounts/accounts-slice'

import Search from '../../components/Search/Search';
import Balance from '../../components/Balance/Balance';
import TransactionsList from '../../components/Transactions/List';

function Transactions() {
  const allTransactions = useSelector(selectAllTransactionsState);
  const filteredTransactions = useSelector(selectFilteredTransactions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTransactions());
    dispatch(loadCategories());
    dispatch(loadAccounts());
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Search />
      <Balance transactions={allTransactions} />
      <TransactionsList transactions={filteredTransactions} />
    </>
  );
}

export default Transactions;
