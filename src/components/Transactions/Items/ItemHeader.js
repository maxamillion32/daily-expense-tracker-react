import React, {Fragment} from 'react';

import TransactionItemsContainer from './ItemsContainer';
import {formatDay, formatMonth, formatWeekday, formatMonthList} from "../../../utils/utils";

function TransactionsItemHeader({date, transactions}) {
  const currentTransactions = transactions.filter((transaction) => formatMonthList(transaction.date) === date);
  const currentDate = [...currentTransactions.map((transaction) => transaction.date)];

  return (
    <>
      {currentDate.map((date, index) =>
        {
          const dayTransactions = transactions
            .filter((transaction) => transaction.date === date);
          const expenseBalance = dayTransactions
            .filter((transaction) => transaction.outcome === true)
            .map((transaction) => transaction.sum)
            .reduce((acc, transaction) => acc + transaction, 0);
          const incomeBalance = dayTransactions
            .filter((transaction) => transaction.outcome === false)
            .map((transaction) => transaction.sum)
            .reduce((acc, transaction) => acc + transaction, 0);
          const overallBalance = Math.round((incomeBalance - expenseBalance) * 100) / 100;

          return (
            <Fragment key={index}>
              <div className="transactions__header">
                <div className="transactions__date-content">
                    <p>{formatDay(date)}</p>
                    <div className="transactions__date-wrapper">
                      <p>{formatWeekday(date)}</p>
                      <p>{formatMonth(date)}</p>
                    </div>
                  </div>
                  <p>{overallBalance < 0 ? '' : '+'}{overallBalance} €</p>
              </div>
              <TransactionItemsContainer date={date} transactions={transactions} />
            </Fragment>
          )
        }
      )}
    </>
  );
}

export default TransactionsItemHeader;
