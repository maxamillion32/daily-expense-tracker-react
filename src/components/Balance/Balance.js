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

  const sumOutcomes = transactions.map((transaction) => {
      transaction.outcome ? transaction = +transaction.sum : transaction = null;
      return transaction;
    }).reduce((a, b) => a + b, 0);

  const sumIncomes = transactions.map((item) => {
    !item.outcome ? item = +item.sum : item = null;
    return item;
  }).reduce((a, b) => a + b, 0);

  const currentBalance = Math.round((sumIncomes - sumOutcomes) * 100) / 100;

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
