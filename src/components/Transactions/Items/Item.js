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
    setShowDeleteBtn(!showDeleteBtn)
  };

  return (
    <li
      className="transactions__item"
      onMouseOver={handleDeleteButtonToggle}
      onMouseOut={handleDeleteButtonToggle}
      >
      <div className="transactions__item-wrapper">
        <p>{categoryTitle}</p>
        <p className="transactions__item--expense">{outcome ? `-` : `+`}{sum} €</p>
      </div>
      <div className="transactions__item-wrapper">
        <p className="transactions__item--account">{accountTitle}</p>
        <p
          className={`transactions__item--edit ${showDeleteBtn ? "" : "hidden"}`}
          id={id}
          onClick={onClickDeleteButton}
          >
        delete</p>
      </div>
    </li>
  );
}

export default TransactionsItem;
