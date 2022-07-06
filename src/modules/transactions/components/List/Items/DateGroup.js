import React from "react";
import TransactionItem from "./Item";
import {TransitionGroup} from "react-transition-group";

function TransactionsItemsDateGroup({date, transactions}) {
  const transactionsDay = transactions.filter((transaction) => transaction.date === date);

  return (
    <TransitionGroup component={"ul"}>
      {transactionsDay.map((transaction) => (
        <TransactionItem
          categoryTitle={transaction.category.title}
          accountTitle={transaction.account.title}
          expense={transaction.expense}
          sum={transaction.sum}
          id={transaction.id}
          key={transaction.id}
          icon={transaction.category.icon}
          date={date}
          accountId={transaction.accountId}
          categoryId={transaction.categoryId}
          transfer={transaction.transfer}
          transferId={transaction.transferId}
          accountFrom={transaction.accountFrom}
          accountTo={transaction.accountTo}
          accountIdFrom={transaction.accountIdFrom}
          accountIdTo={transaction.accountIdTo}
        />
      ))}
    </TransitionGroup>
  );
}

export default TransactionsItemsDateGroup;
