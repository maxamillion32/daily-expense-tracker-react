import React, { useState, useEffect } from 'react';
import classes from './Balance.module.css';

function Balance({transactions}) {

  const [balanceContainer, setBalanceContainer] = useState(classes.BalanceContainer)
  const [balance, setBalance] = useState(classes.Balance)

  const listenScrollEvent = () => {
    if (window.scrollY < 60) {
      setBalanceContainer(classes.BalanceContainer);
      setBalance(classes.Balance);
    } else if (window.scrollY > 60) {
      setBalanceContainer(classes.BalanceContainerScroll);
      setBalance(classes.BalanceScroll)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);

    return () =>
      window.removeEventListener('scroll', listenScrollEvent);
  }, []);

  const sumExpenses = transactions.map((transaction) => {
      return transaction.expense ? transaction = +transaction.sum : transaction = null;
    }).reduce((a, b) => a + b, 0);

  const sumIncomes = transactions.map((item) => {
    return !item.expense ? item = +item.sum : item = null;
  }).reduce((a, b) => a + b, 0);

  const currentBalance = Math.round((sumIncomes - sumExpenses) * 100) / 100;

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
