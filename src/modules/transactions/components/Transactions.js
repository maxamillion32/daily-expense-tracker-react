import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

import {
  loadTransactions,
  selectAllTransactionsState,
  showButton, isLoading
} from "../../../reducers/transactions/transactions-slice";
import {selectUserId} from "../../../reducers/user/user-slice";
import classes from "./Transactions.module.css";

import Search from "../../transactions/components/Search/Search";
import Balance from "../../transactions/components/Balance/Balance";
import TransactionsListContainer from "../../../modules/transactions/components/Transactions/List/ListContainer";
import Loader from "../../common/components/Loader/Loader";
import Welcome from "../../welcome-screen/components/Welcome";

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
        <section className={classes.Transactions}>
          <Balance transactions={allTransactions} />
          <Search />
          <TransactionsListContainer />
        </section>
      }
      {!userId &&
        <Welcome />
      }
    </>
  );
}

export default Transactions;
