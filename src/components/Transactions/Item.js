import {useDispatch} from 'react-redux';
import {formatDate} from "../../utils/utils";
import {deleteTransaction} from '../../reducers/transactions/transactions-slice';

function TransactionsItem({date, transactions}) {
  const dayTransactions = transactions.filter((transaction) => formatDate(transaction.date) === date);
  const dispatch = useDispatch();

  const onClickDeleteButton = ({target}) => {
    const id = target.id;
    dispatch(deleteTransaction(id));
  };

  return (
    dayTransactions.map((transaction, index) => (
      <div key={index}>
        <li className="transactions-list__item" >
          <div className="transactions-list__item-wrapper">
            <p>{transaction.category.title}</p>
            <p className="transactions-list__item--expense">{transaction.outcome ? `- ` : `+ `}{transaction.sum} €</p>
          </div>
          <div className="transactions-list__item-wrapper">
            <p className="transactions-list__item--account">{transaction.account.title}</p>
            <p className="transactions-list__item--edit hidden" id={transaction.id} onClick={onClickDeleteButton}>
            delete</p>
          </div>
        </li>
      </div>
    ))
  );
}

export default TransactionsItem;
