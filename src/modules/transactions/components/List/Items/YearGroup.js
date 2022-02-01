import React from "react";
import {useSelector} from "react-redux";

import classes from "../Container.module.css";

import {selectFilteredTransactions, currentYear} from "../../../../../reducers/transactions/transactions-slice";

import TransactionsItemsMonthGroup from "./MonthGroup";
import {formatYear, formatMonth} from "../../../../common/utils/utils";

function TransactionsItemsYearGroup({year}) {
  const getCurrentYear = useSelector(currentYear);
  const transactions = useSelector(selectFilteredTransactions);
  const yearTransactions = transactions
    .filter((transaction) => formatYear(transaction.date) === year);
  const nodeRef = React.useRef(null);
  const months = [...new Set(yearTransactions
    .map(date => formatMonth(date.date)))];

  const isCurrentYear = getCurrentYear === year;

  return (
    <ul className="transactions__list">
      {!isCurrentYear && <p className={classes.TransactionsYear} ref={nodeRef}>{year}</p>}
      {months.map((month) =>
        <TransactionsItemsMonthGroup transactions={yearTransactions} month={month} key={month} />
      )}
    </ul>
  );
}

export default TransactionsItemsYearGroup;
