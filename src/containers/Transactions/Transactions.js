import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {
  loadTransactions,
  selectAllTransactionsState,
  showButton, isLoading
} from '../../reducers/transactions/transactions-slice'
import {selectUserId} from '../../reducers/user/user-slice';

import Search from '../../components/Search/Search';
import Balance from '../../components/Balance/Balance';
import TransactionsListContainer from '../../components/Transactions/List/ListContainer';
import Loader from '../../components/UI/Loader/Loader';
import Welcome from '../../components/Welcome/Welcome';

function Transactions() {
  const allTransactions = useSelector(selectAllTransactionsState);
  const loading = useSelector(isLoading);
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
      {loading && userId && <Loader />}
      {!loading && userId &&
        <>
          <Balance transactions={allTransactions} />
          <Search />
          <TransactionsListContainer />
        </>
      }
      {!userId &&
        <Welcome />
      }
    </>
  );
}

export default Transactions;
