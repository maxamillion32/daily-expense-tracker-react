import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";

import classes from "./Container.module.css";

import {
  loadTransactions,
  selectAllTransactionsState,
  showButton, isLoading, currentYear
} from "../../../reducers/transactions/transactions-slice";
import {
  selectUserId
} from "../../../reducers/user/user-slice";

import Search from "./Search/Search";
import Balance from "./Balance/Balance";
import TransactionsListContainer from "./List/Container";
import Loader from "../../common/components/Loader/Loader";
import Welcome from "../../welcome/components/Welcome";
import Chart from "./Chart/Chart";
import {MONTH_EXPENSES} from "../../statistics/components/YearExpenses/constant";
import {formatMonth, formatYear} from "../../common/utils/utils";
import {getMaxAmountPerYear} from "../../common/utils/utils";

const getExpenses = (year, transactions, toggle) => {
  return MONTH_EXPENSES.map(item => {
    const month = item ? {name: item.toString().substr(0, 3)} : null;
    const prevYear = (+year-1).toString();

    return {
      ...month,
      current: transactions
        .filter((transaction) => formatYear(transaction.date) === year)
        .filter(transaction => formatMonth(transaction.date) === item)
        .map((transaction) => (toggle ? transaction.expense : !transaction.expense)
        ? transaction = +transaction.sum
        : transaction = null)
        .reduce((acc, sum) => acc + sum, 0).toFixed(2),
      previous: transactions
        .filter((transaction) => formatYear(transaction.date) === prevYear)
        .filter(transaction => formatMonth(transaction.date) === item)
        .map((transaction) => (toggle ? transaction.expense : !transaction.expense)
        ? transaction = +transaction.sum
        : transaction = null)
        .reduce((acc, sum) => acc + sum, 0).toFixed(2)
    };
  });
};

function TransactionsContainer() {
  const loading = useSelector(isLoading);
  const userId = useSelector(selectUserId);
  const transactions = useSelector(selectAllTransactionsState);
  const year = useSelector(currentYear);
  const dispatch = useDispatch();

  const [toggle, setToggle] = useState(true);

  const isLoader = loading && userId;
  const isTransactions = transactions.length !== 0;

  const data = getExpenses(year, transactions, toggle);

  const maxMonthExpensePerYear = getMaxAmountPerYear(year, "expenses", transactions);
  const maxMonthIncomePerYear = getMaxAmountPerYear(year, "income", transactions);

  const header = toggle ? "Expenses" : "Incomes";
  const yRange = toggle ? maxMonthExpensePerYear : maxMonthIncomePerYear;

  const handleClick = () => {
    setToggle(prev => !prev);
  };

  useEffect(() => {
    dispatch(showButton(true));
    dispatch(loadTransactions(userId));
    return () => {
      dispatch(showButton(false));
    };
  }, [userId]);

  return (
    <>
      {userId
        ? <section className={classes.Container}>
            {isLoader
              ? <Loader />
              : <>
                  <Chart data={data} onClick={handleClick} header={header} yRange={yRange} />
                  <Balance />
                </>
              }
            {isTransactions ? <Search /> : null}
            <TransactionsListContainer />
          </section>
        : <Welcome />
      }
    </>
  );
}

export default TransactionsContainer;
