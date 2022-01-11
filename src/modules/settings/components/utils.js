export const getAccountStartBalance = (accounts, title) => {
  const currentAccount = accounts
  .find((account) => account.title === title);

  return currentAccount.startBalance;
};

export const getCurrentAccountBalance = (transactions, title) => {
  const incomes = transactions
  .filter((transaction) => transaction.expense === false)
  .filter((transaction) => transaction.account.title === title)
  .map((transaction) => transaction.sum)
  .reduce((a, b) => a + b, 0);

  const expenses = transactions
  .filter((transaction) => transaction.expense === true)
  .filter((transaction) => transaction.account.title === title)
  .map((transaction) => transaction.sum)
  .reduce((a, b) => a + b, 0);

  return incomes - expenses;
};

export const getAccountTotalBalance = (startBalance, balance) => {
  return (balance + +startBalance).toFixed(2);
};
