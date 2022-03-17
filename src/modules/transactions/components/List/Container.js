import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

import {isAddButtonClick, setIsButtonShow} from "../../../../reducers/transactions/transactions-slice";

import {formatYear} from "../../../common/utils/utils";
import TransactionsItemsYearGroup from "./Items/YearGroup";
import classes from "./Container.module.css";

function TransactionsListContainer({isLoading, transactions, filteredTransactions, categories, accounts}) {
  const getIsAddButtonClick = useSelector(isAddButtonClick);
  const dispatch = useDispatch();

  const isEmpty = categories.length === 0 || accounts.length === 0;
  const years = [...new Set(transactions.map(date => formatYear(date.date)))];

  const handleNavigation = (event) => {
      if (event.deltaY > 0) {
          dispatch(setIsButtonShow(false));
      } else if (event.deltaY < 0) {
          dispatch(setIsButtonShow(true));
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
            dispatch(setIsButtonShow(false)); //up swipe
          } else {
            dispatch(setIsButtonShow(true)); //down swipe
          }
      }
      //reset values
      xDown = null;
      yDown = null;
  }

  useEffect(() => {
    document.addEventListener("wheel", handleNavigation, false);
    document.addEventListener("touchstart", handleTouchStart, false);
    document.addEventListener("touchmove", handleTouchMove, false);

    if (getIsAddButtonClick) {
      document.removeEventListener("wheel", handleNavigation, false);
      document.removeEventListener("touchstart", handleTouchStart, false);
      document.removeEventListener("touchmove", handleTouchMove, false);
    }
    return () => {
      document.removeEventListener("wheel", handleNavigation, false);
      document.removeEventListener("touchstart", handleTouchStart, false);
      document.removeEventListener("touchmove", handleTouchMove, false);
    };
  }, [getIsAddButtonClick]);

  return (
    <section className="transactions">
      {!isLoading && isEmpty
        ? <p className={classes.Message}>
            Create categories and accounts
            <br/>
            in the settings to be able to add transactions
          </p>
        : null}
      {!isLoading && !isEmpty && transactions.length === 0
        ? <p className={classes.Message}>
            Create your first transaction!
          </p>
        : null}
      {years.map((year) =>
        <TransactionsItemsYearGroup filteredTransactions={filteredTransactions} year={year} key={year} />
      )}
    </section>
  );
}

export default TransactionsListContainer;
