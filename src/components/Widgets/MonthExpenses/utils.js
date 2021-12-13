export const getSum = (transactions, type) => {
    return transactions
      .map((transaction) => (type === 'expenses' ? transaction.expense : !transaction.expense)
      ? transaction = +transaction.sum
      : transaction = null)
      .reduce((acc, sum) => acc + sum, 0).toFixed(2);
}

export const getBalance = (category, type, transactions) => {
  const balance = transactions
    .filter((transaction) => transaction.category.title === category)
    .map((transaction) => (type === 'incomes' ? !transaction.expense : transaction.expense) ? transaction = +transaction.sum : transaction = null)
    .reduce((acc, sum) => acc + sum, 0);

    return balance.toFixed(2);
}

export const MOTH_COUNT = 12;

export const getMonthAverageSum = (sum) => (sum / MOTH_COUNT).toFixed(2);
export const getTotalPercentPerMonth = (balance, sum) => (balance / getMonthAverageSum(sum) * 100).toFixed(2);
