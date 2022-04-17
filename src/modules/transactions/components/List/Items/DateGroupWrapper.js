import React from "react";
import TransactionItemsDateGroup from "./DateGroup";
import TransactionsDateHeader from "./DateHeader";
import WithCSSTransition from "../../../../common/hoc/WithCSSTransition/WithCSSTransition";

function TransactionsItemsDateGroupWrapper({date, transactions, ...rest}) {
  const nodeRefGroupWrapper = React.useRef(null);

  return (
    <WithCSSTransition
      inProp={rest.in}
      animationType={"fade"}
      timeout={300}
      nodeRef={nodeRefGroupWrapper}
    >
      <li ref={nodeRefGroupWrapper} key={date}>
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
