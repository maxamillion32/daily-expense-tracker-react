import React from "react";
import {useSelector} from "react-redux";
import {TransitionGroup} from "react-transition-group";

import classes from "../ListContainer.module.css";

import {selectFilteredTransactions} from "../../../../../../reducers/transactions/transactions-slice";

import TransactionsItemsDateGroupWrapper from "./DateGroupWrapper";
import {formatMonth} from "../../../../../common/utils/utils";

function TransactionsItemsMonthGroup({month}) {
  const transactions = useSelector(selectFilteredTransactions);
  const transactionsDates = transactions
    .filter((transaction) => formatMonth(transaction.date) === month)
    .map((transaction) => transaction.date);
  const nodeRef = React.useRef(null);

  return (
    <ul className="transactions__list">
      <p className={classes.TransactionsMonth} ref={nodeRef}>{month}</p>
      <TransitionGroup>
        {transactionsDates.map((transactionDate) =>
          (
            <TransactionsItemsDateGroupWrapper
              date={transactionDate}
              key={transactionDate}
            />
          )
        )}
      </TransitionGroup>
    </ul>
  );
}

export default TransactionsItemsMonthGroup;
