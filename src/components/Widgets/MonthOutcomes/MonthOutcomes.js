import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import classes from './MonthOutcomes.module.css';
import {formatMonth} from '../../../utils/utils'

import {
  loadTransactions,
  selectAllTransactionsState
} from '../../../reducers/transactions/transactions-slice'

function MonthOutcomes({currentMonth}) {
  const allTransactions = useSelector(selectAllTransactionsState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTransactions());
    // eslint-disable-next-line
  }, []);

  const filteredTransactions = allTransactions
    .filter((transaction) => formatMonth(transaction.date) === currentMonth);
  const categoriesForOutcomes = [...new Set(filteredTransactions
    .filter((transaction) => transaction.outcome ? transaction.sum !== 0 : transaction = null)
    .map(transaction => transaction.category.title))];
  const categoriesForIncomes = [...new Set(filteredTransactions
    .filter((transaction) => !transaction.outcome ? transaction.sum !== 0 : transaction = null)
    .map(transaction => transaction.category.title))];

  const sumOutcomes = filteredTransactions.map((transaction) => {
      return transaction.outcome ? transaction = +transaction.sum : transaction = null;
    }).reduce((acc, sum) => acc + sum, 0);

  const sumIncomes = filteredTransactions.map((item) => {
    return !item.outcome ? item = +item.sum : item = null;
  }).reduce((acc, sum) => acc + sum, 0);

  const getOutcomes = (category) => {
    const outcome = filteredTransactions
      .filter((transaction) => transaction.category.title === category)
      .map((transaction) => transaction.outcome ? transaction = +transaction.sum : transaction = null)
      .reduce((acc, sum) => acc + sum, 0);

      return outcome;
  }

  const getIncomes = (category) => {
    const outcome = filteredTransactions
      .filter((transaction) => transaction.category.title === category)
      .map((transaction) => !transaction.outcome ? transaction = +transaction.sum : transaction = null)
      .reduce((acc, sum) => acc + sum, 0);

      return outcome;
  }

  return (
    <>
      <section className={classes.MonthOutcomes}>
        <h3>Outcome: -{sumOutcomes} €</h3>
        <ul className={classes.List}>
          {categoriesForOutcomes.map((category) => (
              <li className={classes.Wrapper} key={category}>
                <p>{category}:</p>
                <p className={classes.Balance}>-{getOutcomes(category)} €</p>
              </li>
            ))
          }
        </ul>
      </section>
      <section className={classes.MonthOutcomes}>
        <h3>Income: +{sumIncomes} €</h3>
        <ul className={classes.List}>
          {categoriesForIncomes.map((category) => (
              <li className={classes.Wrapper} key={category}>
                <p>{category}:</p>
                <p className={classes.Balance}>+{getIncomes(category)} €</p>
              </li>
            ))
          }
        </ul>
      </section>
    </>
  )
}

export default MonthOutcomes;
