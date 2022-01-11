import React from "react";
import classes from "./MonthBalance.module.css";
import {formatMonth, formatYear} from "../../../common/utils/utils";

function WidgetsMonthBalance({currentYear, currentMonth, transactions}) {
  // move to utils
  const filteredTransactions = transactions
    .filter((transaction) => formatYear(transaction.date) === currentYear)
    .filter((transaction) => formatMonth(transaction.date) === currentMonth);

  const sumExpenses = filteredTransactions.map((transaction) => {
      return transaction.expense ? transaction = +transaction.sum : transaction = null;
    }).reduce((a, b) => a + b, 0).toFixed(2);

  const sumIncomes = filteredTransactions.map((item) => {
    return !item.expense ? item = +item.sum : item = null;
  }).reduce((a, b) => a + b, 0).toFixed(2);

  return (
    <section className={classes.MonthBalance}>
      <h2>{currentMonth}</h2>
      <ul className={classes.List}>
        <li className={classes.Wrapper}>
          <p>incomes:</p>
          <p className={classes.Balance}>+{sumIncomes} €</p>
        </li>
        <li className={classes.Wrapper}>
          <p>expenses:</p>
          <p className={classes.Balance}>-{sumExpenses} €</p>
        </li>
      </ul>
    </section>
  );
}

export default WidgetsMonthBalance;
