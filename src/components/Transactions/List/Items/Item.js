import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {deleteTransaction} from '../../../../reducers/transactions/transactions-slice';
import {CSSTransition} from 'react-transition-group';
import classes from '../ListContainer.module.css';

function TransactionsItem({categoryTitle, accountTitle, outcome, sum, id, ...rest}) {
  const dispatch = useDispatch();
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);

  const onClickDeleteButton = ({target}) => {
    const id = target.id;

    dispatch(deleteTransaction(id));
  };

  const handleDeleteButtonToggle = () => {
    setShowDeleteBtn(!showDeleteBtn)
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
        className={classes.TransactionsItem}
        onMouseOver={handleDeleteButtonToggle}
        onMouseOut={handleDeleteButtonToggle}
        ref={nodeRef}
      >
        <div className={classes.TransactionsItemWrapper}>
          <p>{categoryTitle}</p>
          <p>{outcome ? `-` : `+`}{sum} €</p>
        </div>
        <div className={classes.TransactionsItemWrapper}>
          <p className={classes.TransactionsItemAccount}>{accountTitle}</p>
          <p
            className={`${classes.TransactionsItemEdit} ${showDeleteBtn ? "" : classes.TransactionsHidden}`}
            id={id}
            onClick={onClickDeleteButton}
            >
          delete</p>
        </div>
      </li>
    </CSSTransition>
  );
}

export default TransactionsItem;
