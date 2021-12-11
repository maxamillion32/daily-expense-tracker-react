import React from 'react';
import {useSelector} from 'react-redux';

import {
  // loadTransactions,
  selectFilteredTransactions,
  selectAllTransactionsState
} from '../../reducers/transactions/transactions-slice'
// import {loadCategories} from '../../reducers/categories/categories-slice'
// import {loadAccounts} from '../../reducers/accounts/accounts-slice'

import Search from '../../components/Search/Search';
import Balance from '../../components/Balance/Balance';
import TransactionsListContainer from '../../components/Transactions/List/ListContainer';
// import { transactions } from '../../services/mocks/mocks';

export const TransactionsContext = React.createContext();

function Transactions() {
  const allTransactions = useSelector(selectAllTransactionsState);
  const filteredTransactions = useSelector(selectFilteredTransactions);
  // const dispatch = useDispatch();


  // useEffect(() => {
  //   dispatch(loadTransactions());
  //   dispatch(loadCategories());
  //   dispatch(loadAccounts());
  //   // eslint-disable-next-line
  // }, []);

  return (
    <>
      <Balance transactions={allTransactions} />
      <Search />
      <TransactionsContext.Provider value={filteredTransactions}>
        <TransactionsListContainer />
      </TransactionsContext.Provider>
    </>
  );
}

export default Transactions;
