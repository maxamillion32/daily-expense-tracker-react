import TransactionItem from "./Item";
import {formatDate} from "../../utils/utils";

function TransactionsList({transactions}) {
  const dates = [...new Set(transactions
    .map(date => formatDate(date.date)))];
  return (
    <section className="transactions-list">
      <h2>Transactions List</h2>
      {dates.map((date, index) => (
        <ul className="transactions-list__list" key={index}>
          <div className="transactions-list__day">
            <p>{date}</p>
          </div>
          <TransactionItem date={date} transactions={transactions} />
        </ul>
      ))}
    </section>
  );
}

export default TransactionsList;
