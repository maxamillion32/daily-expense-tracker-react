export const isExists = (data, type, item) => {
  return data.find((it) => it[type].title === item) ? true : false;
};

export const isDelete = (data, type, id) => {
  return data.find((it) => it[`${type}Id`] === id && it.showInBalance === true) ? true : false;
};

export const isExpense = (transactions, title) => {
  const result = JSON.parse([...new Set(transactions
  .filter((transaction) => transaction.category.title === title)
  .map((transaction) => transaction.expense))]);

  return result;
};

export const getTransactionsByAccountId = (transactions, accountId) => {
  const transaction = transactions.filter((transaction) => transaction.accountId === accountId);
  return transaction;
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
