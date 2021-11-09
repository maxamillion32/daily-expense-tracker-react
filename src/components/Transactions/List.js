import TransactionItemsContainer from "./Items/ItemsContainer";
import TransactionsItemHeader from "./Items/ItemHeader";
// import {formatDate} from "../../utils/utils";

function TransactionsList({transactions}) {
  const dates = [...new Set(transactions
    .map(date => date.date))];
  return (
    <section className="transactions">
      {/* <h2>Transactions List</h2> */}
      {dates.map((date, index) => (
        <ul className="transactions__list" key={index}>
          <TransactionsItemHeader date={date} transactions={transactions} />
          <TransactionItemsContainer date={date} transactions={transactions} />
        </ul>
      ))}
    </section>
  );
}

export default TransactionsList;
