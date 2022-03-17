import React from "react";
import {CSSTransition} from "react-transition-group";
import classes from "../Container.module.css";
import TransactionItemsDateGroup from "./DateGroup";
import TransactionsDateHeader from "./DateHeader";

function TransactionsItemsDateGroupWrapper({date, transactions, ...rest}) {
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
