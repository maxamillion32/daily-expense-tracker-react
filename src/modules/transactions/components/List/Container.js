import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

import {selectFilteredTransactions, isButtonClick, showButton} from "../../../../reducers/transactions/transactions-slice";
import {selectAllCategoriesState} from "../../../../reducers/categories/categories-slice";
import {selectAllAccountsState} from "../../../../reducers/accounts/accounts-slice";

import {formatYear} from "../../../common/utils/utils";
import TransactionsItemsYearGroup from "./Items/YearGroup";
import classes from "./Container.module.css";

function TransactionsListContainer({isLoading}) {
  const getCategories = useSelector(selectAllCategoriesState);
  const getAccounts = useSelector(selectAllAccountsState);
  const clickAddButton = useSelector(isButtonClick);
  const categories = [...getCategories];
  const accounts = [...getAccounts];
  const dispatch = useDispatch();

  const isEmpty = categories.length === 0 || accounts.length === 0;

  const transactions = useSelector(selectFilteredTransactions);
  const years = [...new Set(transactions
    .map(date => formatYear(date.date)))];

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
    document.addEventListener("wheel", handleNavigation, false);
    document.addEventListener("touchstart", handleTouchStart, false);
    document.addEventListener("touchmove", handleTouchMove, false);

    if (clickAddButton) {
      document.removeEventListener("wheel", handleNavigation, false);
      document.removeEventListener("touchstart", handleTouchStart, false);
      document.removeEventListener("touchmove", handleTouchMove, false);
    }
    return () => {
      document.removeEventListener("wheel", handleNavigation, false);
      document.removeEventListener("touchstart", handleTouchStart, false);
      document.removeEventListener("touchmove", handleTouchMove, false);
    };
  }, [clickAddButton]);

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
        <TransactionsItemsYearGroup year={year} key={year} />
      )}
    </section>
  );
}

export default TransactionsListContainer;
