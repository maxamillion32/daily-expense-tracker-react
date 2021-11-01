function Balance({transactions}) {
  const sumOutcomes = transactions.map((transaction) => {
      transaction.outcome ? transaction = +transaction.sum : transaction = null;
      return transaction;
    }).reduce((a, b) => a + b, 0);

    const sumIncomes = transactions.map((item) => {
      !item.outcome ? item = +item.sum : item = null;
      return item;
    }).reduce((a, b) => a + b, 0);

  return (
    <section className="balance">
      <div className="balance__container balance__balance">
        <div>
          <p>Your balance</p>
          <p className="balance__amount">{sumIncomes - sumOutcomes} €</p>
        </div>
      </div>
    </section>
  );
}

export default Balance;
