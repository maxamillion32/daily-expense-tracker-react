import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {
  loadTransactions,
  selectAllTransactionsState,
  showButton,
} from '../../reducers/transactions/transactions-slice'
import {selectUserId} from '../../reducers/user/user-slice';

import Search from '../../components/Search/Search';
import Balance from '../../components/Balance/Balance';
import TransactionsListContainer from '../../components/Transactions/List/ListContainer';
import Loader from '../../components/UI/Loader/Loader';

function Transactions() {
  const allTransactions = useSelector(selectAllTransactionsState);
  const userId = useSelector(selectUserId);
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
      {!allTransactions.length && userId && <Loader />}
      {!!allTransactions.length &&
        <>
          <Balance transactions={allTransactions} />
          <Search />
          <TransactionsListContainer />
        </>
      }
    </>
  );
}

export default Transactions;
