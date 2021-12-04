import React, {Fragment} from "react";
import {TransitionGroup} from 'react-transition-group';
import ListContainer from './Items/ListContainer';
import {formatMonthList} from "../../utils/utils";

function TransactionsList({transactions}) {
  // const dates = [...new Set(transactions
  //   .map(date => date.date))];
  const months = [...new Set(transactions
    .map(date => formatMonthList(date.date)))];

  return (
    <section className="transactions">
    <TransitionGroup>
      {months.map((month) =>
        <Fragment key={month}>
          <p style={{paddingLeft: 20, fontWeight: 700}}>{month}</p>
          <ListContainer date={month} transactions={transactions} />
        </Fragment>
      )}
    </TransitionGroup>
    </section>
  );
}

export default TransactionsList;
