import React from "react";
import {useSelector} from "react-redux";

import {selectFilteredTransactions} from "../../../../reducers/transactions/transactions-slice";

import {formatMonth} from "../../../common/utils/utils";
import TransactionsItemsMonthGroup from "./Items/MonthGroup";

function TransactionsListContainer() {
  const transactions = useSelector(selectFilteredTransactions);
  const months = [...new Set(transactions
    .map(date => formatMonth(date.date)))];

  return (
    <section className="transactions">
      {months.map((month) =>
        <TransactionsItemsMonthGroup month={month} key={month} />
      )}
    </section>
  );
}

export default TransactionsListContainer;
