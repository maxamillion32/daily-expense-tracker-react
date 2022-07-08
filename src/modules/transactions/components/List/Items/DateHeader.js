import React from "react";

import classes from "../Container.module.css";

import {
  formatDay,
  formatMonthYear,
  formatWeekday
} from "../../../../common/utils/utils";

function TransactionsDateHeader({date, transactions}) {
  const transactionsDay = transactions
    .filter((transaction) => transaction.date === date);
  const expenseBalance = transactionsDay
    .filter((transaction) => transaction.expense === true)
    .map((transaction) => transaction.sum)
    .reduce((acc, transaction) => acc + transaction, 0);
  const incomeBalance = transactionsDay
    .filter((transaction) => transaction.expense === false)
    .map((transaction) => transaction.sum)
    .reduce((acc, transaction) => acc + transaction, 0);
  const overallBalance = Math.round((incomeBalance - expenseBalance) * 100) / 100;

  return (
    <div className={classes.TransactionsHeader}>
      <div className={classes.TransactionsDateContent}>
          <p>{formatDay(date)}</p>
          <div className={classes.TransactionsDateWrapper}>
            <p>{formatWeekday(date)}</p>
            <p>{formatMonthYear(date)}</p>
          </div>
        </div>
      {overallBalance === 0
        ? "0 €"
        : <p>{overallBalance < 0 ? "" : "+"}{overallBalance} €</p>}
    </div>
  );
}

export default TransactionsDateHeader;
