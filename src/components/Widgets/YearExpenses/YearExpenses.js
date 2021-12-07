import React from 'react';
import {useDispatch} from 'react-redux';
import classes from './YearExpenses.module.css';
import {formatMonth} from '../../../utils/utils';

import {
  updateMonth,
} from '../../../reducers/transactions/transactions-slice'

function YearExpenses({currentMonth, transactions}) {
  const dispatch = useDispatch();

  const maxMonthExpense = 3000;

  const getExpensesPercent = (month) => {
    const expenses = transactions
      .filter((transaction) => formatMonth(transaction.date) === month)
      .map((transaction) => transaction.expense ? transaction = +transaction.sum : transaction = null)
      .reduce((acc, sum) => acc + sum, 0);

    const percent = (expenses / maxMonthExpense * 100);

    let expensesPercent = percent >= 100 ? 100 : percent;

    return expensesPercent === 0 ? 1 : expensesPercent;
  }

  const getIncomesPercent = (month) => {
    const incomes = transactions
      .filter((transaction) => formatMonth(transaction.date) === month)
      .map((transaction) => !transaction.expense ? transaction = +transaction.sum : transaction = null)
      .reduce((acc, sum) => acc + sum, 0);

    const percent = (incomes / maxMonthExpense * 100);

    let incomesPercent = percent >= 100 ? 100 : percent;

    return incomesPercent === 0 ? 1 : incomesPercent;
  }

  const monthExpenses = [
    'January', 'February', 'March',
    'April', 'May', 'June',
    'July', 'August', 'September',
    'October', 'November', 'December'
  ]

  const monthHandler = ({target}) => {
    dispatch(updateMonth(target.id));
  };

  return (
    <>
      <section className={classes.YearExpenses}>
        <div className={classes.Wrapper}>
          {monthExpenses.map((month) => (
            <div
              className={`${classes.List} ${month === currentMonth ? classes.Active : ''}`}
              key={month}
              id={month}
              onClick={monthHandler}
            >
              <div
                className={classes.Incomes}
                id={month}
                style={{height: `${getIncomesPercent(month)}%`}}
              ></div>
              <div
                className={classes.Expenses}
                id={month}
                style={{height: `${getExpensesPercent(month)}%`}}
              ></div>
              <p id={month}>{month.slice(0, 3)}</p>
            </div>
            ))
          }
        </div>
      </section>
    </>
  )
}

export default YearExpenses;
