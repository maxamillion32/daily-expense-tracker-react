import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import classes from './YearOutcomes.module.css';
import {formatMonth} from '../../../utils/utils';

import {
  updateMonth,
  selectAllTransactionsState
} from '../../../reducers/transactions/transactions-slice'

function YearOutcomes({currentMonth}) {
  const allTransactions = useSelector(selectAllTransactionsState);
  const dispatch = useDispatch();

  const getOverallPercent = (month) => {
    const outcome = allTransactions
      .filter((transaction) => formatMonth(transaction.date) === month)
      .map((transaction) => transaction.outcome ? transaction = +transaction.sum : transaction = null)
      .reduce((acc, sum) => acc + sum, 0);

    let overallPercent = outcome / 1000 * 100;

    return overallPercent === 0 ? 1 : overallPercent;
  }

  const monthOutcomes = [
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
      <section className={classes.YearOutcomes}>
        <div className={classes.Wrapper}>
          {monthOutcomes.map((month) => (
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

export default YearOutcomes;
