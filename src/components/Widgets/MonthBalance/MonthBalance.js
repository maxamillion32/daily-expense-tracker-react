import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import classes from './MonthBalance.module.css';
import {formatMonth} from '../../../utils/utils'

import {
  loadTransactions,
  selectAllTransactionsState
} from '../../../reducers/transactions/transactions-slice'

function MonthBalance() {
  const allTransactions = useSelector(selectAllTransactionsState);
  const dispatch = useDispatch();

  const currentMonth = 'November';
  // const currentMonth = formatMonth(new Date());
  const filteredTransactions = allTransactions
    .filter((transaction) => formatMonth(transaction.date) === currentMonth);

  const sumOutcomes = filteredTransactions.map((transaction) => {
      return transaction.outcome ? transaction = +transaction.sum : transaction = null;
    }).reduce((a, b) => a + b, 0);

  const sumIncomes = filteredTransactions.map((item) => {
    return !item.outcome ? item = +item.sum : item = null;
  }).reduce((a, b) => a + b, 0);

  useEffect(() => {
    dispatch(loadTransactions());
    // eslint-disable-next-line
  }, []);
  return (
    <section className={classes.MonthBalance}>
      <h3>{currentMonth}</h3>
      <ul className={classes.List}>
        <li className={classes.Wrapper}>
          <p>income:</p>
          <p className={classes.Balance}>+{sumIncomes} €</p>
        </li>
        <li className={classes.Wrapper}>
          <p>outcome:</p>
          <p className={classes.Balance}>-{sumOutcomes} €</p>
        </li>
      </ul>
    </section>
  )
}

export default MonthBalance;
