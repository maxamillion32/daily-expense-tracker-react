import React, {useMemo} from "react";
import {useSelector} from "react-redux";
import classes from "./MonthBalance.module.css";
import {
  selectCurrentMonth,
  selectCurrentYear, selectFilteredTransactions
} from "../../../../reducers/transactions/transactions-slice";
import {formatMonth, formatYear} from "../../../common/utils/utils";

const BalanceItem = ({sum, title}) => (
  <li className={classes.Wrapper}>
    <p>{title}:</p>
    <p className={classes.Balance}>{title === "incomes" ? "+" : "-"}{sum} €</p>
  </li>
);

function WidgetsMonthBalance() {
  const transactions = useSelector(selectFilteredTransactions);
  const currentMonth = useSelector(selectCurrentMonth);
  const currentYear = useSelector(selectCurrentYear);

  // move to utils
  const filteredTransactions = useMemo(() => transactions
    .filter((transaction) => formatYear(transaction.date) === currentYear)
    .filter((transaction) => formatMonth(transaction.date) === currentMonth), [currentMonth, currentYear]);

  const sumExpenses = useMemo(() => filteredTransactions.map((transaction) => {
      return transaction.expense ? transaction = +transaction.sum : transaction = null;
    }).reduce((a, b) => a + b, 0).toFixed(2), [filteredTransactions]);

  const sumIncomes = useMemo(() => filteredTransactions.map((item) => {
    return !item.expense ? item = +item.sum : item = null;
  }).reduce((a, b) => a + b, 0).toFixed(2), [filteredTransactions]);

  return (
    <section className={classes.MonthBalance}>
      <h2>{currentMonth}</h2>
      <ul className={classes.List}>
        <BalanceItem sum={sumIncomes} title={"incomes"} />
        <BalanceItem sum={sumExpenses} title={"expenses"} />
      </ul>
    </section>
  );
}

export default WidgetsMonthBalance;
