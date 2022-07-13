import React, {memo, useMemo} from "react";
import classes from "./Indicator.module.css";
import {formatMonth, formatYear} from "../../../../common/utils/utils";

const getPercent = (year, month, type, transactions, maxMonthTransaction) => {
  const incomes = transactions
  .filter((transaction) => formatYear(transaction.date) === year)
  .filter((transaction) => formatMonth(transaction.date) === month)
  .map((transaction) => (type === "expenses" ? transaction.expense : !transaction.expense)
  ? +transaction.sum
  : transaction = null)
  .reduce((acc, sum) => acc + sum, 0);

  const percent = (incomes / maxMonthTransaction * 100);
  return percent >= 100 ? percent : percent;
};

function WidgetsYearExpensesIndicator({year, month, type, transactions, maxMonthTransaction}) {
  // const isTransactionsEqual = isEqual(transactions, usePrevious(transactions));
  let cls = [];
  type === "expenses" ? cls.push(classes.Expenses) : cls.push(classes.Incomes);

  return (
    <div
      className={cls.join(" ")}
      id={month}
      style={{height: `${useMemo(() => getPercent(year, month, type, transactions, maxMonthTransaction), [year, month, type, maxMonthTransaction])}%`}}
    ></div>
  );
}

export default memo(WidgetsYearExpensesIndicator);
