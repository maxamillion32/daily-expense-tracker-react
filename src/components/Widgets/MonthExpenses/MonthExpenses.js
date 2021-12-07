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

  const getExpensesPercent = (balance) => {
    let percent = (balance / sumExpenses * 100);

    percent = Math.round(percent);

    let expensesPercent = percent >= 100 ? 100 : percent;

    return expensesPercent === 0 ? 1 : expensesPercent;
  }

  const getIncomesPercent = (balance) => {
    let percent = (balance / sumIncomes * 100);

    percent = Math.round(percent);

    let expensesPercent = percent >= 100 ? 100 : percent;

    return expensesPercent === 0 ? 1 : expensesPercent;
  }

  const getTotalPercent = (balance) => {
    const percent = (balance / 3000 * 100);

    let expensesPercent = percent >= 100 ? 100 : percent;

    return expensesPercent === 0 ? 1 : expensesPercent;
  }

  return (
    <>
      <section className={classes.MonthExpenses}>
        <div className={classes.TotalBg}></div>
        <div className={classes.TotalExpense} style={{width: `${getTotalPercent(sumExpenses)}%`}}></div>
        <h4 className={classes.TotalTitle}>Expenses</h4>
        <h4 className={classes.TotalSum}>-{sumExpenses} €</h4>
        <ul className={classes.List}>
          {categoriesForExpenses.map((category) => (
              <li className={classes.Wrapper} key={category}>
                <div className={classes.TotalBg}></div>
                <div className={classes.Expense} style={{width: `${getExpensesPercent(getExpenses(category))}%`}}></div>
                <p className={classes.Category}>{`${getExpensesPercent(getExpenses(category))}% ${category}`}</p>
                <p className={classes.Balance}>-{getExpenses(category)} €</p>
              </li>
            ))
          }
        </ul>
      </section>
      <section className={classes.MonthExpenses}>
        <div className={classes.TotalBg}></div>
        <div className={classes.TotalExpense} style={{width: `${getTotalPercent(sumIncomes)}%`}}></div>
        <h4 className={classes.TotalTitle}>Incomes</h4>
        <h4 className={classes.TotalSum}>+{sumIncomes} €</h4>
        <ul className={classes.List}>
          {categoriesForIncomes.map((category) => (
              <li className={classes.Wrapper} key={category}>
                <div className={classes.TotalBg}></div>
                <div className={classes.Expense} style={{width: `${getIncomesPercent(getIncomes(category))}%`}}></div>
                <p className={classes.Category}>{`${getIncomesPercent(getIncomes(category))}% ${category}`}</p>
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
