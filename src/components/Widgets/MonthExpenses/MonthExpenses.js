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
  console.log(`🚀 ~ file: MonthExpenses.js ~ line 18 ~ sumExpenses ~ sumExpenses`, sumExpenses);

  const sumIncomes = filteredTransactions.map((item) => {
    return !item.expense ? item = +item.sum : item = null;
  }).reduce((acc, sum) => acc + sum, 0);

  const sumExpensesPerYear = transactions.map((transaction) => {
      return transaction.expense ? transaction = +transaction.sum : transaction = null;
    }).reduce((acc, sum) => acc + sum, 0);
  console.log(`🚀 ~ file: MonthExpenses.js ~ line 27 ~ sumExpensesPerYear ~ sumExpensesPerYear`, sumExpensesPerYear);

  const sumIncomesPerYear = transactions.map((item) => {
    return !item.expense ? item = +item.sum : item = null;
  }).reduce((acc, sum) => acc + sum, 0);

  const averageExpense = Math.round(((sumExpensesPerYear * 100 / 12 / 100)));
  const averageIncome = Math.round(((sumIncomesPerYear * 100 / 12 / 100)));

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
    const percent = (balance / (sumExpensesPerYear / 12) * 100);

    let expensesPercent = percent >= 100 ? 100 : percent;

    return expensesPercent === 0 ? 1 : expensesPercent;
  }

  const getAverageExpense = (expense) => {
    const averageValue = averageExpense - sumExpenses;

    return averageValue >= 0 ? `${averageValue}€ up to average` : `${Math.abs(averageValue)}€ above to average`;
  }

  const getAverageIncome = (expense) => {
    const averageValue = averageIncome - sumIncomes;

    return averageValue >= 0 ? `${averageValue}€ up to average` : `${Math.abs(averageValue)}€ above to average`;
  }

  return (
    <>
      <section className={classes.MonthExpenses}>
        <div style={{
            width: '100%',
            display: 'flex'
          }}>
          <div
            className={classes.TotalExpense}
            style={{width: `${getTotalPercent(sumExpenses)}%`}}
          ></div>
          <div
            className={classes.TotalBg}
            style={{width: `${100 - getTotalPercent(sumExpenses)}%`}}
          ></div>
        </div>
        <h4 className={classes.TotalTitle}>Expenses</h4>
        <div className={classes.TotalSumWrapper}>
          <h4 className={classes.TotalSumAverage}>{getAverageExpense(averageExpense)}</h4>
          <h4 className={classes.TotalSum}>-{sumExpenses}€</h4>
        </div>
        <ul className={classes.List}>
          {categoriesForExpenses.map((category) => (
              <li className={classes.Wrapper} key={category}>
                <div className={classes.TotalBg}></div>
                <div
                  className={classes.Expense}
                  style={{width: `${getExpensesPercent(getExpenses(category))}%`}}>
                </div>
                <p className={classes.Category}>
                  {`${getExpensesPercent(getExpenses(category))}% ${category}`}
                </p>
                <div className={classes.AverageWrapper}>
                  <p className={classes.TotalSumAverage}>0€ up to average</p>
                  <p className={classes.Balance}>-{getExpenses(category)}€</p>
                </div>
              </li>
            ))
          }
        </ul>
      </section>
      <section className={classes.MonthExpenses}>
        <div style={{
            width: '100%',
            display: 'flex'
          }}>
          <div
            className={classes.TotalExpense}
            style={{width: `${getTotalPercent(sumIncomes)}%`}}
          ></div>
          <div
            className={classes.TotalBg}
            style={{width: `${100 - getTotalPercent(sumIncomes)}%`}}
          ></div>
        </div>
        <h4 className={classes.TotalTitle}>Incomes</h4>
        <div className={classes.TotalSumWrapper}>
          <h4 className={classes.TotalSumAverage}>{getAverageIncome(averageIncome)}</h4>
          <h4 className={classes.TotalSum}>+{sumIncomes}€</h4>
        </div>
        <ul className={classes.List}>
          {categoriesForIncomes.map((category) => (
              <li className={classes.Wrapper} key={category}>
                <div className={classes.TotalBg}></div>
                <div
                  className={classes.Expense}
                  style={{width: `${getIncomesPercent(getIncomes(category))}%`}}>
                </div>
                <p className={classes.Category}>
                  {`${getIncomesPercent(getIncomes(category))}% ${category}`}
                </p>
                <div className={classes.AverageWrapper}>
                  <p className={classes.TotalSumAverage}>0€ up to average</p>
                  <p className={classes.Balance}>+{getIncomes(category)}€</p>
                </div>
              </li>
            ))
          }
        </ul>
      </section>
      {/* <section className={classes.MonthExpenses} style={{flex: '1 1 auto'}}></section> */}
    </>
  )
}

export default MonthExpenses;
