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

  const handleNavigation = (event) => {
      if (event.deltaY > 0) {
          dispatch(showButton(false));
      } else if (event.deltaY < 0) {
          dispatch(showButton(true));
      }
  };

  let xDown = null;
  let yDown = null;

  function getTouches(evt) {
    return evt.touches || evt.originalEvent.touches;
  }

  function handleTouchStart(evt) {
      const firstTouch = getTouches(evt)[0];
      xDown = firstTouch.clientX;
      yDown = firstTouch.clientY;
  }

  function handleTouchMove(evt) {
      if ( ! xDown || ! yDown ) {
          return;
      }

      const xUp = evt.touches[0].clientX;
      const yUp = evt.touches[0].clientY;

      const xDiff = xDown - xUp;
      const yDiff = yDown - yUp;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
          if ( xDiff > 0 ) {
               //left swipe
          } else {
              //right swipe
          }
      } else {
          if ( yDiff > 0 ) {
            dispatch(showButton(false)); //up swipe
          } else {
            dispatch(showButton(true)); //down swipe
          }
      }
      //reset values
      xDown = null;
      yDown = null;
  }

  useEffect(() => {
    dispatch(showButton(true));
    dispatch(loadTransactions(userId));

    document.addEventListener("wheel", handleNavigation, false);
    window.addEventListener("touchstart", handleTouchStart, false);
    window.addEventListener("touchmove", handleTouchMove, false);
    return () => {
      dispatch(showButton(false));
      document.removeEventListener("wheel", handleNavigation, false);
      window.removeEventListener("touchstart", handleTouchStart, false);
      window.removeEventListener("touchmove", handleTouchMove, false);
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
