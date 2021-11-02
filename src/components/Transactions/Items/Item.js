import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {deleteTransaction} from '../../../reducers/transactions/transactions-slice';

function TransactionsItem({categoryTitle, accountTitle, outcome, sum, id}) {
  const dispatch = useDispatch();

  const [showDeleteBtn, setShowDeleteBtn] = useState(false);

  const onClickDeleteButton = ({target}) => {
    const id = target.id;
    dispatch(deleteTransaction(id));
  };

  const handleDeleteButtonToggle = () => {
    const isShowDeleteBtn = (showDeleteBtn === true) ? false : true;
    setShowDeleteBtn(isShowDeleteBtn)
  };

  return (
    <li
      className="transactions-list__item"
      onMouseOver={handleDeleteButtonToggle}
      onMouseOut={handleDeleteButtonToggle}
      >
      <div className="transactions-list__item-wrapper">
        <p>{categoryTitle}</p>
        <p className="transactions-list__item--expense">{outcome ? `- ` : `+ `}{sum} €</p>
      </div>
      <div className="transactions-list__item-wrapper">
        <p className="transactions-list__item--account">{accountTitle}</p>
        <p
          className={`transactions-list__item--edit ${showDeleteBtn ? "" : "hidden"}`}
          id={id}
          onClick={onClickDeleteButton}
          >
        delete</p>
      </div>
    </li>
  );
}

export default TransactionsItem;
