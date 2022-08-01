export const getMonthSum = (transactions, type) => {
    return transactions
      .filter((transaction) => !transaction.transfer)
      .map((transaction) => (type === "expenses" ? transaction.expense : !transaction.expense)
      ? +transaction.sum
      : transaction = null)
      .reduce((acc, sum) => acc + sum, 0).toFixed(2);
};

export const getCategoryBalance = (category, type, transactions) => {
  const balance = transactions
    .filter((transaction) => transaction.category.title === category)
    .map((transaction) => (type === "incomes" ? !transaction.expense : transaction.expense) ? +transaction.sum : transaction = null)
    .reduce((acc, sum) => acc + sum, 0);

    return balance.toFixed(2);
};

export const getMonthCountPerCategory = (transactions, category) => {
  return [...new Set(transactions
    .filter((transaction) => transaction.category.title === category)
    .map(transaction => new Date(transaction.date).toISOString().slice(0, -17)))].length;
};

export const getMonthCount = (transactions) => {
  return [...new Set(transactions
    .map(transaction => new Date(transaction.date).toISOString().slice(0, -17)))].length;
};

export const getMonthAverageSum = (sum, transactions, category) => {
  return (sum / (category
      ? getMonthCountPerCategory(transactions, category)
      : getMonthCount(transactions))).toFixed(2);
};
export const getMonthTotalPercent = (balance, sum, transactions, category) => {
  return (balance / getMonthAverageSum(+sum, transactions, category) * 100).toFixed(2);
};
