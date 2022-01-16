import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

import classes from "./Container.module.css";

import {
  loadTransactions,
  // selectAllTransactionsState,
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
  const dispatch = useDispatch();

  const isLoader = loading && userId;

  useEffect(() => {
    dispatch(showButton());
    dispatch(loadTransactions(userId));
    return () => {
      dispatch(showButton());
    };
    // eslint-disable-next-line
  }, [dispatch, userId]);

  return (
    <>
      {isLoader
        ? <Loader />
        : null}
      {!isLoader && userId
        ? <section className={classes.Container}>
            <Balance />
            <Search />
            <TransactionsListContainer />
          </section>
        : null}
      {!userId ? <Welcome /> : null}
    </>
  );
}

export default TransactionsContainer;
