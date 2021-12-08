import React from 'react';
import TransactionItem from "./Item";
import {TransitionGroup} from 'react-transition-group';

function TransactionsItemsDateGroup({date, transactions}) {
  const transactionsDay = transactions.filter((transaction) => transaction.date === date);

  return (
    <TransitionGroup component={'ul'}>
      {transactionsDay.map((transaction) => (
        <TransactionItem
          categoryTitle={transaction.category.title}
          accountTitle={transaction.account.title}
          expense={transaction.expense}
          sum={transaction.sum}
          id={transaction.id}
          key={transaction.id}
        />
      ))}
    </TransitionGroup>
  );
}

export default TransactionsItemsDateGroup;
