import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {CSSTransition} from "react-transition-group";

import classes from "../Container.module.css";

import {deleteTransaction, loadTransactions} from "../../../../../reducers/transactions/transactions-slice";
import {selectUserId} from "../../../../../reducers/user/user-slice";

function TransactionsItem({categoryTitle, accountTitle, expense, sum, id, icon, ...rest}) {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);

  const onClickDeleteButton = ({target}) => {
    const id = target.id;

    const confirm = window.confirm("Are you sure?");

    if (confirm) {
      dispatch(deleteTransaction(id));
      dispatch(loadTransactions(userId));
    }
  };

  const handleDeleteButtonToggle = () => {
    setShowDeleteBtn(!showDeleteBtn);
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
            <p
              className={`${classes.TransactionsItemEdit} ${showDeleteBtn ? "" : classes.TransactionsHidden}`}
              id={id}
              onClick={onClickDeleteButton}
              >
            delete</p>
          </div>
        </div>
      </li>
    </CSSTransition>
  );
}

export default TransactionsItem;
