import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

import classes from "./Container.module.css";

import {
  loadTransactions,
  selectAllTransactionsState,
  showButton, isLoading
} from "../../../reducers/transactions/transactions-slice";
import {
  selectUserId
} from "../../../reducers/user/user-slice";

import Search from "./Search/Search";
import Balance from "./Balance/Balance";
import TransactionsListContainer from "./List/Container";
import Loader from "../../common/components/Loader/Loader";
import Welcome from "../../welcome/components/Welcome";

function TransactionsContainer() {
  const loading = useSelector(isLoading);
  const userId = useSelector(selectUserId);
  const transactions = useSelector(selectAllTransactionsState);
  const dispatch = useDispatch();

  const isLoader = loading && userId;
  const isTransactions = transactions.length !== 0;

  useEffect(() => {
    dispatch(showButton(true));
    dispatch(loadTransactions(userId));
    return () => {
      dispatch(showButton(false));
    };
  }, [userId]);

  return (
    <>
      {isLoader
        ? <Loader />
        : null}
      {!isLoader && userId
        ? <section className={classes.Container}>
            <Balance />
            {isTransactions ? <Search /> : null}
            <TransactionsListContainer />
          </section>
        : null}
      {!userId ? <Welcome /> : null}
    </>
  );
}

export default TransactionsContainer;
