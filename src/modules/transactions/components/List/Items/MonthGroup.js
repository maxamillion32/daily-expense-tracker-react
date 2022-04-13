import React from "react";
import {TransitionGroup} from "react-transition-group";

import classes from "../Container.module.css";

import TransactionsItemsDateGroupWrapper from "./DateGroupWrapper";
import {formatMonth} from "../../../../common/utils/utils";

function TransactionsItemsMonthGroup({transactions, month}) {
  const transactionsDates = transactions
    .filter((transaction) => formatMonth(transaction.date) === month)
    .map((transaction) => transaction.date);
  const nodeRef = React.useRef(null);

  return (
    <li className="transactions__list">
      <p className={classes.TransactionsMonth} ref={nodeRef}>{month}</p>
      <TransitionGroup component={"ul"}>
        {transactionsDates.map((transactionDate) =>
          (
            <TransactionsItemsDateGroupWrapper
              date={transactionDate}
              key={transactionDate}
              transactions={transactions}
            />
          )
        )}
      </TransitionGroup>
    </li>
  );
}

export default TransactionsItemsMonthGroup;
