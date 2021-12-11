import React, {useContext} from 'react';
import classes from '../ListContainer.module.css';
import {CSSTransition} from 'react-transition-group';

import TransactionItemsDateGroup from './DateGroup';
import TransactionsDateHeader from './DateHeader';
import {TransactionsContext} from "../../../../containers/Transactions/Transactions";

function TransactionsItemsDateGroupWrapper({date, ...rest}) {
  const transactions = useContext(TransactionsContext);
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
      <li ref={nodeRef}>
        <TransactionsDateHeader
          date={date}
          transactions={transactions}
        />

        <TransactionItemsDateGroup
          date={date}
          transactions={transactions}
        />
      </li>
    </CSSTransition>
  );
}

export default TransactionsItemsDateGroupWrapper;
