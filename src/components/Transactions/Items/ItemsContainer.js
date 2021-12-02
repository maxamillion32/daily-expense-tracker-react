import React from 'react';
import TransactionItem from "./Item";
import {TransitionGroup} from 'react-transition-group';

function TransactionsItemsContainer({date, transactions}) {
  const dayTransactions = transactions.filter((transaction) => transaction.date === date);

  return (
    <TransitionGroup component={'ul'}>
      {dayTransactions.map((transaction) => (
        <TransactionItem
          categoryTitle={transaction.category.title}
          accountTitle={transaction.account.title}
          outcome={transaction.outcome}
          sum={transaction.sum}
          id={transaction.id}
          key={transaction.id}
        />
      ))}
    </TransitionGroup>
  );
}

export default TransactionsItemsContainer;
