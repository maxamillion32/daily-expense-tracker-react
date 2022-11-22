import React, {useMemo} from "react";
import {useSelector} from "react-redux";
import classes from "./MonthBalance.module.css";
import {
  selectCurrentMonth,
  selectCurrentYear, selectFilteredTransactions
} from "../../../../reducers/transactions/transactions-slice";
import BalanceItem from "./Item/Item";
import {formatMonth, formatYear} from "../../../common/utils/utils";

function WidgetsMonthBalance() {
  const getTransactions = useSelector(selectFilteredTransactions);
  const currentMonth = useSelector(selectCurrentMonth);
  const currentYear = useSelector(selectCurrentYear);
  const transactions = [...getTransactions];

  const filteredTransactions = useMemo(() => transactions
    .filter((transaction) => formatYear(transaction.date) === currentYear)
    .filter((transaction) => formatMonth(transaction.date) === currentMonth), [currentMonth, currentYear, transactions]);

  const sumExpenses = useMemo(() => filteredTransactions.map((transaction) => {
      return transaction.expense ? +transaction.sum : transaction = null;
    }).reduce((a, b) => a + b, 0).toFixed(2), [currentYear, currentMonth, filteredTransactions]);

  const sumIncomes = useMemo(() => filteredTransactions.map((item) => {
    return !item.expense ? +item.sum : item = null;
  }).reduce((a, b) => a + b, 0).toFixed(2), [currentYear, currentMonth, filteredTransactions]);

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
