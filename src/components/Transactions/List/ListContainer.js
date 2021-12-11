import React, {useContext} from "react";
import TransactionsItemsMonthGroup from "./Items/MonthGroup";
import {formatMonth} from "../../../utils/utils";
import {TransactionsContext} from "../../../containers/Transactions/Transactions";

function TransactionsListContainer() {
  const transactions = useContext(TransactionsContext);
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
