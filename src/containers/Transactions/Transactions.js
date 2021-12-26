import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {
  loadTransactions,
  selectAllTransactionsState,
  showButton,
} from '../../reducers/transactions/transactions-slice'

import Search from '../../components/Search/Search';
import Balance from '../../components/Balance/Balance';
import TransactionsListContainer from '../../components/Transactions/List/ListContainer';

function Transactions() {
  const allTransactions = useSelector(selectAllTransactionsState);
  console.log(`🚀 ~ file: Transactions.js ~ line 16 ~ Transactions ~ allTransactions`, allTransactions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showButton());
    dispatch(loadTransactions());
    return () => {
      dispatch(showButton());
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Balance transactions={allTransactions} />
      {
        !!allTransactions.length && <Search />
      }
      <TransactionsListContainer />
    </>
  );
}

export default Transactions;
