export const isExists = (data, type, item) => {
  return !!data.find((it) => it[type].title === item);
};

export const isDelete = (data, type, id) => {
  return !!data.find((it) => it[`${type}Id`] === id && it.showInBalance === true);
};

export const isExpense = (transactions, title) => {
  return JSON.parse([...new Set(transactions
    .filter((transaction) => transaction.category.title === title)
    .map((transaction) => transaction.expense))]);
};

export const getTransactionsByAccountId = (transactions, accountId) => {
  return transactions.filter((transaction) => transaction.accountId === accountId);
};

export const getCategoryTotalSum = (transactions, title) => {
  return transactions
  .filter((transaction) => transaction.category.title === title)
  .map((transaction) => transaction.sum)
  .reduce((a, b) => a + b, 0).toFixed(2);
};

export const getCurrentCategorySum = (filteredTransactions, title) => {
  return filteredTransactions
  .filter((transaction) => transaction.category.title === title)
  .map((transaction) => transaction.sum)
  .reduce((a, b) => a + b, 0).toFixed(2);
};
