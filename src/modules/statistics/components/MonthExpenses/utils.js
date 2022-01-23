export const getSum = (transactions, type) => {
    return transactions
      .map((transaction) => (type === "expenses" ? transaction.expense : !transaction.expense)
      ? transaction = +transaction.sum
      : transaction = null)
      .reduce((acc, sum) => acc + sum, 0).toFixed(2);
};

export const getBalance = (category, type, transactions) => {
  const balance = transactions
    .filter((transaction) => transaction.category.title === category)
    .map((transaction) => (type === "incomes" ? !transaction.expense : transaction.expense) ? transaction = +transaction.sum : transaction = null)
    .reduce((acc, sum) => acc + sum, 0);

    return balance.toFixed(2);
};

const currentMonth = 1;

export const getMonthCountPerCategory = (transactions, category) => {
  const monthCount = [...new Set(transactions
    .filter((transaction) => transaction.category.title === category)
    .map(transaction => new Date(transaction.date).getMonth()))].length - currentMonth;

  return monthCount === 0 ? 1 : monthCount;
};

export const getMonthCount = (transactions) => {
  return [...new Set(transactions
    .map(transaction => new Date(transaction.date).getMonth()))].length;
};

export const getMonthAverageSum = (sum, transactions, category) => {
  return (sum / (category
      ? getMonthCountPerCategory(transactions, category)
      : getMonthCount(transactions))).toFixed(2);
};
export const getTotalPercentPerMonth = (balance, sum, transactions, category) => {
  return (balance / getMonthAverageSum(+sum, transactions, category) * 100).toFixed(2);
};
