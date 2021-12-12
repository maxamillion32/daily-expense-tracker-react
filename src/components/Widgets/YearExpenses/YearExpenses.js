import React from 'react';
import {useDispatch} from 'react-redux';
import {updateMonth} from '../../../reducers/transactions/transactions-slice';

import {formatMonth} from '../../../utils/utils';
import classes from './YearExpenses.module.css';
import {MONTH_EXPENSES} from './constant';

import Indicator from './Indicator/Indicator';

function WidgetsYearExpenses({currentMonth, transactions}) {
  const dispatch = useDispatch();

  const maxMonthExpense = 3000; // temporary value

  const getPercent = (month, type) => {
    const incomes = transactions
      .filter((transaction) => formatMonth(transaction.date) === month)
      .map((transaction) => (type === 'expenses' ? transaction.expense : !transaction.expense)
      ? transaction = +transaction.sum
      : transaction = null)
      .reduce((acc, sum) => acc + sum, 0);

    const percent = (incomes / maxMonthExpense * 100);
    let incomesPercent = percent >= 100 ? 100 : percent;

    return incomesPercent === 0 ? 1 : incomesPercent;
  }

  const monthHandler = ({target}) => {
    dispatch(updateMonth(target.id));
  };


  return (
    <>
      <section className={classes.YearExpenses}>
        <div className={classes.Wrapper}>
          {MONTH_EXPENSES.map((month) => (
            <div
              className={`${classes.List} ${month === currentMonth ? classes.Active : ''}`}
              key={month}
              id={month}
              onClick={monthHandler}
            >
              <Indicator
                month={month}
                getPercent={getPercent}
                type={"incomes"}
              />

              <Indicator
                month={month}
                getPercent={getPercent}
                type={"expenses"}
              />
              <p id={month}>{month.slice(0, 3)}</p>
            </div>
            ))
          }
        </div>
      </section>
    </>
  )
}

export default WidgetsYearExpenses;
