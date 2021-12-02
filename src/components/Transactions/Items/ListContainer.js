import React from 'react';
import {CSSTransition} from 'react-transition-group';
import classes from '../ListAnimation.module.css';
import TransactionsItemHeader from './ItemHeader';
import TransactionItemsContainer from './ItemsContainer';

function TransactionsListContainer({date, transactions, ...rest}) {
  const nodeRef = React.useRef(null);

  return (
    <CSSTransition
      {...rest}
      classNames={{
        enter: `${classes.enter}`,
        enterActive: `${classes.enterActive}`,
        exit: `${classes.exit}`,
        exitActive: `${classes.exitActive}`,
        exitDone: `${classes.exitDone}`,
      }}
      timeout={300}
      key={date}
      nodeRef={nodeRef}
    >
    <ul className="transactions__list" ref={nodeRef}>
      <li>
        <TransactionsItemHeader date={date} transactions={transactions} />
        <TransactionItemsContainer date={date} transactions={transactions} />
      </li>
    </ul>
    </CSSTransition>
  );
}

export default TransactionsListContainer;
