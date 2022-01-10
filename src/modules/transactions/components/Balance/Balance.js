import React, {useState, useEffect} from "react";
import classes from "./Balance.module.css";

function Balance({transactions}) {
  const [balanceContainer, setBalanceContainer] = useState(classes.BalanceContainer);
  const [balance, setBalance] = useState(classes.Balance);

  const listenScrollEvent = () => {
    if (window.scrollY < 60) {
      setBalanceContainer(classes.BalanceContainer);
      setBalance(classes.Balance);
    } else if (window.scrollY > 60) {
      setBalanceContainer(classes.BalanceContainerScroll);
      setBalance(classes.BalanceScroll);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);

    return () =>
      window.removeEventListener("scroll", listenScrollEvent);
  }, []);

  // const sumExpenses = transactions.map((transaction) => {
  //     return transaction.expense ? transaction = +transaction.sum : transaction = null;
  //   }).reduce((a, b) => a + b, 0);

  // const sumIncomes = transactions.map((item) => {
  //   return !item.expense ? item = +item.sum : item = null;
  // }).reduce((a, b) => a + b, 0);

  // const currentBalance = (sumIncomes - sumExpenses).toFixed(2);

  const getAccountStartBalance = (transactions) => {
    const currentAccount = [...new Set(transactions
    .map((transaction) => +transaction.account.startBalance))]
    .reduce((a, b) => a + b, 0);

    return currentAccount;
  };

  const getAccountTotalBalance = (startBalance, balance) => {
    return (balance + +startBalance).toFixed(2);
  };

  const getCurrentAccountBalance = (transactions) => {
    const incomes = transactions
    .filter((transaction) => transaction.expense === false)
    .map((transaction) => transaction.sum)
    .reduce((a, b) => a + b, 0);

    const expenses = transactions
    .filter((transaction) => transaction.expense === true)
    .map((transaction) => transaction.sum)
    .reduce((a, b) => a + b, 0);

    return incomes - expenses;
  };

  const startBalance = getAccountStartBalance(transactions);
  const currentBalance = getAccountTotalBalance(startBalance, getCurrentAccountBalance(transactions));

  return (
    <section className={balance}>
      <div className={`${balanceContainer}`}>
        <div>
          <p>Your balance:</p>
          <p className={classes.BalanceAmount}>{currentBalance} €</p>
        </div>
      </div>
    </section>
  );
}

export default Balance;
