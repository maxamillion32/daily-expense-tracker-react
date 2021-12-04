import React from "react";
import TransactionsItemsMonthGroup from './Items/MonthGroup';
import {formatMonth} from "../../../utils/utils";

function TransactionsListContainer({transactions}) {
  const months = [...new Set(transactions
    .map(date => formatMonth(date.date)))];

  return (
    <section className="transactions">
      {months.map((month) =>
        <TransactionsItemsMonthGroup month={month} transactions={transactions} key={month} />
      )}
    </section>
  );
}

export default TransactionsListContainer;
