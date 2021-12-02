import React from "react";
import {TransitionGroup} from 'react-transition-group';
import ListContainer from './Items/ListContainer';

function TransactionsList({transactions}) {
  const dates = [...new Set(transactions
    .map(date => date.date))];

  return (
    <section className="transactions">
    <TransitionGroup>
      {dates.map((date) =>
        <ListContainer date={date} transactions={transactions} key={date}/>
      )}
    </TransitionGroup>
    </section>
  );
}

export default TransactionsList;
