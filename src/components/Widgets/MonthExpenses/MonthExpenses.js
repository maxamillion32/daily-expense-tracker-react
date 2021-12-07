import React from 'react';
import classes from './MonthExpenses.module.css';
import {formatMonth} from '../../../utils/utils'

function MonthExpenses({currentMonth, transactions}) {
  const filteredTransactions = transactions
    .filter((transaction) => formatMonth(transaction.date) === currentMonth);
  const categoriesForExpenses = [...new Set(filteredTransactions
    .filter((transaction) => transaction.expense ? transaction.sum !== 0 : transaction = null)
    .map(transaction => transaction.category.title))];
  const categoriesForIncomes = [...new Set(filteredTransactions
    .filter((transaction) => !transaction.expense ? transaction.sum !== 0 : transaction = null)
    .map(transaction => transaction.category.title))];

  const sumExpenses = filteredTransactions.map((transaction) => {
      return transaction.expense ? transaction = +transaction.sum : transaction = null;
    }).reduce((acc, sum) => acc + sum, 0);

  const sumIncomes = filteredTransactions.map((item) => {
    return !item.expense ? item = +item.sum : item = null;
  }).reduce((acc, sum) => acc + sum, 0);

  const getExpenses = (category) => {
    const expense = filteredTransactions
      .filter((transaction) => transaction.category.title === category)
      .map((transaction) => transaction.expense ? transaction = +transaction.sum : transaction = null)
      .reduce((acc, sum) => acc + sum, 0);

      return expense;
  }

  const getIncomes = (category) => {
    const expense = filteredTransactions
      .filter((transaction) => transaction.category.title === category)
      .map((transaction) => !transaction.expense ? transaction = +transaction.sum : transaction = null)
      .reduce((acc, sum) => acc + sum, 0);

      return expense;
  }

  return (
    <>
      <section className={classes.MonthExpenses}>
        <h3>Expenses: -{sumExpenses} €</h3>
        <ul className={classes.List}>
          {categoriesForExpenses.map((category) => (
              <li className={classes.Wrapper} key={category}>
                <p>{category}:</p>
                <p className={classes.Balance}>-{getExpenses(category)} €</p>
              </li>
            ))
          }
        </ul>
      </section>
      <section className={classes.MonthExpenses}>
        <h3>Incomes: +{sumIncomes} €</h3>
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

export default MonthExpenses;
