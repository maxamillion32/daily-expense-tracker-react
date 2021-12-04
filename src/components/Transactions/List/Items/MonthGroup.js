import React from 'react';
import {TransitionGroup} from 'react-transition-group';
import TransactionsItemsDateGroupWrapper from './DateGroupWrapper';
import {formatMonth} from "../../../../utils/utils";

function TransactionsItemsMonthGroup({month, transactions}) {
  const transactionsDates = transactions
    .filter((transaction) => formatMonth(transaction.date) === month)
    .map((transaction) => transaction.date);
  const nodeRef = React.useRef(null);

  return (
    <ul className="transactions__list">
      <p style={{paddingLeft: 20, fontWeight: 700}} ref={nodeRef}>{month}</p>
      <TransitionGroup>
        {transactionsDates.map((transactionDate) =>
          (
            <TransactionsItemsDateGroupWrapper
              date={transactionDate}
              transactions={transactions}
              key={transactionDate}
            />
          )
        )}
      </TransitionGroup>
    </ul>
  );
}

export default TransactionsItemsMonthGroup;
