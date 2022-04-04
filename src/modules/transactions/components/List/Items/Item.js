import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {CSSTransition} from "react-transition-group";

import classes from "../Container.module.css";

import {setIsAddTransactionClick, setIsButtonShow, updatingTransaction, setIsEditing} from "../../../../../reducers/transactions/transactions-slice";

function TransactionsItem({categoryTitle, accountTitle, expense, sum, id, icon, date, accountId, categoryId, ...rest}) {
  const dispatch = useDispatch();
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);

  const handleDeleteButtonToggle = () => {
    setShowDeleteBtn(!showDeleteBtn);
  };

  const onItemClick = () => {
    dispatch(setIsAddTransactionClick());
    dispatch(setIsButtonShow());
    dispatch(setIsEditing(true));
    dispatch(updatingTransaction({id, sum, date, expense, category: categoryTitle, account: accountTitle, categoryId, accountId}));
  };

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
      nodeRef={nodeRef}
    >
      <li
        className={classes.TransactionsList}
        onMouseOver={handleDeleteButtonToggle}
        onMouseOut={handleDeleteButtonToggle}
        ref={nodeRef}
        onClick={onItemClick}
      >
        <div className={classes.IconWrapper}>
          <i className={`${classes.TransactionsIcon} fas ${icon ? icon : ""}`}></i>
        </div>
        <div className={classes.GroupWrapper}>
          <div className={classes.TransactionsContentWrapper}>
            <p>{categoryTitle}</p>
            <p>{expense ? "-" : "+"}{sum} €</p>
          </div>
          <div className={classes.TransactionsContentWrapper}>
            <p className={classes.TransactionsItemAccount}>{accountTitle}</p>
          </div>
        </div>
      </li>
    </CSSTransition>
  );
}

export default TransactionsItem;
