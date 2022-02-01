import React from "react";
import {useSelector} from "react-redux";
import {TransitionGroup} from "react-transition-group";

import classes from "../Container.module.css";

import {selectFilteredTransactions} from "../../../../../reducers/transactions/transactions-slice";

import TransactionsItemsMonthGroup from "./MonthGroup";
import {formatYear, formatMonth} from "../../../../common/utils/utils";

function TransactionsItemsYearGroup({year}) {
  const transactions = useSelector(selectFilteredTransactions);
  const yearTransactions = transactions
    .filter((transaction) => formatYear(transaction.date) === year);
  const nodeRef = React.useRef(null);
  const months = [...new Set(yearTransactions
    .map(date => formatMonth(date.date)))];

  return (
    <ul className="transactions__list">
      <p className={classes.TransactionsYear} ref={nodeRef}>{year}</p>
      <TransitionGroup>
        {months.map((month) =>
        <TransactionsItemsMonthGroup transactions={yearTransactions} month={month} key={month} />
        )}
      </TransitionGroup>
    </ul>
  );
}

export default TransactionsItemsYearGroup;
