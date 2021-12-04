import React from 'react';
import {
  formatDay,
  formatMonthYear,
  formatWeekday
} from "../../../../utils/utils";

function TransactionsDateHeader({date, transactions}) {
  const transactionsDay = transactions
    .filter((transaction) => transaction.date === date);
  const expenseBalance = transactionsDay
    .filter((transaction) => transaction.outcome === true)
    .map((transaction) => transaction.sum)
    .reduce((acc, transaction) => acc + transaction, 0);
  const incomeBalance = transactionsDay
    .filter((transaction) => transaction.outcome === false)
    .map((transaction) => transaction.sum)
    .reduce((acc, transaction) => acc + transaction, 0);
  const overallBalance = Math.round((incomeBalance - expenseBalance) * 100) / 100;

  return (
    <div className="transactions__header">
      <div className="transactions__date-content">
          <p>{formatDay(date)}</p>
          <div className="transactions__date-wrapper">
            <p>{formatWeekday(date)}</p>
            <p>{formatMonthYear(date)}</p>
          </div>
        </div>
        <p>{overallBalance < 0 ? '' : '+'}{overallBalance} €</p>
    </div>
  );
}

export default TransactionsDateHeader;
