import React from 'react';
import classes from './Indicator.module.css';

function WidgetsMonthExpensesIndicator({
  abovePercent,
  averagePercent,
  totalPercent,
  transactionsSum,
  type,
  title
  }) {
  return (
    <>
      <div className={classes.IndicatorWrapper}>

        {/* Indicator */}
        <div
          className={classes.TotalExpenses}
          style={{width: `${totalPercent}%`}}
        ></div>
        <div
          className={classes.IndicatorTotal}
          style={{width: `${100 - totalPercent}%`}}
        ></div>
        <div
          className={
              `${
                type === 'incomes'
                  ? classes.IndicatorIncomes
                  : classes.IndicatorExpenses
              }`
            }
          style={{width: `${abovePercent}%`}}
        ></div>

        {/* Contents */}
        <p className={
            title === 'Incomes' || title === 'Expenses'
              ? classes.TotalTitle
              : classes.CategoryTitle
          }>
          {title}
        </p>
        <div className={classes.TotalSumWrapper}>
          <h4 className={classes.TotalSumAverage}>{averagePercent}</h4>
          <h4 className={
              title === 'Incomes' || title === 'Expenses'
              ? classes.TotalSum
              : classes.Balance
            }>
            {type === 'incomes' ? '+' : '-'}
            {transactionsSum}€
          </h4>
        </div>

      </div>
    </>
  )
}

export default WidgetsMonthExpensesIndicator;
