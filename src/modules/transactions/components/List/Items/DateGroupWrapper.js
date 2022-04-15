import React from "react";
import TransactionItemsDateGroup from "./DateGroup";
import TransactionsDateHeader from "./DateHeader";
import WithCSSTransition from "../../../../common/hoc/WithCSSTransition/WithCSSTransition";

function TransactionsItemsDateGroupWrapper({date, transactions, ...rest}) {
  const nodeRef = React.useRef(null);

  return (
    <WithCSSTransition
      timeout={300}
      nodeRef={nodeRef}
      {...rest}
    >
      <li ref={nodeRef} key={date}>
        <TransactionsDateHeader
          date={date}
          transactions={transactions}
        />

        <TransactionItemsDateGroup
          date={date}
          transactions={transactions}
        />
      </li>
    </WithCSSTransition>
  );
}

export default TransactionsItemsDateGroupWrapper;
