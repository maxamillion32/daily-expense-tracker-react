import {formatDay, formatMonth, formatWeekday} from "../../../utils/utils";

function TransactionsItemHeader({date, transactions}) {
  const currentTransactions = transactions.filter((transaction) => transaction.date === date);
  const currentDate = [...new Set(currentTransactions.map((transaction) => transaction.date))];
  const expenseBalance = currentTransactions.filter((transaction) => transaction.outcome === true).map((transaction) => transaction.sum).reduce((cur, transaction) => cur + transaction, 0);
  const incomeBalance = currentTransactions.filter((transaction) => transaction.outcome === false).map((transaction) => transaction.sum).reduce((cur, transaction) => cur + transaction, 0);
  const overallBalance = Math.round((incomeBalance - expenseBalance) * 100) / 100;

  return (
    <div className="transactions__header">
      <div className="transactions__date-content">
          <p>{formatDay(currentDate)}</p>
          <div className="transactions__date-wrapper">
            <p>{formatWeekday(currentDate)}</p>
            <p>{formatMonth(currentDate)}</p>
          </div>
        </div>
        <p>{overallBalance < 0 ? '' : '+'}{overallBalance} €</p>
    </div>
  );
}

export default TransactionsItemHeader;
