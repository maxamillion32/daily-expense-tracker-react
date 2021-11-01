import {formatDate} from "../../utils/utils";
import TransactionItem from "./Item";

function TransactionsItemContainer({date, transactions}) {
  const dayTransactions = transactions.filter((transaction) => formatDate(transaction.date) === date);

  return (
    dayTransactions.map((transaction, index) => (
      <div key={index}>
        <TransactionItem
          categoryTitle={transaction.category.title}
          accountTitle={transaction.account.title}
          outcome={transaction.outcome}
          sum={transaction.sum}
          id={transaction.id}
          />
      </div>
    ))
  );
}

export default TransactionsItemContainer;
