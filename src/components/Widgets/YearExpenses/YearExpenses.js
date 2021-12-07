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

  const getOverallPercent = (month) => {
    const expense = transactions
      .filter((transaction) => formatMonth(transaction.date) === month)
      .map((transaction) => transaction.expense ? transaction = +transaction.sum : transaction = null)
      .reduce((acc, sum) => acc + sum, 0);

    let overallPercent = expense / maxMonthExpense * 100;

    return overallPercent === 0 ? 1 : overallPercent;
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
              <div id={month} style={{height: `${getOverallPercent(month)}%`}}></div>
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
